"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

function rm(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true, maxRetries: 5, retryDelay: 80 });
  } catch {}
}

rm(DIST);
console.log(`[clean] removed dist: ${DIST}`);

