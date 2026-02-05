"use strict";

const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "city_content");

function safeJsonParse(raw, fallback) {
  try { return JSON.parse(String(raw)); } catch { return fallback; }
}

function loadAll() {
  const out = {};
  try {
    if (!fs.existsSync(DIR)) return out;
    const entries = fs.readdirSync(DIR, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile()) continue;
      if (!e.name.toLowerCase().endsWith(".json")) continue;
      const slug = e.name.slice(0, -5).trim().toLowerCase();
      if (!slug) continue;
      const fp = path.join(DIR, e.name);
      const raw = fs.readFileSync(fp, "utf8");
      const j = safeJsonParse(raw, null);
      if (j && typeof j === "object") out[slug] = j;
    }
  } catch {
    // ignore
  }
  return out;
}

// Cache em memória durante o build (Eleventy roda em Node).
const ALL = loadAll();

function getCity(slug) {
  const key = String(slug || "").trim().toLowerCase();
  return key ? (ALL[key] || null) : null;
}

function getType(slug, type) {
  const city = getCity(slug);
  if (!city) return null;
  const t = String(type || "").trim().toLowerCase();
  if (!t) return null;
  return (city[t] && typeof city[t] === "object") ? city[t] : null;
}

module.exports = { all: ALL, getCity, getType };

