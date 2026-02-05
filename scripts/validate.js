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

function extractMainHtml(html) {
  const m = String(html || "").match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? String(m[1] || "") : String(html || "");
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

// -------- Near-duplicate gate (SimHash over 5-grams) --------
const MASK_64 = (1n << 64n) - 1n;

function fnv1a64(str) {
  let h = 0xcbf29ce484222325n; // offset basis
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h ^= BigInt(s.charCodeAt(i));
    h = (h * 0x100000001b3n) & MASK_64;
  }
  return h;
}

function simhash64FromTokens(tokens, shingleSize = 5) {
  const w = new Array(64).fill(0);
  const t = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
  if (t.length < shingleSize) return 0n;
  for (let i = 0; i <= t.length - shingleSize; i++) {
    const shingle = t.slice(i, i + shingleSize).join(" ");
    const h = fnv1a64(shingle);
    for (let b = 0n; b < 64n; b++) {
      const bit = (h >> b) & 1n;
      w[Number(b)] += bit ? 1 : -1;
    }
  }
  let out = 0n;
  for (let b = 0n; b < 64n; b++) {
    if (w[Number(b)] >= 0) out |= (1n << b);
  }
  return out & MASK_64;
}

function popcount64(x) {
  let v = x & MASK_64;
  let c = 0;
  while (v) {
    v &= (v - 1n);
    c++;
  }
  return c;
}

function hamming64(a, b) {
  return popcount64((a ^ b) & MASK_64);
}

function bandKey16(h, bandIdx) {
  const shift = BigInt((bandIdx % 4) * 16);
  return Number((h >> shift) & 0xffffn);
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
  const simPages = []; // { rel, pageType, hash }

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
    const mainHtml = extractMainHtml(html);
    const text = stripTags(mainHtml);
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
      // GPT-only: em production, páginas de cidade precisam declarar origem do conteúdo.
      // Isso impede qualquer publicação com fallback determinístico.
      if (publishMode === "production") {
        const hasMarker = /data-content-source=["']city_content["']/i.test(html);
        if (!hasMarker) {
          fail(`GPT-only: página de cidade sem marker city_content em ${rel}`);
          bad++;
        }
      }

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

    // gate near-duplicate (SimHash): só computa para páginas de cidade com conteúdo suficiente
    if (isCityPage && words >= 400) {
      const fpTxt = fingerprintText(text);
      const tokens = fpTxt ? fpTxt.split(" ").filter(Boolean) : [];
      if (tokens.length >= 200) {
        const hash = simhash64FromTokens(tokens, 5);
        const t = (pageType === "fretes" || pageType === "mudancas" || pageType === "urgente") ? pageType : "city";
        simPages.push({ rel, pageType: t, hash });
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

  // Near-duplicate gate: compara páginas por tipo (fretes/mudancas/urgente)
  // Em draft: WARN. Em production: FAIL.
  const maxHamming = 10; // <=10 bits ~ muito parecido (aprox >84%)
  let nearDupes = 0;
  const byType = new Map();
  for (const p of simPages) {
    if (!byType.has(p.pageType)) byType.set(p.pageType, []);
    byType.get(p.pageType).push(p);
  }

  for (const [t, arr] of byType.entries()) {
    if (t !== "fretes" && t !== "mudancas" && t !== "urgente") continue;
    if (arr.length < 2) continue;

    // LSH: 4 bandas de 16 bits para reduzir pares
    const buckets = new Map(); // key -> [idx]
    for (let i = 0; i < arr.length; i++) {
      const h = arr[i].hash;
      for (let b = 0; b < 4; b++) {
        const key = `${t}:${b}:${bandKey16(h, b)}`;
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push(i);
      }
    }

    const compared = new Set(); // "i|j"
    const reportLimit = 20;
    for (const idxs of buckets.values()) {
      if (idxs.length < 2) continue;
      // bound worst-case within bucket
      const lim = idxs.length > 80 ? 80 : idxs.length;
      for (let ai = 0; ai < lim; ai++) {
        for (let bi = ai + 1; bi < lim; bi++) {
          const i = idxs[ai];
          const j = idxs[bi];
          const key = i < j ? `${i}|${j}` : `${j}|${i}`;
          if (compared.has(key)) continue;
          compared.add(key);
          const d = hamming64(arr[i].hash, arr[j].hash);
          if (d <= maxHamming) {
            nearDupes++;
            const msg = `Near-duplicate (${t}) hamming=${d} entre ${arr[i].rel} e ${arr[j].rel}`;
            if (publishMode === "production") { fail(msg); bad++; }
            else console.warn("[validate] WARN:", msg);
            if (nearDupes >= reportLimit && publishMode === "production") break;
          }
        }
        if (nearDupes >= reportLimit && publishMode === "production") break;
      }
      if (nearDupes >= reportLimit && publishMode === "production") break;
    }
  }

  ok(`Titles únicos: ${titles.size}. H1 únicos: ${h1s.size}.`);
  if (wordLow) console.warn(`[validate] WARN: ${wordLow} páginas com <${minWordsDraftWarn} palavras (draft).`);
  if (publishMode === "production") {
    ok(`Modo: production. Gates: palavras>=${minWordsProduction}; depoimentos>=3 nas páginas de cidade; near-duplicate(simhash) hamming<=${maxHamming} FAIL.`);
    if (wordHardFail) console.warn(`[validate] WARN: ${wordHardFail} falharam por palavras.`);
    if (testimonialsFail) console.warn(`[validate] WARN: ${testimonialsFail} falharam por depoimentos.`);
    if (nearDupes) console.warn(`[validate] WARN: ${nearDupes} near-duplicates detectados (corrigir antes de escalar).`);
  } else {
    ok(`Modo: ${publishMode}. Gates: WARN palavras<${minWordsDraftWarn}.`);
    if (nearDupes) console.warn(`[validate] WARN: ${nearDupes} near-duplicates detectados (simhash).`);
  }

  if (bad) {
    fail(`Falhas: ${bad}.`);
  } else {
    ok("Quality gate passou.");
  }
}

main();

