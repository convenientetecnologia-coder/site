"use strict";

const all = require("./testimonials.json");
const variants = require("./variants");

/**
 * Schema (cada item):
 * {
 *   "id": "t_...",
 *   "text": "…",
 *   "author": "João" | "M." | "Cliente",
 *   "citySlug": "florianopolis" | null,
 *   "type": "fretes" | "mudancas" | "urgente" | "all",
 *   "ts": 1730000000000 | null,
 *   "source": "motorista" | "cliente" | "interno"
 * }
 */

function normType(v) {
  const t = String(v || "").trim().toLowerCase();
  if (t === "fretes" || t === "mudancas" || t === "urgente" || t === "all") return t;
  return "all";
}

function cleanText(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function normItem(x) {
  if (!x || typeof x !== "object") return null;
  const text = cleanText(x.text);
  if (!text) return null;
  const author = cleanText(x.author || "Cliente").slice(0, 32);
  const type = normType(x.type);
  const citySlug = cleanText(x.citySlug || "");
  const id = cleanText(x.id || "");
  const ts = x.ts == null ? null : (Number(x.ts) || null);
  const source = cleanText(x.source || "interno").slice(0, 24);
  return { id: id || null, text, author, type, citySlug: citySlug || null, ts, source };
}

const items = (Array.isArray(all) ? all : []).map(normItem).filter(Boolean);

function seededOrder(pool, seed) {
  const arr = Array.isArray(pool) ? pool.slice() : [];
  if (arr.length <= 1) return arr;
  return arr.sort((a, b) => {
    const ka = `${a && (a.id || "")}::${a && a.text}`;
    const kb = `${b && (b.id || "")}::${b && b.text}`;
    const ha = variants.hash32(`${seed}::${ka}`);
    const hb = variants.hash32(`${seed}::${kb}`);
    if (ha === hb) return 0;
    return ha < hb ? -1 : 1;
  });
}

function pickFor({ citySlug, type, limit = 3 }) {
  const wantType = normType(type);
  const slug = String(citySlug || "").trim();
  const lim = Math.max(0, Math.min(12, Number(limit || 3) || 3));

  // prioridade:
  // 1) cidade+tipo
  // 2) cidade+all
  // 3) tipo (qualquer cidade)
  // 4) all (qualquer cidade)
  const pools = [
    items.filter(t => t.citySlug === slug && t.type === wantType),
    items.filter(t => t.citySlug === slug && t.type === "all"),
    items.filter(t => !t.citySlug && t.type === wantType),
    items.filter(t => !t.citySlug && t.type === "all")
  ];

  const out = [];
  const seen = new Set();
  const seed = `pick::${slug}::${wantType}`;
  for (let i = 0; i < pools.length; i++) {
    const pool = seededOrder(pools[i], `${seed}::p${i}`);
    for (const t of pool) {
      const key = (t.id || "") + "::" + t.text;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(t);
      if (out.length >= lim) return out;
    }
  }
  return out;
}

module.exports = { items, pickFor };

