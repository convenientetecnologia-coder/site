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

  for (const fp of htmlFiles) {
    const rel = fp.slice(DIST.length).replace(/\\\\/g, "/");
    const html = fs.readFileSync(fp, "utf8");
    const title = extractOne(html, /<title>([^<]*)<\/title>/i);
    const h1 = extractOne(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, "").trim();
    const text = stripTags(html);
    const words = text ? text.split(" ").filter(Boolean).length : 0;

    if (!title) { fail(`Sem <title> em ${rel}`); bad++; continue; }
    if (!h1) { fail(`Sem <h1> em ${rel}`); bad++; continue; }

    if (titles.has(title)) { fail(`Title duplicado: "${title}" em ${rel} (já existe em ${titles.get(title)})`); bad++; }
    else titles.set(title, rel);

    if (h1s.has(h1)) { fail(`H1 duplicado: "${h1}" em ${rel} (já existe em ${h1s.get(h1)})`); bad++; }
    else h1s.set(h1, rel);

    // gate de palavras
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

