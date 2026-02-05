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
    const urls = (data.collections && data.collections.all ? data.collections.all : [])
      .map((p) => p && p.url ? String(p.url) : "")
      .filter((u) => u && u !== "/robots.txt" && u !== "/sitemap.xml")
      .map((u) => u.startsWith("/") ? u : ("/" + u));

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

