"use strict";

function hash32(s) {
  // djb2
  let h = 5381;
  const str = String(s || "");
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
    h |= 0;
  }
  return h >>> 0;
}

function pick(list, seed, idx = 0) {
  const arr = Array.isArray(list) ? list : [];
  if (!arr.length) return "";
  const h = hash32(`${seed}::${idx}`);
  return arr[h % arr.length];
}

function sentence(seed, idx, options) {
  return pick(options, seed, idx);
}

module.exports = {
  hash32,
  pick,
  sentence
};

