"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

function fail(msg) {
  console.error("[validate] FAIL:", msg);
  process.exitCode = 2;
}

function ok(msg) {
  console.log("[validate] OK:", msg);
}

function listHtmlFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { entries = []; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile() && e.name.toLowerCase().endsWith(".html")) out.push(p);
    }
  }
  return out;
}

function stripTags(html) {
  return String(html || "").replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractOne(html, re) {
  const m = String(html || "").match(re);
  return m ? String(m[1] || "").trim() : "";
}

function extractBodyAttr(html, name) {
  const n = String(name || "").trim();
  if (!n) return "";
  const re = new RegExp(`<body[^>]*\\s${n}=["']([^"']*)["']`, "i");
  return extractOne(html, re);
}

function deaccent(s) {
  const str = String(s || "");
  try {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  } catch {
    return str;
  }
}

function fingerprintText(s) {
  const t = deaccent(String(s || "").toLowerCase());
  return t
    .replace(/["'“”‘’`´^~]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function main() {
  if (!fs.existsSync(DIST)) {
    fail(`dist/ não existe: ${DIST}. Rode npm run build antes.`);
    return;
  }

  const htmlFiles = listHtmlFiles(DIST);
  if (!htmlFiles.length) {
    fail("Nenhum .html encontrado em dist/.");
    return;
  }

  const titles = new Map(); // title -> file
  const h1s = new Map(); // h1 -> file
  const contentFpToFile = new Map(); // fingerprint(texto_visivel) -> file

  // páginas esperadas: 1 home + (3 por cidade habilitada)
  let enabledCities = 0;
  let enabledTypes = 3;
  let publishMode = "draft";
  try {
    const pubCfg = require(path.join(ROOT, "src", "_data", "publish"));
    const list = require(path.join(ROOT, "src", "_data", "publishedCities"));
    enabledCities = Array.isArray(list) ? list.length : 0;
    const types = Array.isArray(pubCfg && pubCfg.enabledTypes) ? pubCfg.enabledTypes : [];
    enabledTypes = Math.max(0, types.length || 3);
    publishMode = String((pubCfg && pubCfg.mode) || "draft");
  } catch {}
  const expectedMinPages = Math.max(1, 1 + (enabledCities * enabledTypes));

  let bad = 0;
  let wordLow = 0;
  let wordHardFail = 0;
  let testimonialsFail = 0;

  const minWordsDraftWarn = 250;
  const minWordsProduction = 1200;

  // gate de configuração (produção): WhatsApp e tracking devem estar configurados.
  if (publishMode === "production") {
    try {
      const siteCfg = require(path.join(ROOT, "src", "_data", "site.json"));
      const raw = String(siteCfg && siteCfg.whatsAppNumberE164 || "").trim();
      const digits = raw.replace(/\D/g, "");
      if (!digits || digits.length < 10) {
        fail("Config inválida: src/_data/site.json: whatsAppNumberE164 vazio/curto (use E.164 somente dígitos, ex.: 5548999999999).");
        bad++;
      }
      const endpoint = String(siteCfg && siteCfg.trackingEndpoint || "").trim();
      if (!endpoint || !/^https:\/\//i.test(endpoint)) {
        fail("Config inválida: src/_data/site.json: trackingEndpoint vazio ou não-HTTPS (necessário para métricas enterprise).");
        bad++;
      }
    } catch {
      fail("Falha ao ler src/_data/site.json para validar config de produção (WhatsApp/tracking).");
      bad++;
    }
  }

  // gate global: depoimentos não podem ter texto duplicado (fingerprint igual)
  // Em draft: WARN. Em production: FAIL.
  try {
    const tmod = require(path.join(ROOT, "src", "_data", "testimonials"));
    const items = Array.isArray(tmod && tmod.items) ? tmod.items : [];
    const seen = new Map(); // fp -> first item
    let dupGroups = 0;
    for (const t of items) {
      const fp = fingerprintText(t && t.text);
      if (!fp) continue;
      if (!seen.has(fp)) {
        seen.set(fp, t);
        continue;
      }
      const first = seen.get(fp);
      dupGroups++;
      const msg = `Depoimento duplicado (texto igual). type=${t.type}, city=${t.citySlug || "null"} author=${t.author}. Primeiro: type=${first.type}, city=${first.citySlug || "null"} author=${first.author}.`;
      if (publishMode === "production") {
        fail(msg);
        bad++;
      } else {
        console.warn("[validate] WARN:", msg);
      }
    }
    if (dupGroups && publishMode !== "production") {
      console.warn(`[validate] WARN: ${dupGroups} duplicados detectados em src/_data/testimonials.json (corrigir antes de production).`);
    }
  } catch {}

  for (const fp of htmlFiles) {
    const rel = fp.slice(DIST.length).replace(/\\\\/g, "/");
    const html = fs.readFileSync(fp, "utf8");
    const title = extractOne(html, /<title>([^<]*)<\/title>/i);
    const h1 = extractOne(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, "").trim();
    const text = stripTags(html);
    const words = text ? text.split(" ").filter(Boolean).length : 0;
    const pageType = extractBodyAttr(html, "data-page-type");
    const isCityPage = pageType === "fretes" || pageType === "mudancas" || pageType === "urgente" ||
      /\/(fretes-em-|mudancas-em-|frete-urgente-em-)/i.test(rel);

    if (!title) { fail(`Sem <title> em ${rel}`); bad++; continue; }
    if (!h1) { fail(`Sem <h1> em ${rel}`); bad++; continue; }

    if (titles.has(title)) { fail(`Title duplicado: "${title}" em ${rel} (já existe em ${titles.get(title)})`); bad++; }
    else titles.set(title, rel);

    if (h1s.has(h1)) { fail(`H1 duplicado: "${h1}" em ${rel} (já existe em ${h1s.get(h1)})`); bad++; }
    else h1s.set(h1, rel);

    // gate anti "páginas iguais": fingerprint do texto visível não pode repetir
    // Em draft: WARN. Em production: FAIL.
    const contentFp = fingerprintText(text);
    if (contentFp) {
      if (contentFpToFile.has(contentFp)) {
        const first = contentFpToFile.get(contentFp);
        const msg = `Conteúdo visível idêntico entre páginas: ${rel} e ${first}`;
        if (publishMode === "production") {
          fail(msg);
          bad++;
        } else {
          console.warn("[validate] WARN:", msg);
        }
      } else {
        contentFpToFile.set(contentFp, rel);
      }
    }

    // gate de palavras: só aplica para páginas de cidade (fretes/mudanças/urgente)
    if (isCityPage) {
      if (publishMode === "production") {
        if (words < minWordsProduction) {
          fail(`Poucas palavras em modo production (${words} < ${minWordsProduction}) em ${rel}`);
          bad++; wordHardFail++;
        }
      } else {
        if (words < minWordsDraftWarn) {
          console.warn(`[validate] WARN: poucas palavras (${words}) em ${rel}`);
          wordLow++;
        }
      }
    }

    // gate de depoimentos (somente em production): 3 itens por página de cidade
    // Regra: se a página tem o bloco data-ct="testimonials", ela precisa ter 3 cards.
    if (publishMode === "production") {
      const hasBlock = /data-ct=["']testimonials["']/i.test(html);
      if (hasBlock) {
        const count = (html.match(/data-ct-testimonial=["']1["']/gi) || []).length;
        if (count < 3) {
          fail(`Poucos depoimentos (${count} < 3) em ${rel}`);
          bad++; testimonialsFail++;
        }
      }
    }
  }

  if (htmlFiles.length < expectedMinPages) {
    fail(`Poucas páginas geradas: ${htmlFiles.length} < esperado(${expectedMinPages}).`);
    bad++;
  } else {
    ok(`Páginas geradas: ${htmlFiles.length} (esperado >= ${expectedMinPages}).`);
  }

  ok(`Titles únicos: ${titles.size}. H1 únicos: ${h1s.size}.`);
  if (wordLow) console.warn(`[validate] WARN: ${wordLow} páginas com <${minWordsDraftWarn} palavras (draft).`);
  if (publishMode === "production") {
    ok(`Modo: production. Gates: palavras>=${minWordsProduction}; depoimentos>=3 nas páginas de cidade.`);
    if (wordHardFail) console.warn(`[validate] WARN: ${wordHardFail} falharam por palavras.`);
    if (testimonialsFail) console.warn(`[validate] WARN: ${testimonialsFail} falharam por depoimentos.`);
  } else {
    ok(`Modo: ${publishMode}. Gates: WARN palavras<${minWordsDraftWarn}.`);
  }

  if (bad) {
    fail(`Falhas: ${bad}.`);
  } else {
    ok("Quality gate passou.");
  }
}

main();

