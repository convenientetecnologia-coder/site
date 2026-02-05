"use strict";

const variants = require("../_data/variants");
const testimonials = require("../_data/testimonials");
const neighborhoods = require("../_data/neighborhoods");

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

function paragraphLong(seed, idx) {
  const a = variants.pick([
    "Nosso foco é simplificar: você informa origem, destino, tipo de item e janela de horário. A partir disso, alinhamos disponibilidade e o melhor encaixe logístico para executar o frete com segurança.",
    "Para evitar surpresas, confirmamos detalhes essenciais antes de iniciar: tipo de acesso (casa, condomínio, prédio com elevador ou escadas), se há itens frágeis e se existe restrição de horário no local.",
    "Um frete bem feito não é só “levar e pronto”. É proteger, organizar e cumprir o combinado, com comunicação clara do começo ao fim — principalmente quando há pressa ou restrição de horário."
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
  const limit = 3 + (variants.hash32(`t::fretes::${city.slug}`) % 5); // 3..7 (determinístico)
  const list = testimonials.pickFor({ citySlug: city.slug, type: "fretes", limit });
  const items = list.map((t) => {
    return `<div class="tItem" data-ct-testimonial="1">
      <div class="tText">“${escapeHtml(t.text)}”</div>
      <div class="tBy">— ${escapeHtml(t.author || "Cliente")}</div>
    </div>`;
  }).join("");

  const missingNote = (publishMode === "draft" && list.length < 3)
    ? `<p class="muted">Depoimentos desta cidade ainda não foram adicionados (antes de publicar em produção, esta seção precisa ter pelo menos 3).</p>`
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
  const p3 = paragraphLong(seed, 3);
  const p4 = paragraphLong(seed, 4);
  const urg = urgentLine(seed, 3);
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";
  const enabledTypes = (data && data.publish && Array.isArray(data.publish.enabledTypes)) ? data.publish.enabledTypes : [];
  const hasMudancas = enabledTypes.includes("mudancas");
  const hasUrgente = enabledTypes.includes("urgente");

  const nbh = neighborhoods.listForCityType(city.slug, "fretes");
  const nbhPick = nbh.length ? nbh.slice(0, 10) : [];
  const nbhMore = nbh.length ? nbh.slice(10, 20) : [];

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

  const how = [
    "Envie sua cidade, bairro (origem/destino) e a janela de horário desejada.",
    "Descreva o que será transportado (quantidade/itens) e se há itens frágeis.",
    "Informe o tipo de acesso (casa/condomínio/prédio com elevador/escadas) e restrições do local.",
    "Confirmamos disponibilidade e combinamos o melhor encaixe logístico.",
    "Execução com cuidado e comunicação até a finalização."
  ];

  const scenarios = [
    "Frete para apartamento com elevador: alinhamos tamanho/volume e horários de portaria.",
    "Frete com escadas: confirmamos lances, pontos de apoio e necessidade de proteção extra.",
    "Condomínio com regras: combinamos janela de horário e acesso para reduzir tempo parado.",
    "Itens volumosos (ex.: sofá, geladeira, máquina): conferimos medidas e rota de passagem.",
    "Frete comercial: priorizamos pontualidade e comunicação para não atrapalhar operação."
  ];

  const faq = [
    { q: `Quanto custa um frete em ${city.name}?`, a: "O valor depende de distância, volume, acesso (escadas/elevador), itens frágeis e janela de horário. Pelo WhatsApp conseguimos estimar rápido com base nas informações básicas." },
    { q: "Vocês atendem urgência (hoje / agora)?", a: "Sim, quando há encaixe logístico. Para urgência, envie bairro, horário e o que precisa transportar; confirmamos disponibilidade conforme a operação." },
    { q: "Atende condomínio e prédio?", a: "Sim. Para evitar atraso, informe se há elevador, quantos lances de escada e se existe regra/horário de portaria ou carga/descarga." },
    { q: "Como garantir que não vai danificar?", a: "A segurança depende de proteção e organização de carga. Itens frágeis e cantos sensíveis devem ser informados para definir proteção/posicionamento adequados." },
    { q: "Preciso informar o que antes do atendimento?", a: "Origem e destino (bairro), lista resumida de itens/volume, tipo de acesso e horário desejado. Com isso conseguimos alinhar o melhor caminho." }
  ];

  const html = `
    <div class="wrap">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Página pilar • Fretes em ${escapeHtml(city.name)}</div>
            <h1>Fretes em ${escapeHtml(city.name)}</h1>
            <div class="ctaRow" style="margin-top:10px">
              <a class="btn primary" data-ct-wa="1" data-wa-kind="fretes" href="${whatsLink({ data, city, kind: "fretes" })}">Chamar no WhatsApp</a>
              <a class="btn secondary" href="#como-funciona">Como funciona</a>
            </div>
            <p>${escapeHtml(p1)}</p>
            <p>${escapeHtml(p2)}</p>
            <p>${escapeHtml(p3)}</p>
            <p>${escapeHtml(p4)}</p>
            <p><b>Urgência:</b> ${escapeHtml(urg)}</p>
            ${hasUrgente ? `<div class="ctaRow"><a class="btn secondary" href="/frete-urgente-em-${encodeURIComponent(city.slug)}/">Ver frete urgente</a></div>` : ""}
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

      <section class="card" style="margin-top:18px" id="como-funciona">
        <h2>Como funciona o frete em ${escapeHtml(city.name)}</h2>
        <p class="muted">Processo simples, com confirmação de detalhes para reduzir imprevistos e garantir execução organizada.</p>
        <ol class="list">
          ${how.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ol>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="fretes" href="${whatsLink({ data, city, kind: "fretes" })}">Pedir orçamento no WhatsApp</a>
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Casos comuns (residencial e comercial)</h2>
        <p class="muted">Exemplos reais do dia a dia que ajudam a alinhar expectativas e evitar atraso por falta de informação.</p>
        <ul class="list">
          ${scenarios.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Bairros atendidos em ${escapeHtml(city.name)}</h2>
        <p class="muted">Atendemos toda a cidade. Alguns bairros/regiões frequentemente atendidos:</p>
        ${nbhPick.length ? `<p><b>${escapeHtml(nbhPick.join(", "))}</b></p>` : ""}
        ${nbhMore.length ? `<p class="muted">${escapeHtml(nbhMore.join(", "))}</p>` : ""}
        <p class="muted">Confirme sua localização no WhatsApp para priorização logística e melhor encaixe.</p>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="fretes" href="${whatsLink({ data, city, kind: "fretes" })}">Pedir orçamento rápido</a>
          ${hasMudancas ? `<a class="btn secondary" href="/mudancas-em-${encodeURIComponent(city.slug)}/">Ver mudanças</a>` : ""}
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Perguntas frequentes (FAQ)</h2>
        <div class="muted">Respostas objetivas para as dúvidas mais comuns.</div>
        <div style="margin-top:12px; display:grid; gap:10px">
          ${faq.map(f => `
            <div class="card" style="padding:14px">
              <div style="font-weight:900">${escapeHtml(f.q)}</div>
              <div class="muted" style="margin-top:6px">${escapeHtml(f.a)}</div>
            </div>
          `).join("")}
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

module.exports = class {
  data() {
    return {
      layout: "base.njk",
      pagination: { data: "publishedCities", size: 1, alias: "city" },
      permalink: (data) => `/fretes-em-${data.city.slug}/`,
      eleventyComputed: {
        pageMeta: (data) => ({ type: "fretes", citySlug: data.city.slug }),
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

