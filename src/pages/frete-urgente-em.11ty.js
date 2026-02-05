"use strict";

const variants = require("../_data/variants");
const testimonials = require("../_data/testimonials");
const neighborhoods = require("../_data/neighborhoods");

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function whatsText({ data, city, kind }) {
  const tplMap = (data && data.site && data.site.whatsAppTemplates) ? data.site.whatsAppTemplates : null;
  const tpl = tplMap && tplMap[kind] ? String(tplMap[kind]) : String((data && data.site && data.site.whatsAppDefaultText) || "");
  return tpl.replaceAll("{CITY}", city.name);
}

function whatsLink({ data, city, kind }) {
  const raw = String((data && data.site && data.site.whatsAppNumberE164) || "").trim();
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "/#contato";
  const text = whatsText({ data, city, kind });
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function renderTestimonialsSection(city, publishMode) {
  const limit = 3 + (variants.hash32(`t::urgente::${city.slug}`) % 5); // 3..7 (determinístico)
  const list = testimonials.pickFor({ citySlug: city.slug, type: "urgente", limit });
  const items = list.map((t) => {
    return `<div class="tItem" data-ct-testimonial="1">
      <div class="tText">“${escapeHtml(t.text)}”</div>
      <div class="tBy">— ${escapeHtml(t.author || "Cliente")}</div>
    </div>`;
  }).join("");

  const missingNote = (publishMode === "draft" && list.length < 3)
    ? `<p class="muted">Depoimentos sintéticos desta cidade ainda não foram gerados (antes de publicar em produção, esta seção precisa ter pelo menos 3).</p>`
    : "";

  return `
    <section class="card" style="margin-top:18px" data-ct="testimonials">
      <h2>Depoimentos sintéticos</h2>
      <p class="muted" style="margin-top:6px">Textos sintéticos para demonstrar o padrão de atendimento. Substituiremos por depoimentos reais conforme coleta.</p>
      ${missingNote}
      <div class="tGrid">${items}</div>
    </section>
  `;
}

function renderBody(city, data) {
  const seed = `urgente::${city.slug}`;
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";
  const nbh = neighborhoods.listForCityType(city.slug, "urgente");
  const nbhPick = nbh.length ? nbh.slice(0, 12) : [];
  const nbhMore = nbh.length ? nbh.slice(12, 24) : [];
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
              <a class="btn primary" data-ct-wa="1" data-wa-kind="urgente" href="${whatsLink({ data, city, kind: "urgente" })}">Chamar no WhatsApp agora</a>
              <a class="btn secondary" href="/fretes-em-${encodeURIComponent(city.slug)}/">Ver fretes</a>
            </div>
          </div>
          <div class="card" style="padding:14px">
            <h2 style="margin-top:0">Demandas urgentes</h2>
            <ul class="list">
              ${demands.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
            <h2>Cobertura</h2>
            <p class="muted">Atendemos fretes urgentes em toda a cidade, com prioridade conforme logística e localização.</p>
          </div>
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Bairros com cobertura rápida em ${escapeHtml(city.name)}</h2>
        <p class="muted">A urgência depende do encaixe. Alguns bairros/regiões frequentemente atendidos:</p>
        ${nbhPick.length ? `<p><b>${escapeHtml(nbhPick.join(", "))}</b></p>` : ""}
        ${nbhMore.length ? `<p class="muted">${escapeHtml(nbhMore.join(", "))}</p>` : ""}
        <p class="muted">Para priorização, envie bairro (origem/destino), janela de horário e o que precisa transportar.</p>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="urgente" href="${whatsLink({ data, city, kind: "urgente" })}">Pedir urgente no WhatsApp</a>
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
      permalink: (data) => {
        const types = (data && data.publish && Array.isArray(data.publish.enabledTypes)) ? data.publish.enabledTypes : [];
        if (!types.includes("urgente")) return false;
        return `/frete-urgente-em-${data.city.slug}/`;
      },
      eleventyComputed: {
        pageMeta: (data) => ({ type: "urgente", citySlug: data.city.slug }),
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

