"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_MD = path.join(ROOT, "docs", "AUDITORIA_DEPOIMENTOS.md");

function deaccent(s) {
  const str = String(s || "");
  try {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  } catch {
    // fallback bem simples (sem unicode props)
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

function safe(s) {
  return String(s || "").replace(/\r?\n/g, " ").trim();
}

function mdEscape(s) {
  return safe(s).replace(/\|/g, "\\|");
}

function main() {
  // reusa normalização do módulo canônico
  const testimonials = require(path.join(ROOT, "src", "_data", "testimonials"));
  const items = Array.isArray(testimonials.items) ? testimonials.items : [];

  const byFp = new Map(); // fp -> items
  for (const t of items) {
    const fp = fingerprintText(t.text);
    if (!fp) continue;
    if (!byFp.has(fp)) byFp.set(fp, []);
    byFp.get(fp).push(t);
  }

  const dups = [];
  for (const [fp, arr] of byFp.entries()) {
    if (arr.length > 1) dups.push({ fp, arr });
  }
  dups.sort((a, b) => b.arr.length - a.arr.length);

  const sorted = items.slice().sort((a, b) => {
    const ca = (a.citySlug || "").localeCompare(b.citySlug || "");
    if (ca) return ca;
    const ta = String(a.type || "").localeCompare(String(b.type || ""));
    if (ta) return ta;
    return safe(a.text).localeCompare(safe(b.text));
  });

  const now = new Date().toISOString();
  const lines = [];
  lines.push("### Auditoria de depoimentos — SITE (gerado)");
  lines.push("");
  lines.push(`Gerado em: \`${now}\``);
  lines.push("");
  lines.push("Fonte de verdade: `src/_data/testimonials.json` (via `src/_data/testimonials.js`).");
  lines.push("");
  lines.push("Como rodar:");
  lines.push("");
  lines.push("```bash");
  lines.push("npm run audit:testimonials");
  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`Total de depoimentos: **${sorted.length}**`);
  lines.push("");

  if (!sorted.length) {
    lines.push("Nenhum depoimento cadastrado ainda.");
    lines.push("");
  }

  lines.push("## Duplicados (fingerprint igual)");
  lines.push("");
  if (!dups.length) {
    lines.push("Nenhum duplicado detectado.");
    lines.push("");
  } else {
    lines.push(`Foram detectados **${dups.length}** grupos duplicados.`);
    lines.push("");
    for (const g of dups.slice(0, 50)) {
      const sample = safe((g.arr[0] && g.arr[0].text) || "").slice(0, 180);
      lines.push(`- **${g.arr.length}x**: "${sample}${sample.length >= 180 ? "…" : ""}"`);
      for (const t of g.arr) {
        lines.push(`  - type=\`${t.type}\`, city=\`${t.citySlug || "null"}\`, author="${safe(t.author)}", id=\`${t.id || "null"}\``);
      }
    }
    if (dups.length > 50) {
      lines.push("");
      lines.push(`(mostrando 50 de ${dups.length} grupos duplicados)`);
      lines.push("");
    }
  }

  lines.push("---");
  lines.push("");
  lines.push("## Registro completo (para conferência humana)");
  lines.push("");
  lines.push("| citySlug | type | author | id | text |");
  lines.push("|---|---|---|---|---|");
  for (const t of sorted) {
    lines.push(`| \`${mdEscape(t.citySlug || "")}\` | \`${mdEscape(t.type)}\` | ${mdEscape(t.author)} | \`${mdEscape(t.id || "")}\` | ${mdEscape(t.text)} |`);
  }
  lines.push("");

  fs.writeFileSync(OUT_MD, lines.join("\n"), "utf8");
  console.log(`[audit:testimonials] wrote ${OUT_MD}`);

  if (dups.length) {
    console.error(`[audit:testimonials] FAIL: ${dups.length} grupos duplicados.`);
    process.exitCode = 2;
  } else {
    console.log("[audit:testimonials] OK: sem duplicados.");
  }
}

main();

