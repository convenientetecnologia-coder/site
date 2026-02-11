"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_MD = path.join(ROOT, "docs", "AUDITORIA_ENTERPRISE.md");

function readJson(fp) {
  return JSON.parse(fs.readFileSync(fp, "utf8"));
}

function hasBadEncoding(s) {
  return /Ã|Â|\uFFFD/.test(String(s || ""));
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function safe(s) {
  return String(s || "").replace(/\r?\n/g, " ").trim();
}

function mdEscape(s) {
  return safe(s).replace(/\|/g, "\\|");
}

function main() {
  const now = new Date().toISOString();

  const publishConfigPath = path.join(ROOT, "src", "_data", "publish_config.json");
  const neighborhoodsPath = path.join(ROOT, "src", "_data", "neighborhoods.json");
  const testimonialsPath = path.join(ROOT, "src", "_data", "testimonials.json");
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  const livroPath = path.join(ROOT, "docs", "LIVRO_DE_BORDO.md");
  const timelinePath = path.join(ROOT, "docs", "TIMELINE.md");

  const publish = readJson(publishConfigPath);
  const slugs = Array.isArray(publish.enabledCitySlugs) ? publish.enabledCitySlugs.map(String) : [];
  const enabledTypes = Array.isArray(publish.enabledTypes) ? publish.enabledTypes.map(String) : ["fretes", "mudancas", "urgente"];

  const slugsUniq = uniq(slugs);
  const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);

  const neighborhoods = readJson(neighborhoodsPath);
  const testimonials = readJson(testimonialsPath);
  const sitemapXml = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
  const livro = fs.existsSync(livroPath) ? fs.readFileSync(livroPath, "utf8") : "";
  const timeline = fs.existsSync(timelinePath) ? fs.readFileSync(timelinePath, "utf8") : "";

  // Expectations
  const base = "https://www.fretesoumudancas.com.br";
  const expectedCityUrls = [];
  for (const slug of slugsUniq) {
    if (enabledTypes.includes("fretes")) expectedCityUrls.push(`${base}/fretes-em-${slug}/`);
    if (enabledTypes.includes("mudancas")) expectedCityUrls.push(`${base}/mudancas-em-${slug}/`);
    if (enabledTypes.includes("urgente")) expectedCityUrls.push(`${base}/frete-urgente-em-${slug}/`);
  }
  const sitemapLocs = sitemapXml.match(/<loc>[^<]+<\/loc>/g) || [];
  const sitemapUrls = sitemapLocs.map((s) => s.replace(/^<loc>|<\/loc>$/g, ""));

  // Checks
  const problems = [];
  const warnings = [];

  if (!slugsUniq.length) problems.push("publish_config.json: enabledCitySlugs está vazio.");
  if (slugsUniq.length !== slugs.length) problems.push(`publish_config.json: slugs duplicados detectados: ${uniq(dupSlugs).join(", ")}`);

  // sitemap: require all expected city URLs present
  const missingInSitemap = expectedCityUrls.filter((u) => !sitemapXml.includes(`<loc>${u}</loc>`));
  if (missingInSitemap.length) {
    problems.push(`sitemap.xml: faltam ${missingInSitemap.length} URLs de cidades habilitadas.`);
  }

  // data integrity per slug
  const missingCityContent = [];
  const encodingIssues = [];
  const missingNeighborhoods = [];
  const badNeighborhoodBlocks = [];
  const testimonialsBad = [];
  const missingPages = [];
  const missingLivro = [];
  const missingTimeline = [];

  for (const slug of slugsUniq) {
    // city_content
    const ccPath = path.join(ROOT, "src", "_data", "city_content", `${slug}.json`);
    if (!fs.existsSync(ccPath)) {
      missingCityContent.push(slug);
    } else {
      try {
        const cc = readJson(ccPath);
        if (hasBadEncoding(cc?.meta?.city)) encodingIssues.push({ where: "city_content.meta.city", slug, value: cc?.meta?.city });
      } catch (e) {
        problems.push(`city_content/${slug}.json: JSON inválido (${e && e.message ? e.message : "erro"}).`);
      }
    }

    // neighborhoods
    const n = neighborhoods[slug];
    if (!n) {
      missingNeighborhoods.push(slug);
    } else {
      const all = Array.isArray(n.all) ? n.all.length : 0;
      const blocks = n.blocks || {};
      const bf = Array.isArray(blocks.fretes) ? blocks.fretes.length : 0;
      const bm = Array.isArray(blocks.mudancas) ? blocks.mudancas.length : 0;
      const bu = Array.isArray(blocks.urgente) ? blocks.urgente.length : 0;
      const ok = bf > 0 && bm > 0 && bu > 0 && all === bf + bm + bu;
      if (!ok) badNeighborhoodBlocks.push({ slug, all, fretes: bf, mudancas: bm, urgente: bu });
      if (hasBadEncoding(n.city)) encodingIssues.push({ where: "neighborhoods.city", slug, value: n.city });
    }

    // testimonials (expects 12/12/12)
    const counts = { fretes: 0, mudancas: 0, urgente: 0, total: 0 };
    for (const t of testimonials) {
      if (t && t.citySlug === slug) {
        counts.total++;
        if (counts[t.type] !== undefined) counts[t.type]++;
      }
    }
    if (!(counts.fretes === 12 && counts.mudancas === 12 && counts.urgente === 12 && counts.total === 36)) {
      testimonialsBad.push({ slug, ...counts });
    }

    // published pages in repo (root)
    const pages = [
      path.join(ROOT, `fretes-em-${slug}`, "index.html"),
      path.join(ROOT, `mudancas-em-${slug}`, "index.html"),
      path.join(ROOT, `frete-urgente-em-${slug}`, "index.html"),
    ];
    for (const p of pages) {
      if (!fs.existsSync(p)) missingPages.push(p);
    }

    // livros
    const needleFretes = `/fretes-em-${slug}/`;
    if (!livro.includes(needleFretes)) missingLivro.push(slug);
    if (!timeline.includes(needleFretes)) missingTimeline.push(slug);
  }

  if (missingCityContent.length) problems.push(`city_content: faltam ${missingCityContent.length} arquivos (ex.: ${missingCityContent.slice(0, 5).join(", ")}).`);
  if (missingNeighborhoods.length) problems.push(`neighborhoods.json: faltam ${missingNeighborhoods.length} entradas (ex.: ${missingNeighborhoods.slice(0, 5).join(", ")}).`);
  if (badNeighborhoodBlocks.length) problems.push(`neighborhoods.json: ${badNeighborhoodBlocks.length} cidades com blocos inconsistentes (sum != all ou bloco vazio).`);
  if (testimonialsBad.length) problems.push(`testimonials.json: ${testimonialsBad.length} cidades fora do padrão 12/12/12.`);
  if (encodingIssues.length) problems.push(`Encoding: ${encodingIssues.length} ocorrências de texto quebrado (Ã/Â/�).`);
  if (missingPages.length) warnings.push(`Repo: faltam ${missingPages.length} arquivos de páginas geradas (talvez não versionadas em algum momento).`);
  if (missingLivro.length) problems.push(`LIVRO_DE_BORDO.md: ${missingLivro.length} cidades sem registro (por slug).`);
  if (missingTimeline.length) problems.push(`TIMELINE.md: ${missingTimeline.length} cidades sem registro (por slug).`);

  // Report
  const lines = [];
  lines.push("### Auditoria enterprise — SITE (gerado)");
  lines.push("");
  lines.push(`Gerado em: \`${now}\``);
  lines.push("");
  lines.push("Objetivo: validar (110%) que publish_config, sitemap, dados e livros estão consistentes.");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Resumo");
  lines.push("");
  lines.push(`- **Cidades habilitadas (unique)**: **${slugsUniq.length}**`);
  lines.push(`- **Tipos habilitados**: \`${enabledTypes.join(", ")}\``);
  lines.push(`- **URLs de cidades esperadas (3 por cidade)**: **${expectedCityUrls.length}**`);
  lines.push(`- **URLs no sitemap.xml**: **${sitemapUrls.length}**`);
  lines.push("");
  lines.push(`- **Problemas**: **${problems.length}**`);
  lines.push(`- **Warnings**: **${warnings.length}**`);
  lines.push("");

  lines.push("## Problemas (FAIL)");
  lines.push("");
  if (!problems.length) {
    lines.push("Nenhum problema detectado.");
  } else {
    for (const p of problems) lines.push(`- ${mdEscape(p)}`);
  }
  lines.push("");

  lines.push("## Warnings");
  lines.push("");
  if (!warnings.length) {
    lines.push("Nenhum warning.");
  } else {
    for (const w of warnings) lines.push(`- ${mdEscape(w)}`);
  }
  lines.push("");

  lines.push("---");
  lines.push("");
  lines.push("## Detalhes (amostras)");
  lines.push("");

  lines.push(`- **missingInSitemap**: ${missingInSitemap.length}`);
  if (missingInSitemap.length) lines.push(`  - sample: ${missingInSitemap.slice(0, 5).map((u) => `\`${u}\``).join(", ")}`);

  lines.push(`- **missingCityContent**: ${missingCityContent.length}`);
  if (missingCityContent.length) lines.push(`  - sample: ${missingCityContent.slice(0, 10).map((s) => `\`${s}\``).join(", ")}`);

  lines.push(`- **badNeighborhoodBlocks**: ${badNeighborhoodBlocks.length}`);
  if (badNeighborhoodBlocks.length) {
    for (const b of badNeighborhoodBlocks.slice(0, 10)) {
      lines.push(`  - \`${b.slug}\`: all=${b.all}, fretes=${b.fretes}, mudancas=${b.mudancas}, urgente=${b.urgente}`);
    }
  }

  lines.push(`- **testimonialsBad**: ${testimonialsBad.length}`);
  if (testimonialsBad.length) {
    for (const b of testimonialsBad.slice(0, 10)) {
      lines.push(`  - \`${b.slug}\`: fretes=${b.fretes}, mudancas=${b.mudancas}, urgente=${b.urgente}, total=${b.total}`);
    }
  }

  lines.push(`- **encodingIssues**: ${encodingIssues.length}`);
  if (encodingIssues.length) {
    for (const e of encodingIssues.slice(0, 10)) {
      lines.push(`  - \`${e.slug}\` @ ${mdEscape(e.where)}: "${mdEscape(e.value)}"`);
    }
  }

  lines.push(`- **missingLivro**: ${missingLivro.length}`);
  if (missingLivro.length) lines.push(`  - sample: ${missingLivro.slice(0, 15).map((s) => `\`${s}\``).join(", ")}`);

  lines.push(`- **missingTimeline**: ${missingTimeline.length}`);
  if (missingTimeline.length) lines.push(`  - sample: ${missingTimeline.slice(0, 15).map((s) => `\`${s}\``).join(", ")}`);

  lines.push("");

  fs.writeFileSync(OUT_MD, lines.join("\n") + "\n", "utf8");
  console.log(`[audit:enterprise] wrote ${OUT_MD}`);

  if (problems.length) {
    console.error(`[audit:enterprise] FAIL: ${problems.length} problema(s).`);
    process.exitCode = 2;
  } else {
    console.log("[audit:enterprise] OK: tudo consistente.");
  }
}

main();

