"use strict";

const path = require("path");

function slugifyCityName(name) {
  // remove acentos + normaliza separadores
  const s = String(name || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  // mantém letras/números e converte espaços em hífen
  return s
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

module.exports = function (eleventyConfig) {
  // Assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Filters
  eleventyConfig.addFilter("slugCity", (v) => slugifyCityName(v));
  eleventyConfig.addFilter("toISODate", (ms) => {
    try {
      const d = ms ? new Date(ms) : new Date();
      return d.toISOString();
    } catch {
      return new Date().toISOString();
    }
  });

  // Global data shortcuts
  eleventyConfig.addGlobalData("env", {
    nodeEnv: String(process.env.NODE_ENV || "development")
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"]
  };
};

