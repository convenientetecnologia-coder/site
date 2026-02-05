"use strict";

// Lista curta e humana (sem virar URL). Pode expandir por cidade conforme rollout.
const MAP = {
  florianopolis: [
    "Centro",
    "Agronômica",
    "Trindade",
    "Córrego Grande",
    "Itacorubi",
    "Santa Mônica",
    "Lagoa da Conceição",
    "Barra da Lagoa",
    "Campeche",
    "Rio Tavares",
    "Armação",
    "Pântano do Sul",
    "Ribeirão da Ilha",
    "Santo Antônio de Lisboa",
    "Ingleses",
    "Canasvieiras",
    "Jurerê",
    "Estreito",
    "Coqueiros",
    "Capoeiras"
  ]
};

function listForCity(slug) {
  const key = String(slug || "").trim().toLowerCase();
  const list = MAP[key];
  return Array.isArray(list) ? list.slice() : [];
}

module.exports = { listForCity };

