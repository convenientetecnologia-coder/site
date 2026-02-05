"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");

// Carrega variáveis locais sem versionar secrets:
// - preferencial: `local.env` na raiz do projeto
// - fallback: `.env` (se o usuário optar por usar)
try {
  // eslint-disable-next-line global-require
  const dotenv = require("dotenv");
  try { dotenv.config({ path: path.join(__dirname, "..", "local.env") }); } catch {}
  try { dotenv.config(); } catch {}
} catch {}

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const k = a.slice(2);
    const v = (i + 1 < argv.length && !argv[i + 1].startsWith("--")) ? argv[++i] : "1";
    out[k] = v;
  }
  return out;
}

function deaccent(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normItem(s) {
  const t = String(s || "").replace(/\s+/g, " ").trim();
  return t;
}

function uniqueNeighborhoods(list) {
  const seen = new Set();
  const out = [];
  for (const raw of (Array.isArray(list) ? list : [])) {
    const t = normItem(raw);
    if (!t) continue;
    const key = deaccent(t).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

function split3(list) {
  const n = Array.isArray(list) ? list.length : 0;
  const blocks = [[], [], []];
  if (n <= 0) return blocks;
  if (n === 1) return [[list[0]], [list[0]], [list[0]]];
  if (n === 2) return [[list[0]], [list[1]], [list[0]]];
  if (n === 3) return [[list[0]], [list[1]], [list[2]]];

  const base = Math.floor(n / 3);
  let rem = n % 3;
  const sizes = [base, base, base];
  // distribui o resto no fim: 40 -> 13,13,14 (rem no último)
  for (let i = 2; i >= 0 && rem > 0; i--) {
    sizes[i] += 1;
    rem--;
  }

  let idx = 0;
  for (let b = 0; b < 3; b++) {
    blocks[b] = list.slice(idx, idx + sizes[b]);
    idx += sizes[b];
  }
  return blocks;
}

function requestJson(url, { headers, body, timeoutMs = 120000 }) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      method: "POST",
      hostname: u.hostname,
      path: u.pathname + (u.search || ""),
      headers: Object.assign({
        "Content-Type": "application/json",
      }, headers || {}),
      timeout: timeoutMs
    }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        const code = res.statusCode || 0;
        if (code < 200 || code >= 300) {
          return reject(new Error(`HTTP ${code}: ${data.slice(0, 600)}`));
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Falha ao parsear JSON da API: ${(e && e.message) || e}`));
        }
      });
    });
    req.on("error", reject);
    req.on("timeout", () => {
      try { req.destroy(new Error("timeout")); } catch {}
    });
    req.write(JSON.stringify(body || {}));
    req.end();
  });
}

function extractNeighborhoodsFromChatCompletion(j) {
  const txt = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content
    ? String(j.choices[0].message.content)
    : "";
  let parsed = null;
  try { parsed = JSON.parse(txt); } catch { parsed = null; }
  if (!parsed || typeof parsed !== "object") return [];
  const arr = parsed.neighborhoods;
  return Array.isArray(arr) ? arr : [];
}

function loadExistingJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, "utf8");
    const j = JSON.parse(raw || "{}");
    return (j && typeof j === "object") ? j : {};
  } catch {
    return {};
  }
}

function writeJsonPretty(filePath, obj) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

async function main() {
  const args = parseArgs(process.argv);
  const city = String(args.city || "").trim();
  const slug = String(args.slug || "").trim().toLowerCase();
  const state = String(args.state || "").trim();
  const maxPerPage = Math.max(1, Math.min(40, parseInt(String(args.maxPerPage || "15"), 10) || 15));
  const maxTotal = Math.max(3, Math.min(240, parseInt(String(args.maxTotal || String(maxPerPage * 3)), 10) || (maxPerPage * 3)));
  const model = String(process.env.OPENAI_MODEL || "gpt-5.2").trim();
  const apiKey = String(process.env.OPENAI_API_KEY || "").trim();

  if (!city || !slug) {
    console.error("Uso: npm run neighborhoods:fetch -- --city \"Florianópolis\" --slug florianopolis [--state \"SC\"] [--maxPerPage 15]");
    process.exit(2);
  }
  if (!apiKey) {
    console.error("Falta OPENAI_API_KEY no ambiente. (Não versionar chave no repo.)");
    process.exit(2);
  }

  const place = state ? `${city} (${state})` : city;
  const sys = [
    "Você é um assistente extremamente cuidadoso. Sua tarefa é listar bairros/regiões de uma cidade brasileira.",
    "REGRAS CRÍTICAS:",
    "- NÃO invente bairros. Se não tiver certeza alta, OMITA.",
    "- Retorne SOMENTE JSON válido, sem texto extra.",
    "- Use nomes curtos, comuns e aceitos localmente (ex.: \"Centro\", \"Trindade\").",
    "- Não inclua cidades vizinhas nem rodovias como bairros.",
    "- Não inclua \"\" e não repita itens."
  ].join("\n");

  const usr = [
    `Cidade alvo: ${place}`,
    "",
    "Retorne no formato:",
    "{",
    "  \"neighborhoods\": [\"Bairro 1\", \"Bairro 2\", \"...\"]",
    "}",
    "",
    "Meta: listar a maior quantidade possível com alta confiança."
  ].join("\n");

  const body = {
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: sys },
      { role: "user", content: usr }
    ]
  };

  const j = await requestJson("https://api.openai.com/v1/chat/completions", {
    headers: { Authorization: `Bearer ${apiKey}` },
    body
  });

  const listRaw = extractNeighborhoodsFromChatCompletion(j);
  let list = uniqueNeighborhoods(listRaw);
  if (list.length > maxTotal) list = list.slice(0, maxTotal);

  const [a, b, c] = split3(list);

  const outPath = path.join(__dirname, "..", "src", "_data", "neighborhoods.json");
  const existing = loadExistingJson(outPath);

  existing[slug] = {
    city: city,
    state: state || undefined,
    all: list,
    blocks: {
      fretes: a.slice(0, maxPerPage),
      mudancas: b.slice(0, maxPerPage),
      urgente: c.slice(0, maxPerPage)
    },
    meta: {
      source: "openai",
      model,
      ts: new Date().toISOString(),
      maxPerPage,
      maxTotal
    }
  };

  writeJsonPretty(outPath, existing);

  console.log(`[neighborhoods] OK: ${slug} => all=${list.length}, fretes=${existing[slug].blocks.fretes.length}, mudancas=${existing[slug].blocks.mudancas.length}, urgente=${existing[slug].blocks.urgente.length}`);
  console.log(`[neighborhoods] wrote: ${outPath}`);
}

main().catch((err) => {
  console.error("[neighborhoods] ERRO:", (err && err.message) ? err.message : err);
  process.exit(1);
});

