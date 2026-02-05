"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");

// Carrega variáveis locais sem versionar secrets:
// - preferencial: `local.env` na raiz do projeto
// - fallback: `.env`
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

function fingerprintText(s) {
  const t = deaccent(String(s || "").toLowerCase());
  return t
    .replace(/["'“”‘’`´^~]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function cleanAuthor(s) {
  const t = cleanText(s || "");
  if (!t) return "Cliente";
  // somente primeiro nome (sem "M.", "P.", etc.)
  const firstRaw = String(t.split(" ")[0] || "").trim();
  const first = firstRaw.replace(/[^A-Za-zÀ-ÿ-]/g, "");
  if (!first) return "Cliente";
  return first.slice(0, 1).toUpperCase() + first.slice(1).toLowerCase();
}

function normType(v) {
  const t = String(v || "").trim().toLowerCase();
  if (t === "fretes" || t === "mudancas" || t === "urgente" || t === "all") return t;
  return "";
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
          return reject(new Error(`HTTP ${code}: ${data.slice(0, 900)}`));
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

function extractItemsFromChatCompletion(j) {
  const txt = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content
    ? String(j.choices[0].message.content)
    : "";
  let parsed = null;
  try { parsed = JSON.parse(txt); } catch { parsed = null; }
  if (!parsed || typeof parsed !== "object") return [];
  const arr = parsed.testimonials;
  if (!Array.isArray(arr)) return [];
  return arr;
}

function loadJsonArray(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf8");
    const j = JSON.parse(raw || "[]");
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

function writeJsonPretty(filePath, obj) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function uniqueNewItems(list, existingFp) {
  const out = [];
  const seen = new Set();
  for (const x of (Array.isArray(list) ? list : [])) {
    if (!x || typeof x !== "object") continue;
    const text = cleanText(x.text);
    if (!text) continue;
    const fp = fingerprintText(text);
    if (!fp) continue;
    if (existingFp.has(fp)) continue;
    if (seen.has(fp)) continue;
    seen.add(fp);
    out.push({ text, author: cleanAuthor(x.author) });
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  const city = cleanText(args.city || "");
  const slug = cleanText(args.slug || "").toLowerCase();
  const type = normType(args.type || "");
  const count = Math.max(3, Math.min(24, parseInt(String(args.count || "12"), 10) || 12));
  const replace = String(args.replace || "1") !== "0"; // default: replace existing items for this city/type

  const model = cleanText(process.env.OPENAI_MODEL || "gpt-5.2");
  const apiKey = cleanText(process.env.OPENAI_API_KEY || "");
  if (!city || !slug || !type) {
    console.error("Uso: npm run testimonials:generate -- --city \"Florianópolis\" --slug florianopolis --type fretes --count 12 [--replace 1]");
    process.exit(2);
  }
  if (!apiKey) {
    console.error("Falta OPENAI_API_KEY no ambiente (local.env).");
    process.exit(2);
  }

  // Carrega existentes e prepara fingerprints (para evitar duplicação global)
  const outPath = path.join(__dirname, "..", "src", "_data", "testimonials.json");
  const existing = loadJsonArray(outPath);
  const existingFp = new Set();
  for (const t of existing) {
    const fp = fingerprintText(t && t.text);
    if (fp) existingFp.add(fp);
  }

  const kindLabel = (type === "fretes") ? "frete" : (type === "mudancas") ? "mudança" : "frete urgente";

  const sys = [
    "Você escreve depoimentos curtos e naturais em PT-BR, como mensagens reais de clientes.",
    "IMPORTANTE: os depoimentos devem soar autênticos e humanos, mas sem exageros e sem prometer o impossível.",
    "",
    "REGRAS:",
    "- Não mencione bairros, ruas, placas, telefones, endereços ou qualquer dado pessoal (PII).",
    "- Não use linguagem de robô, nem formal demais; pode ser simples e direta.",
    "- Não repita frases/padrões. Cada depoimento deve ser claramente diferente.",
    "- Evite claims absolutos: não diga “sempre”, “garantido”, “o melhor”, “24h garantido”. Use termos humanos tipo “foi tranquilo”, “bem combinado”, “respondeu rápido”.",
    "- 1 a 2 frases por depoimento. Máximo 240 caracteres.",
    "- Gere também um \"author\" com APENAS o primeiro nome (ex.: \"Aline\", \"Rafael\", \"Cliente\"). Não use iniciais, ponto ou sobrenome."
  ].join("\n");

  const usr = [
    `Cidade: ${city}`,
    `Tipo de página: ${type} (${kindLabel})`,
    "",
    `Gere ${count} depoimentos de clientes para ${kindLabel} em ${city}.`,
    "Retorne SOMENTE JSON válido no formato:",
    "{",
    "  \"testimonials\": [",
    "    {\"text\": \"...\", \"author\": \"...\"}",
    "  ]",
    "}"
  ].join("\n");

  const body = {
    model,
    temperature: 0.7,
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

  const rawItems = extractItemsFromChatCompletion(j);
  const newItems = uniqueNewItems(rawItems, existingFp);
  if (newItems.length < 3) {
    console.error(`[testimonials] ERRO: retorno insuficiente após dedupe (${newItems.length} < 3). Rode novamente ou aumente --count.`);
    process.exit(2);
  }

  const now = Date.now();
  const keep = replace
    ? existing.filter((t) => !(t && t.citySlug === slug && t.type === type))
    : existing.slice();

  const appended = newItems.slice(0, count).map((t, idx) => {
    const n = String(idx + 1).padStart(2, "0");
    return {
      id: `dep_${slug}_${type}_${n}`,
      text: t.text,
      author: t.author || "Cliente",
      citySlug: slug,
      type,
      ts: now,
      source: "cliente"
    };
  });

  writeJsonPretty(outPath, keep.concat(appended));

  console.log(`[testimonials] OK: ${slug}/${type} => wrote ${appended.length} (replace=${replace ? "1" : "0"})`);
  console.log(`[testimonials] file: ${outPath}`);
}

main().catch((err) => {
  console.error("[testimonials] ERRO:", (err && err.message) ? err.message : err);
  process.exit(1);
});

