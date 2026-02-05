"use strict";

const raw = require("./cities_raw.json");

function slugifyCityName(name) {
  const s = String(name || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
  return s
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

module.exports = (raw || [])
  .map((name) => ({
    name: String(name || "").trim(),
    slug: slugifyCityName(name)
  }))
  .filter((c) => c.name && c.slug);

