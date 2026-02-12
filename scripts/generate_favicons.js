"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  // Renderiza PNG a partir do SVG (sem depender de binários externos).
  const { Resvg } = require("@resvg/resvg-js");

  const inSvg = path.join(ROOT, "src", "assets", "favicon.svg");
  const outDir = path.join(ROOT, "src", "static");
  ensureDir(outDir);

  const svg = fs.readFileSync(inSvg, "utf8");

  const targets = [
    { file: "favicon-48.png", size: 48 },
    { file: "favicon-192.png", size: 192 },
    { file: "apple-touch-icon.png", size: 180 },
  ];

  for (const t of targets) {
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: t.size },
      background: "rgba(0,0,0,0)",
    });
    const png = resvg.render().asPng();
    const out = path.join(outDir, t.file);
    fs.writeFileSync(out, png);
    console.log(`[favicons] wrote ${path.relative(ROOT, out)} (${t.size}x${t.size})`);
  }
}

main();

