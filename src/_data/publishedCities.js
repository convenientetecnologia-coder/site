"use strict";

const cities = require("./cities");
const publish = require("./publish");

function isEnabledSlug(slug) {
  const enabled = Array.isArray(publish.enabledCitySlugs) ? publish.enabledCitySlugs : [];
  if (enabled.includes("*")) return true;
  return enabled.includes(String(slug || ""));
}

module.exports = (cities || []).filter((c) => isEnabledSlug(c.slug));

