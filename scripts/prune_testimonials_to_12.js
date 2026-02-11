"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const FP = path.join(ROOT, "src", "_data", "testimonials.json");

function keepIdUpTo12(id) {
  const m = String(id || "").match(/_(\d\d)$/);
  if (!m) return true; // se não tiver padrão, não mexe
  const n = parseInt(m[1], 10);
  return n >= 1 && n <= 12;
}

function main() {
  const slugsArg = process.argv.find((a) => a.startsWith("--slugs="));
  const typesArg = process.argv.find((a) => a.startsWith("--types="));

  const slugs = slugsArg ? slugsArg.replace("--slugs=", "").split(",").map((s) => s.trim()).filter(Boolean) : [];
  const types = typesArg ? typesArg.replace("--types=", "").split(",").map((s) => s.trim()).filter(Boolean) : [];

  if (!slugs.length) {
    console.error("Uso: node scripts/prune_testimonials_to_12.js --slugs=slug1,slug2 --types=fretes,urgente");
    process.exitCode = 2;
    return;
  }

  const arr = JSON.parse(fs.readFileSync(FP, "utf8"));
  const before = arr.length;

  const out = [];
  let removed = 0;
  for (const o of arr) {
    const matchCity = o && slugs.includes(o.citySlug);
    const matchType = !types.length || (o && types.includes(o.type));

    if (matchCity && matchType) {
      if (!keepIdUpTo12(o.id)) {
        removed++;
        continue;
      }
    }
    out.push(o);
  }

  fs.writeFileSync(FP, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`[prune_testimonials_to_12] removed=${removed} total ${before} -> ${out.length}`);
}

main();

