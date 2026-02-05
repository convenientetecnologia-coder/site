"use strict";

const variants = require("../_data/variants");

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function whatsLink() { return "/#contato"; }

function renderBody(city) {
  const seed = `mudancas::${city.slug}`;
  const open = variants.pick([
    "Realizamos mudanças em {CITY} com organização, cuidado e comunicação clara do início ao fim.",
    "Mudanças em {CITY} com atendimento rápido e execução profissional, alinhando prazos e logística por WhatsApp.",
    "Trabalhamos com mudanças em {CITY} para residências e empresas, com foco em segurança e agilidade."
  ], seed, 1).replaceAll("{CITY}", city.name);

  const urg = variants.pick([
    "Se for urgente, avaliamos encaixes para hoje conforme rota e disponibilidade.",
    "Para mudanças com urgência, priorizamos atendimento imediato quando a operação permitir.",
    "Em casos de urgência, buscamos solução rápida com alinhamento direto no WhatsApp."
  ], seed, 2);

  const checklist = [
    "Planejamento de horário e rota",
    "Proteção de móveis e itens frágeis",
    "Carga e descarga com cuidado",
    "Organização para reduzir tempo de execução",
    "Alinhamento de acesso (elevador/escadas) quando necessário"
  ];

  return `
    <div class="wrap">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Página pilar • Mudanças em ${escapeHtml(city.name)}</div>
            <h1>Mudanças em ${escapeHtml(city.name)}</h1>
            <p>${escapeHtml(open)}</p>
            <p><b>Urgência:</b> ${escapeHtml(urg)}</p>
            <div class="ctaRow">
              <a class="btn primary" href="${whatsLink()}">Chamar no WhatsApp</a>
              <a class="btn secondary" href="/fretes-em-${encodeURIComponent(city.slug)}/">Ver fretes</a>
            </div>
          </div>
          <div class="card" style="padding:14px">
            <h2 style="margin-top:0">Como trabalhamos</h2>
            <ul class="list">
              ${checklist.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
            <div class="muted" style="margin-top:10px">Observação: esta página é focada em <b>mudança</b>. Fretes aparecem como suporte.</div>
          </div>
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Imagens (exemplos)</h2>
        <p class="muted">Placeholder (vamos substituir por imagens reais por cidade quando definirmos o pacote final).</p>
        <div class="chips">
          <a class="chip" href="/assets/placeholder-bg.svg">Fundo</a>
          <a class="chip" href="/assets/placeholder-1.svg">Imagem 1</a>
          <a class="chip" href="/assets/placeholder-2.svg">Imagem 2</a>
          <a class="chip" href="/assets/placeholder-3.svg">Imagem 3</a>
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Bairros atendidos em ${escapeHtml(city.name)}</h2>
        <p class="muted">Atendemos todos os bairros de ${escapeHtml(city.name)}. Confirme detalhes (origem/destino) no WhatsApp para logística.</p>
      </section>
    </div>
  `;
}

module.exports = class {
  data() {
    return {
      layout: "base.njk",
      pagination: { data: "cities", size: 1, alias: "city" },
      permalink: (data) => `/mudancas-em-${data.city.slug}/`,
      eleventyComputed: {
        seo: (data) => {
          const city = data.city;
          const title = `Mudanças em ${city.name} | Atendimento Rápido e Profissional`;
          const description = `Mudanças em ${city.name} com atendimento rápido, seguro e profissional. Planejamento, cuidado e execução organizada.`;
          const canonical = `${String(data.site.siteUrl || "").replace(/\/+$/, "")}/mudancas-em-${city.slug}/`;
          return { title, description, canonical, ogImage: data.site.defaultOgImage };
        }
      }
    };
  }

  render(data) {
    return renderBody(data.city);
  }
};

