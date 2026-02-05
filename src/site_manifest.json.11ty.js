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
    const enabledTypes = (data && data.publish && Array.isArray(data.publish.enabledTypes)) ? data.publish.enabledTypes : ["fretes","mudancas","urgente"];
    const cities = Array.isArray(data && data.publishedCities) ? data.publishedCities : [];

    const out = {
      ok: true,
      mode,
      generatedAt: new Date().toISOString(),
      siteUrl: base,
      cities: cities.map((c) => {
        const slug = String(c.slug || "").trim();
        const links = {};
        if (enabledTypes.includes("fretes")) links.fretes = `${base}/fretes-em-${slug}/`;
        if (enabledTypes.includes("mudancas")) links.mudancas = `${base}/mudancas-em-${slug}/`;
        if (enabledTypes.includes("urgente")) links.urgente = `${base}/frete-urgente-em-${slug}/`;
        return {
          slug,
          name: String(c.name || slug),
          links
        };
      })
    };

    return JSON.stringify(out, null, 2);
  }
};

