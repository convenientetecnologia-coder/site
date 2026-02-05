"use strict";

module.exports = class {
  data() {
    return {
      permalink: "/site_manifest.json",
      eleventyExcludeFromCollections: true
    };
  }

  render(data) {
    const base = String((data && data.site && data.site.siteUrl) || "").replace(/\/+$/, "");
    const mode = String((data && data.publish && data.publish.mode) || "draft");
    const cities = Array.isArray(data && data.publishedCities) ? data.publishedCities : [];

    const out = {
      ok: true,
      mode,
      generatedAt: new Date().toISOString(),
      siteUrl: base,
      cities: cities.map((c) => {
        const slug = String(c.slug || "").trim();
        return {
          slug,
          name: String(c.name || slug),
          links: {
            fretes: `${base}/fretes-em-${slug}/`,
            mudancas: `${base}/mudancas-em-${slug}/`,
            urgente: `${base}/frete-urgente-em-${slug}/`
          }
        };
      })
    };

    return JSON.stringify(out, null, 2);
  }
};

