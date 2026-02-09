"use strict";

module.exports = class {
  data() {
    return {
      permalink: "/sitemap.xml",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const base = String(data.site && data.site.siteUrl || "").replace(/\/+$/, "");
    const enabledTypes = (data && data.publish && Array.isArray(data.publish.enabledTypes))
      ? data.publish.enabledTypes
      : ["fretes", "mudancas", "urgente"];
    const cities = Array.isArray(data && data.publishedCities) ? data.publishedCities : [];

    // IMPORTANT (SEO): NÃO usar collections.all aqui.
    // As páginas de cidade são geradas via pagination e o Eleventy não inclui todas as páginas paginadas em collections.all por padrão.
    // Resultado: sitemap incompleto (apenas a primeira cidade). Por isso, usamos a mesma fonte canônica do `site_manifest.json`.
    const urls = [];
    urls.push("/");
    urls.push("/cidades/");
    urls.push("/politica-de-privacidade.html");
    urls.push("/termos-de-uso.html");

    for (const c of cities) {
      const slug = String(c && c.slug || "").trim();
      if (!slug) continue;
      if (enabledTypes.includes("fretes")) urls.push(`/fretes-em-${slug}/`);
      if (enabledTypes.includes("mudancas")) urls.push(`/mudancas-em-${slug}/`);
      if (enabledTypes.includes("urgente")) urls.push(`/frete-urgente-em-${slug}/`);
    }

    // remove duplicates
    const uniq = Array.from(new Set(urls)).sort();

    const esc = (s) => String(s || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

    const now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      uniq.map((u) => {
        const loc = base ? (base + u) : u;
        return `  <url><loc>${esc(loc)}</loc><lastmod>${esc(now)}</lastmod></url>`;
      }).join("\n") +
      `\n</urlset>\n`;
  }
};

