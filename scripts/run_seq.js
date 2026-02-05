"use strict";

const { spawnSync } = require("child_process");

function run(scriptName) {
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

function main() {
  const scripts = process.argv.slice(2).filter(Boolean);
  if (!scripts.length) {
    console.error("Uso: node scripts/run_seq.js build validate [deploy:root]");
    process.exit(2);
  }
  for (const s of scripts) run(s);
}

main();

