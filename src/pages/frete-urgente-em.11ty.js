"use strict";

const variants = require("../_data/variants");
const testimonials = require("../_data/testimonials");

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function whatsLink() { return "/#contato"; }

function renderTestimonialsSection(city, publishMode) {
  const list = testimonials.pickFor({ citySlug: city.slug, type: "urgente", limit: 3 });
  const items = list.map((t) => {
    return `<div class="tItem" data-ct-testimonial="1">
      <div class="tText">“${escapeHtml(t.text)}”</div>
      <div class="tBy">— ${escapeHtml(t.author || "Cliente")}</div>
    </div>`;
  }).join("");

  const missingNote = (publishMode === "draft" && list.length < 3)
    ? `<p class="muted">Depoimentos desta cidade ainda não foram adicionados (antes de publicar em produção, esta seção precisa ter 3 depoimentos).</p>`
    : "";

  return `
    <section class="card" style="margin-top:18px" data-ct="testimonials">
      <h2>Depoimentos</h2>
      ${missingNote}
      <div class="tGrid">${items}</div>
    </section>
  `;
}

function renderBody(city, data) {
  const seed = `urgente::${city.slug}`;
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";
  const open = variants.pick([
    "Precisa de frete urgente em {CITY}? Trabalhamos com atendimento imediato para situações que exigem rapidez.",
    "Frete urgente em {CITY} com foco em agilidade e resposta rápida — consulte disponibilidade agora.",
    "Atendimento para frete urgente em {CITY}: priorização logística e comunicação direta no WhatsApp."
  ], seed, 1).replaceAll("{CITY}", city.name);

  const terms = ["agora", "hoje", "imediato", "24 horas", "prioridade"];
  const t2 = variants.pick(terms, seed, 2);
  const t3 = variants.pick(terms, seed, 3);

  const demands = [
    "Frete residencial urgente",
    "Frete comercial urgente",
    "Transporte rápido de itens e volumes",
    "Atendimento imediato quando possível"
  ];

  return `
    <div class="wrap">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Alta conversão • Urgência • ${escapeHtml(city.name)}</div>
            <h1>Frete Urgente em ${escapeHtml(city.name)}</h1>
            <p>${escapeHtml(open)}</p>
            <p class="muted"><b>Termos de urgência:</b> ${escapeHtml(t2)}, ${escapeHtml(t3)}, atendimento rápido.</p>
            <div class="ctaRow">
              <a class="btn primary" href="${whatsLink()}">Chamar no WhatsApp agora</a>
              <a class="btn secondary" href="/fretes-em-${encodeURIComponent(city.slug)}/">Ver fretes</a>
            </div>
          </div>
          <div class="card" style="padding:14px">
            <h2 style="margin-top:0">Demandas urgentes</h2>
            <ul class="list">
              ${demands.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
            <h2>Cobertura</h2>
            <p class="muted">Atendemos fretes urgentes em todos os bairros de ${escapeHtml(city.name)}, com prioridade conforme logística e localização.</p>
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

      ${renderTestimonialsSection(city, publishMode)}
    </div>
  `;
}

module.exports = class {
  data() {
    return {
      layout: "base.njk",
      pagination: { data: "publishedCities", size: 1, alias: "city" },
      permalink: (data) => `/frete-urgente-em-${data.city.slug}/`,
      eleventyComputed: {
        seo: (data) => {
          const city = data.city;
          const title = `Frete Urgente em ${city.name} | Hoje, Agora e Atendimento Imediato`;
          const description = `Frete urgente em ${city.name} com atendimento imediato e resposta rápida. Consulte disponibilidade para hoje e agora.`;
          const canonical = `${String(data.site.siteUrl || "").replace(/\/+$/, "")}/frete-urgente-em-${city.slug}/`;
          return { title, description, canonical, ogImage: data.site.defaultOgImage };
        }
      }
    };
  }

  render(data) {
    return renderBody(data.city, data);
  }
};

