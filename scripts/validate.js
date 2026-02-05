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
  try {
    const pubCfg = require(path.join(ROOT, "src", "_data", "publish"));
    const list = require(path.join(ROOT, "src", "_data", "publishedCities"));
    enabledCities = Array.isArray(list) ? list.length : 0;
    const types = Array.isArray(pubCfg && pubCfg.enabledTypes) ? pubCfg.enabledTypes : [];
    enabledTypes = Math.max(0, types.length || 3);
  } catch {}
  const expectedMinPages = Math.max(1, 1 + (enabledCities * enabledTypes));

  let bad = 0;
  let wordLow = 0;

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

    // gate básico (vamos calibrar depois): 250 palavras mínimo inicial
    if (words < 250) {
      console.warn(`[validate] WARN: poucas palavras (${words}) em ${rel}`);
      wordLow++;
    }
  }

  if (htmlFiles.length < expectedMinPages) {
    fail(`Poucas páginas geradas: ${htmlFiles.length} < esperado(${expectedMinPages}).`);
    bad++;
  } else {
    ok(`Páginas geradas: ${htmlFiles.length} (esperado >= ${expectedMinPages}).`);
  }

  ok(`Titles únicos: ${titles.size}. H1 únicos: ${h1s.size}.`);
  if (wordLow) console.warn(`[validate] WARN: ${wordLow} páginas com <250 palavras (gate provisório).`);

  if (bad) {
    fail(`Falhas: ${bad}.`);
  } else {
    ok("Quality gate passou.");
  }
}

main();

