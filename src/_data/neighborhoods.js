"use strict";

function safeRequireJson(relPath) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const j = require(relPath);
    return (j && typeof j === "object") ? j : {};
  } catch {
    return {};
  }
}

// Fonte canônica (gerada/curada): `src/_data/neighborhoods.json`
// Obs: em produção, isso é conteúdo estático (sem chamada externa).
const DATA = safeRequireJson("./neighborhoods.json");

function listForCity(slug) {
  const key = String(slug || "").trim().toLowerCase();
  const entry = DATA && DATA[key] ? DATA[key] : null;
  const list = entry && Array.isArray(entry.all) ? entry.all : [];
  return list.slice();
}

function listForCityType(slug, type) {
  const key = String(slug || "").trim().toLowerCase();
  const t = String(type || "").trim().toLowerCase();
  const entry = DATA && DATA[key] ? DATA[key] : null;
  const blocks = entry && entry.blocks && typeof entry.blocks === "object" ? entry.blocks : null;
  const list = blocks && Array.isArray(blocks[t]) ? blocks[t] : [];
  if (list.length) return list.slice();
  // fallback: se não houver bloco, usa lista inteira (curta) como base
  return listForCity(slug);
}

module.exports = { listForCity, listForCityType };

