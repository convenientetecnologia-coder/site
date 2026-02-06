"use strict";

const fs = require("fs");
const path = require("path");

// Load local env without committing secrets
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

function cleanText(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function slugify(name) {
  const s = String(name || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  return s
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeJsonParse(raw, fallback = null) {
  try { return JSON.parse(String(raw)); } catch { return fallback; }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJsonPretty(fp, obj) {
  ensureDir(path.dirname(fp));
  fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function writeText(fp, text) {
  ensureDir(path.dirname(fp));
  fs.writeFileSync(fp, String(text || ""), "utf8");
}

function extractOutputText(resp) {
  if (!resp) return "";
  if (typeof resp.output_text === "string") return resp.output_text;
  if (typeof resp.outputText === "string") return resp.outputText;
  // best-effort: traverse output
  try {
    const parts = [];
    const out = Array.isArray(resp.output) ? resp.output : [];
    for (const item of out) {
      const content = item && Array.isArray(item.content) ? item.content : [];
      for (const c of content) {
        if (c && typeof c.text === "string") parts.push(c.text);
      }
    }
    return parts.join("\n");
  } catch {
    return "";
  }
}

function wordCount(s) {
  const t = String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!t) return 0;
  return t.split(" ").filter(Boolean).length;
}

function requireList(v) {
  return Array.isArray(v) ? v.filter(Boolean).map(x => cleanText(x)) : [];
}

function requireFaq(v) {
  const arr = Array.isArray(v) ? v : [];
  const out = [];
  for (const x of arr) {
    if (!x || typeof x !== "object") continue;
    const q = cleanText(x.q);
    const a = cleanText(x.a);
    if (!q || !a) continue;
    out.push({ q, a });
  }
  return out;
}

function normalizeType(t) {
  const s = String(t || "").trim().toLowerCase();
  if (s === "fretes" || s === "mudancas" || s === "urgente") return s;
  return "";
}

function splitTypes(raw) {
  const t = cleanText(raw);
  if (!t) return ["fretes", "mudancas", "urgente"];
  const items = t.split(",").map(x => normalizeType(x)).filter(Boolean);
  return items.length ? items : ["fretes", "mudancas", "urgente"];
}

async function main() {
  const args = parseArgs(process.argv);
  const city = cleanText(args.city || "");
  const slug = cleanText(args.slug || "").toLowerCase() || slugify(city);
  const state = cleanText(args.state || "");
  const types = splitTypes(args.types || "");

  const apiKey = cleanText(process.env.OPENAI_API_KEY || "");
  const model = cleanText(process.env.OPENAI_MODEL || "gpt-5.2");
  if (!apiKey) {
    console.error("Falta OPENAI_API_KEY no ambiente (local.env).");
    process.exit(2);
  }
  if (!city || !slug) {
    console.error("Uso: npm run city:generate -- --city \"Florianópolis\" --slug florianopolis [--state SC] [--types fretes,mudancas,urgente]");
    process.exit(2);
  }

  let OpenAI = null;
  try {
    // eslint-disable-next-line global-require
    OpenAI = require("openai");
    OpenAI = OpenAI && OpenAI.default ? OpenAI.default : OpenAI;
  } catch (e) {
    console.error("Dependência 'openai' não encontrada. Rode: npm install openai");
    process.exit(2);
  }

  const client = new OpenAI({ apiKey });
  const place = state ? `${city} (${state})` : city;

  // 1) Research (web_search) — evidence internal, not shown to public directly
  const researchPrompt = [
    "Tarefa: produzir pesquisa rápida e segura para orientar a escrita de páginas locais (serviço de fretes/mudanças).",
    "Use web search. Retorne SOMENTE JSON válido.",
    "",
    `Cidade alvo: ${place}`,
    "",
    "REGRAS:",
    "- Não invente fatos. Use apenas informações que você conseguiu sustentar com as fontes encontradas na web_search.",
    "- Não inclua PII.",
    "- Foque em aspectos úteis e genéricos o bastante para não virar dado falso: regiões, logística urbana, termos locais amplos, contexto de deslocamento, etc.",
    "",
    "Formato obrigatório:",
    "{",
    "  \"sources\": [{\"title\":\"...\",\"url\":\"...\"}],",
    "  \"notes\": [\"ponto 1\", \"ponto 2\", \"...\"]",
    "}"
  ].join("\n");

  const researchResp = await client.responses.create({
    model,
    tools: [{ type: "web_search" }],
    input: researchPrompt
  });

  const researchText = extractOutputText(researchResp);
  const researchJson = safeJsonParse(researchText, { sources: [], notes: [] }) || { sources: [], notes: [] };
  const sources = Array.isArray(researchJson.sources) ? researchJson.sources : [];
  const notes = Array.isArray(researchJson.notes) ? researchJson.notes : [];

  const researchMd = [
    `### Research — ${place}`,
    "",
    `Gerado em: ${new Date().toISOString()}`,
    "",
    "## Sources",
    ...sources.map((s) => `- ${cleanText(s.title || "Fonte")}: ${cleanText(s.url || "")}`),
    "",
    "## Notes (high confidence)",
    ...notes.map((n) => `- ${cleanText(n)}`),
    ""
  ].join("\n");

  writeText(path.join(__dirname, "..", "docs", "research", `${slug}.md`), researchMd);

  // 2) Generate content blocks per type (JSON only)
  function contentSys(kind) {
    return [
      "Você escreve conteúdo de alta qualidade em PT-BR para páginas locais de serviços (fretes/mudanças/frete urgente).",
      "Objetivo: páginas MUITO úteis, humanas, com leitura boa, e que pareçam escritas sob medida para a cidade.",
      "",
      "REGRAS CRÍTICAS:",
      "- Não mencione IA, geração, modelo, prompt, nem bastidores.",
      "- Não invente fatos específicos (ex.: bairros se não estiverem fornecidos; regras exatas de cidade; estatísticas). Use linguagem prudente.",
      "- Não use PII (endereços, telefones, placas).",
      "- Não use claims absolutos: evite “sempre”, “garantido”, “o melhor”, “24h garantido”.",
      "- Linguagem: humana e direta, sem marketing robótico, sem repetir frases/padrões.",
      "- Cada parágrafo deve ser claramente diferente; evite estruturas repetidas.",
      "",
      "FORMATO: retorne SOMENTE JSON válido."
    ].join("\n");
  }

  function contentUser(kind) {
    const kindLabel = (kind === "fretes") ? "fretes" : (kind === "mudancas") ? "mudanças" : "frete urgente";
    const minWords = 1650; // buffer para ficar sempre >1200 após render + stripping
    return [
      `Cidade: ${city}`,
      `Estado/UF (se houver): ${state || ""}`,
      `Tipo de página: ${kind} (${kindLabel})`,
      `Slug: ${slug}`,
      "",
      "Contexto (pesquisa web, notas de alta confiança):",
      ...notes.slice(0, 20).map((n) => `- ${cleanText(n)}`),
      "",
      `Meta: escrever blocos que, quando renderizados, resultem em ~${minWords} a 1900 palavras (conteúdo pilar).`,
      "",
      "Retorne JSON no formato (TODOS os campos são obrigatórios):",
      "{",
      "  \"introParagraphs\": [\"...\", \"...\"],",
      "  \"guideParagraphs\": [\"(12 a 18 parágrafos longos)\", \"...\"],",
      "  \"howSteps\": [\"(7 a 10 passos)\", \"...\"],",
      "  \"priceFactors\": [\"...\"],",
      "  \"prepChecklist\": [\"...\"],",
      "  \"scenarios\": [\"...\"],",
      "  \"faq\": [{\"q\":\"...\",\"a\":\"...\"}],",
      "  \"sectionTitles\": {",
      "    \"demands\": \"Título único para seção de demandas urgentes\",",
      "    \"coverage\": \"Título único para seção de cobertura\",",
      "    \"whatToSend\": \"Título único para seção 'o que enviar'\",",
      "    \"availability\": \"Título único para seção de disponibilidade\",",
      "    \"whenYes\": \"Título único para subseção 'quando dá certo'\",",
      "    \"whenNo\": \"Título único para subseção 'quando pode não dar'\",",
      "    \"pricing\": \"Título único para seção de preço\",",
      "    \"commonScenarios\": \"Título único para seção de cenários comuns\",",
      "    \"types\": \"Título único para seção de tipos de frete/mudança\",",
      "    \"services\": \"Título único para seção de serviços complementares\",",
      "    \"howItWorks\": \"Título único para seção 'como funciona'\",",
      "    \"completeGuide\": \"Título único para seção 'guia completo'\",",
      "    \"preparation\": \"Título único para seção de preparação\",",
      "    \"neighborhoods\": \"Título único para seção de bairros\",",
      "    \"testimonials\": \"Título único para seção de depoimentos\"",
      "  },",
      "  \"sectionDescriptions\": {",
      "    \"demands\": \"Descrição única para seção de demandas\",",
      "    \"coverage\": \"Descrição única para seção de cobertura\",",
      "    \"whatToSend\": \"Descrição única para seção 'o que enviar'\",",
      "    \"availability\": \"Descrição única para seção de disponibilidade\",",
      "    \"pricing\": \"Descrição única para seção de preço\",",
      "    \"commonScenarios\": \"Descrição única para seção de cenários\",",
      "    \"types\": \"Descrição única para seção de tipos\",",
      "    \"services\": \"Descrição única para seção de serviços\",",
      "    \"howItWorks\": \"Descrição única para seção 'como funciona'\",",
      "    \"completeGuide\": \"Descrição única para seção 'guia completo'\",",
      "    \"preparation\": \"Descrição única para seção de preparação\",",
      "    \"neighborhoods\": \"Descrição única para seção de bairros\",",
      "    \"testimonials\": \"Descrição única para seção de depoimentos\"",
      "  },",
      kind === "urgente" ? [
        "  \"demands\": [\"(4 a 6 itens únicos de demandas urgentes)\", \"...\"],",
        "  \"whenYes\": [\"(4 a 6 itens únicos sobre quando costuma dar certo)\", \"...\"],",
        "  \"whenNo\": [\"(4 a 6 itens únicos sobre quando pode não dar)\", \"...\"],",
        "  \"common\": [\"(6 a 8 cenários comuns únicos)\", \"...\"]"
      ].join("\n") : kind === "fretes" ? [
        "  \"types\": [\"(5 a 7 tipos de frete únicos)\", \"...\"],",
        "  \"services\": [\"(4 a 6 serviços complementares únicos)\", \"...\"]"
      ].join("\n") : [
        "  \"checklist\": [\"(5 a 7 itens únicos sobre como trabalhamos)\", \"...\"]"
      ].join("\n"),
      "}",
      "",
      "REGRAS CRÍTICAS DE UNICIDADE (anti-duplicação):",
      "- TODOS os títulos de seção (`sectionTitles`) devem ser ÚNICOS e diferentes de outras cidades.",
      "- TODAS as descrições (`sectionDescriptions`) devem ser ÚNICAS e diferentes de outras cidades.",
      "- TODAS as listas (demands, whenYes, whenNo, common, types, services, checklist) devem ter redação ÚNICA.",
      "- Varia ordem, exemplos, palavras-chave e estrutura para garantir 100% de unicidade.",
      "- NUNCA use títulos genéricos como 'Demandas urgentes' ou 'Cobertura'. Crie títulos criativos e únicos.",
      "",
      "Requisitos de qualidade:",
      "- `guideParagraphs`: 12–18 parágrafos, cada um com ~80–140 palavras.",
      "- `faq`: 8–12 perguntas, respostas objetivas (2–4 frases).",
      "- Não repetir perguntas nem respostas com variações pequenas.",
      "- Não citar bairros específicos a menos que eu forneça uma lista (não forneci aqui).",
      "- Não afirmar regras específicas de condomínios/portaria como fato; use 'pode variar' quando necessário."
    ].join("\n");
  }

  const out = {
    meta: {
      version: 1,
      city,
      slug,
      state: state || null,
      generatedAt: new Date().toISOString(),
      model,
      sources: sources.map((s) => ({ title: cleanText(s.title || ""), url: cleanText(s.url || "") })).filter(x => x.url)
    }
  };

  for (const kind of types) {
    const resp = await client.responses.create({
      model,
      input: [
        { role: "system", content: contentSys(kind) },
        { role: "user", content: contentUser(kind) }
      ]
    });
    const txt = extractOutputText(resp);
    const j = safeJsonParse(txt, null);
    if (!j || typeof j !== "object") {
      console.error(`[city:generate] FAIL: JSON inválido para ${slug}/${kind}. Saída:`, txt.slice(0, 600));
      process.exit(2);
    }

    const introParagraphs = requireList(j.introParagraphs);
    const guideParagraphs = requireList(j.guideParagraphs);
    const howSteps = requireList(j.howSteps);
    const priceFactors = requireList(j.priceFactors);
    const prepChecklist = requireList(j.prepChecklist);
    const scenarios = requireList(j.scenarios);
    const faq = requireFaq(j.faq);

    // Seções específicas por tipo (obrigatórias)
    const demands = (kind === "urgente") ? requireList(j.demands) : [];
    const whenYes = (kind === "urgente") ? requireList(j.whenYes) : [];
    const whenNo = (kind === "urgente") ? requireList(j.whenNo) : [];
    const common = (kind === "urgente") ? requireList(j.common) : [];
    const types = (kind === "fretes") ? requireList(j.types) : [];
    const services = (kind === "fretes") ? requireList(j.services) : [];
    const checklist = (kind === "mudancas") ? requireList(j.checklist) : [];

    // Títulos e descrições de seção (obrigatórios)
    const sectionTitles = (j.sectionTitles && typeof j.sectionTitles === "object") ? j.sectionTitles : {};
    const sectionDescriptions = (j.sectionDescriptions && typeof j.sectionDescriptions === "object") ? j.sectionDescriptions : {};

    // Validação: em production, todas as seções devem existir
    if (kind === "urgente") {
      if (!demands.length) throw new Error(`[gpt-only] urgente: demands obrigatório ausente para ${slug}`);
      if (!whenYes.length) throw new Error(`[gpt-only] urgente: whenYes obrigatório ausente para ${slug}`);
      if (!whenNo.length) throw new Error(`[gpt-only] urgente: whenNo obrigatório ausente para ${slug}`);
      if (!common.length) throw new Error(`[gpt-only] urgente: common obrigatório ausente para ${slug}`);
    } else if (kind === "fretes") {
      if (!types.length) throw new Error(`[gpt-only] fretes: types obrigatório ausente para ${slug}`);
      if (!services.length) throw new Error(`[gpt-only] fretes: services obrigatório ausente para ${slug}`);
    } else if (kind === "mudancas") {
      if (!checklist.length) throw new Error(`[gpt-only] mudancas: checklist obrigatório ausente para ${slug}`);
    }

    const approxWords = wordCount([
      ...introParagraphs,
      ...guideParagraphs,
      ...howSteps,
      ...priceFactors,
      ...prepChecklist,
      ...scenarios,
      ...faq.map(x => `${x.q} ${x.a}`),
      ...demands,
      ...whenYes,
      ...whenNo,
      ...common,
      ...types,
      ...services,
      ...checklist,
      ...Object.values(sectionTitles),
      ...Object.values(sectionDescriptions)
    ].join(" "));

    out[kind] = {
      introParagraphs,
      guideParagraphs,
      howSteps,
      priceFactors,
      prepChecklist,
      scenarios,
      faq,
      ...(kind === "urgente" ? { demands, whenYes, whenNo, common } : {}),
      ...(kind === "fretes" ? { types, services } : {}),
      ...(kind === "mudancas" ? { checklist } : {}),
      sectionTitles,
      sectionDescriptions,
      _approxWords: approxWords
    };
  }

  const outPath = path.join(__dirname, "..", "src", "_data", "city_content", `${slug}.json`);
  writeJsonPretty(outPath, out);
  console.log(`[city:generate] OK: wrote ${outPath}`);
  for (const kind of types) {
    const w = out[kind] && out[kind]._approxWords ? out[kind]._approxWords : 0;
    console.log(`[city:generate] ${slug}/${kind}: approxWords=${w}`);
  }
}

main().catch((err) => {
  console.error("[city:generate] ERRO:", (err && err.message) ? err.message : err);
  process.exit(1);
});

