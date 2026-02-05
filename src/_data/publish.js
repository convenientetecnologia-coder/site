"use strict";

const cfg = require("./publish_config.json");

function normMode(v) {
  const s = String(v || "").trim().toLowerCase();
  return (s === "production" || s === "prod") ? "production" : "draft";
}

function uniqStr(arr) {
  const out = [];
  const seen = new Set();
  for (const x of (Array.isArray(arr) ? arr : [])) {
    const s = String(x || "").trim();
    if (!s) continue;
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

// Permite override local via env sem mudar o arquivo (útil para preview).
const envMode = String(process.env.SITE_MODE || "").trim();
const envAll = String(process.env.SITE_PUBLISH_ALL || "").trim() === "1";

module.exports = {
  mode: normMode(envMode || cfg.mode || "draft"),
  enabledCitySlugs: envAll ? ["*"] : uniqStr(cfg.enabledCitySlugs),
  enabledTypes: uniqStr(cfg.enabledTypes)
};

