"use strict";

const variants = require("../_data/variants");
const testimonials = require("../_data/testimonials");

function wordsCount(s) {
  const t = String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!t) return 0;
  return t.split(" ").filter(Boolean).length;
}

function paragraph(seed, idx) {
  const a = variants.pick([
    "Realizamos fretes em {CITY} para residências e empresas, com atendimento ágil e operação segura conforme a demanda.",
    "Atendemos fretes em {CITY} com agilidade, cuidado e profissionalismo — do transporte leve ao serviço completo.",
    "Fretes em {CITY} com atendimento rápido e execução organizada: foco em segurança, pontualidade e comunicação clara."
  ], seed, idx);
  return a;
}

function urgentLine(seed, idx) {
  return variants.pick([
    "Para situações urgentes, oferecemos atendimento para hoje e agora conforme disponibilidade operacional.",
    "Se você precisa de frete pra agora, trabalhamos com encaixes rápidos quando a logística permite.",
    "Quando é urgente, priorizamos atendimento imediato e alinhamento rápido por WhatsApp."
  ], seed, idx);
}

function renderTestimonialsSection(city, publishMode) {
  const list = testimonials.pickFor({ citySlug: city.slug, type: "fretes", limit: 3 });
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
  const seed = `fretes::${city.slug}`;
  const p1 = paragraph(seed, 1).replaceAll("{CITY}", city.name);
  const p2 = paragraph(seed, 2).replaceAll("{CITY}", city.name);
  const urg = urgentLine(seed, 3);
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";

  const types = [
    "Frete pequeno (itens leves e poucos volumes)",
    "Frete médio (mudança parcial e volumes moderados)",
    "Frete grande (transporte mais completo e planejado)",
    "Frete local (dentro da cidade e bairros)",
    "Frete interestadual (quando aplicável)"
  ];

  const services = [
    "Carretos (quando o volume é menor)",
    "Mudanças (como serviço complementar)",
    "Montagem/Desmontagem (quando combinado)",
    "Embalagem e proteção (quando necessário)"
  ];

  const html = `
    <div class="wrap">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Página pilar • Fretes em ${escapeHtml(city.name)}</div>
            <h1>Fretes em ${escapeHtml(city.name)}</h1>
            <p>${escapeHtml(p1)}</p>
            <p>${escapeHtml(p2)}</p>
            <p><b>Urgência:</b> ${escapeHtml(urg)}</p>
            <div class="ctaRow">
              <a class="btn primary" href="${whatsLink()}">Chamar no WhatsApp</a>
              <a class="btn secondary" href="/frete-urgente-em-${encodeURIComponent(city.slug)}/">Ver frete urgente</a>
            </div>
          </div>
          <div class="card" style="padding:14px">
            <h2 style="margin-top:0">Tipos de frete</h2>
            <ul class="list">
              ${types.map(t => `<li>${escapeHtml(t.replaceAll("{CITY}", city.name))}</li>`).join("")}
            </ul>
            <h2>Serviços complementares</h2>
            <ul class="list">
              ${services.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
            </ul>
            <div class="muted" style="margin-top:10px">Observação: esta página é focada em <b>frete</b>. Mudanças aparecem como suporte.</div>
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
        <p class="muted">Atendemos todos os bairros de ${escapeHtml(city.name)}. Confirme sua localização no WhatsApp para priorização logística.</p>
        <div class="ctaRow">
          <a class="btn primary" href="${whatsLink()}">Pedir orçamento rápido</a>
          <a class="btn secondary" href="/mudancas-em-${encodeURIComponent(city.slug)}/">Ver mudanças</a>
        </div>
      </section>

      ${renderTestimonialsSection(city, publishMode)}
    </div>
  `;
  return html;
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function whatsLink() {
  // placeholder: configurar em src/_data/site.json
  // sem número, aponta para a home por enquanto (evita link quebrado em publish acidental)
  return "/#contato";
}

module.exports = class {
  data() {
    return {
      layout: "base.njk",
      pagination: { data: "publishedCities", size: 1, alias: "city" },
      permalink: (data) => `/fretes-em-${data.city.slug}/`,
      eleventyComputed: {
        seo: (data) => {
          const city = data.city;
          const title = `Fretes em ${city.name} | Atendimento Rápido e Profissional`;
          const description = `Fretes em ${city.name} com atendimento rápido, seguro e profissional. Atendemos bairros e regiões com agilidade conforme disponibilidade.`;
          const canonical = `${String(data.site.siteUrl || "").replace(/\/+$/, "")}/fretes-em-${city.slug}/`;
          return { title, description, canonical, ogImage: data.site.defaultOgImage };
        }
      }
    };
  }

  render(data) {
    const body = renderBody(data.city, data);
    const wc = wordsCount(body);
    return `<!-- words=${wc} -->\n` + body;
  }
};

