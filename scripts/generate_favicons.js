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

  // Preferimos gerar o favicon a partir da "foto de perfil" (OG padrão),
  // para evitar o "globo branco" e manter consistência visual.
  const inProfileJpg = path.join(ROOT, "src", "assets", "og-default.jpg");
  const inSvg = path.join(ROOT, "src", "assets", "favicon.svg");
  const outDir = path.join(ROOT, "src", "static");
  ensureDir(outDir);

  /** @type {(size:number)=>string} */
  function svgFor(size) {
    if (fs.existsSync(inProfileJpg)) {
      const buf = fs.readFileSync(inProfileJpg);
      const b64 = buf.toString("base64");
      const dataUri = `data:image/jpeg;base64,${b64}`;

      // Ícone "enterprise": recorte central (cover) com borda (contraste no SERP).
      // viewBox fixo para manter consistência em qualquer tamanho de saída.
      return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="clipCircle">
      <circle cx="50" cy="50" r="46"/>
    </clipPath>
  </defs>
  <rect width="100" height="100" rx="22" fill="#ffffff"/>
  <g clip-path="url(#clipCircle)">
    <image href="${dataUri}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <circle cx="50" cy="50" r="46" fill="none" stroke="#075e54" stroke-width="6"/>
</svg>
`.trim();
    }

    // Fallback: SVG de marca.
    return fs.readFileSync(inSvg, "utf8");
  }

  const targets = [
    { file: "favicon-48.png", size: 48 },
    { file: "favicon-192.png", size: 192 },
    { file: "apple-touch-icon.png", size: 180 },
  ];

  for (const t of targets) {
    const svg = svgFor(t.size);
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

