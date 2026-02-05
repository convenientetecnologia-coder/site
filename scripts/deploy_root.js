"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const MANIFEST = path.join(ROOT, ".deploy_root_manifest.json");

function safeJsonParse(s, fallback) {
  try { return JSON.parse(String(s)); } catch { return fallback; }
}

function readManifest() {
  try {
    if (!fs.existsSync(MANIFEST)) return [];
    const raw = fs.readFileSync(MANIFEST, "utf8");
    const j = safeJsonParse(raw, []);
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

function writeManifest(list) {
  const tmp = MANIFEST + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(list, null, 2), "utf8");
  fs.renameSync(tmp, MANIFEST);
}

function listFilesRecursive(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { entries = []; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) out.push(p);
    }
  }
  return out;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function unlinkIfExists(fp) {
  try { if (fs.existsSync(fp)) fs.unlinkSync(fp); } catch {}
}

function rmdirIfEmpty(dir) {
  try {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    if (!items.length) fs.rmdirSync(dir);
  } catch {}
}

function cleanupOldFiles(prevRelFiles) {
  // remove arquivos antigos copiados na execução anterior
  for (const rel of prevRelFiles) {
    const abs = path.join(ROOT, rel);
    unlinkIfExists(abs);
    // tenta limpar pastas vazias (subindo até root, mas sem passar de ROOT)
    let cur = path.dirname(abs);
    for (let i = 0; i < 12; i++) {
      if (!cur || cur === ROOT) break;
      rmdirIfEmpty(cur);
      cur = path.dirname(cur);
    }
  }
}

function copyFileSync(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error(`[deploy:root] FAIL: dist/ não existe: ${DIST}. Rode npm run build antes.`);
    process.exitCode = 2;
    return;
  }

  const prev = readManifest();
  cleanupOldFiles(prev);

  const files = listFilesRecursive(DIST);
  const relList = [];
  for (const f of files) {
    const rel = path.relative(DIST, f).replace(/\\/g, "/");
    if (!rel) continue;
    // não copiar manifest interno do repo se existir no dist (não é o caso, mas guardrail)
    if (rel === ".deploy_root_manifest.json") continue;
    const dst = path.join(ROOT, rel);
    copyFileSync(f, dst);
    relList.push(rel);
  }

  writeManifest(relList);
  console.log(`[deploy:root] OK: ${relList.length} arquivo(s) copiados de dist/ para a raiz (webroot).`);
}

main();

