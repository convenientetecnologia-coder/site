"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const k = a.slice(2);
    const v = (i + 1 < argv.length && !argv[i + 1].startsWith("--")) ? argv[++i] : "1";
    out[k] = v;
  }
  return out;
}

function cleanText(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function slugify(name) {
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

function nodeCmd() {
  return process.platform === "win32" ? "node.exe" : "node";
}

function npmCmd() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function runNode(scriptRel, args) {
  const scriptAbs = path.join(__dirname, scriptRel);
  const r = spawnSync(nodeCmd(), [scriptAbs, ...(args || [])], { stdio: "inherit" });
  const code = typeof r.status === "number" ? r.status : 1;
  if (code !== 0) process.exit(code);
}

function runNpm(scriptName) {
  if (process.platform === "win32") {
    const cmd = process.env.ComSpec || "cmd.exe";
    const r = spawnSync(cmd, ["/d", "/s", "/c", `npm run ${scriptName}`], { stdio: "inherit" });
    const code = typeof r.status === "number" ? r.status : 1;
    if (code !== 0) process.exit(code);
    return;
  }
  const r = spawnSync("npm", ["run", scriptName], { stdio: "inherit" });
  const code = typeof r.status === "number" ? r.status : 1;
  if (code !== 0) process.exit(code);
}

function loadJson(fp, fallback) {
  try {
    const raw = fs.readFileSync(fp, "utf8");
    const j = JSON.parse(raw);
    return (j && typeof j === "object") ? j : fallback;
  } catch {
    return fallback;
  }
}

function writeJsonPretty(fp, obj) {
  fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function ensureEnabledCitySlug(cfg, slug) {
  const list = Array.isArray(cfg.enabledCitySlugs) ? cfg.enabledCitySlugs.slice() : [];
  const s = String(slug || "").trim().toLowerCase();
  if (!s) return list;
  if (!list.map(x => String(x || "").trim().toLowerCase()).includes(s)) list.push(s);
  return list;
}

async function main() {
  const args = parseArgs(process.argv);
  const city = cleanText(args.city || "");
  const slug = cleanText(args.slug || "").toLowerCase() || slugify(city);
  const state = cleanText(args.state || "");
  const production = String(args.production || "0") === "1";

  if (!city || !slug) {
    console.error("Uso: npm run city:publish -- --city \"Florianópolis\" --slug florianopolis [--state SC] [--production 1]");
    process.exit(2);
  }

  // 1) Generate city_content (GPT + web search)
  runNode("generate_city_content_openai.js", ["--city", city, "--slug", slug, ...(state ? ["--state", state] : [])]);

  // 2) Neighborhoods (to enrich the page / internal coverage)
  runNode("fetch_neighborhoods_openai.js", ["--city", city, "--slug", slug, ...(state ? ["--state", state] : [])]);

  // 3) Depoimentos: 3–7 por página, únicos e exclusivos por tipo (fretes/mudanças/urgente)
  const types = ["fretes", "mudancas", "urgente"];
  for (const t of types) {
    runNode("generate_testimonials_openai.js", ["--city", city, "--slug", slug, "--type", t, "--count", "12", "--replace", "1"]);
  }

  // 4) Enable city in publish_config (and optionally production mode)
  const cfgPath = path.join(__dirname, "..", "src", "_data", "publish_config.json");
  const cfg = loadJson(cfgPath, { mode: "draft", enabledCitySlugs: [], enabledTypes: ["fretes", "mudancas", "urgente"] });
  cfg.enabledCitySlugs = ensureEnabledCitySlug(cfg, slug);
  if (!Array.isArray(cfg.enabledTypes) || !cfg.enabledTypes.length) cfg.enabledTypes = ["fretes", "mudancas", "urgente"];
  if (production) cfg.mode = "production";
  writeJsonPretty(cfgPath, cfg);

  // 5) Build + validate + deploy root files
  runNpm("deploy:prepare");
}

main().catch((err) => {
  console.error("[city:publish] ERRO:", (err && err.message) ? err.message : err);
  process.exit(1);
});

