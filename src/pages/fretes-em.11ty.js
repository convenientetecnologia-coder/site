"use strict";

const variants = require("../_data/variants");
const testimonials = require("../_data/testimonials");
const neighborhoods = require("../_data/neighborhoods");
const cityContent = require("../_data/city_content");

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

function paragraphXL(seed, idx) {
  const a = variants.pick([
    "Fretes em {CITY} variam muito de acordo com acesso e volume. Para evitar “vai e volta” de mensagens, o ideal é enviar logo de início: bairro de origem e destino, janela de horário, lista curta de itens e se existe escada/elevador. Com essas informações, conseguimos indicar disponibilidade e orientar o melhor encaixe logístico, reduzindo espera e aumentando a chance de atendimento no mesmo dia.",
    "Quando o frete envolve itens frágeis ou volumosos, vale combinar antes como será a proteção e a ordem de carregamento. Vidro, eletrônicos e cantos sensíveis precisam de atenção extra; caixas pesadas devem ir na base; itens leves por cima. Esse cuidado simples diminui risco de avaria e evita que o transporte vire correria. Em {CITY}, é comum haver restrições de condomínio, então confirmar portaria e horário ajuda muito.",
    "Um frete profissional não é só chegar rápido: é chegar com clareza, executar com organização e manter comunicação até a finalização. A maior parte dos atrasos vem de detalhes não informados: número de lances de escada, ausência de elevador, corredor estreito, distância até a porta, ou regras de carga/descarga. Se você sinaliza isso antes, a logística se ajusta e o serviço fica mais previsível em {CITY}.",
    "Para quem precisa de frete com urgência em {CITY}, o ponto central é a janela de horário. “Agora” pode ser possível quando a rota tem encaixe; em outros casos, a melhor saída é escolher um horário ainda hoje que respeite a operação do dia. A comunicação objetiva faz diferença: diga a janela realista e o que será transportado. Assim, a confirmação de disponibilidade é mais rápida, sem promessas irreais.",
    "Se o seu frete envolve mudança parcial, pense em três blocos: itens grandes (móveis/eletros), caixas e itens sensíveis. O transporte fica melhor quando você separa o que é prioridade e deixa o acesso liberado para carregar. Em {CITY}, isso evita tempo parado e reduz custo por execução. Também ajuda informar se há necessidade de desmontar algo, mesmo que seja só uma etapa rápida combinada antes.",
    "Um bom orçamento de frete é aquele que considera o que realmente influencia tempo e risco: rota, volume, acesso e restrições do local. Por isso, pedimos informações objetivas e sem dados pessoais: bairro, tipo de acesso e lista curta de itens. Com isso, o atendimento fica mais eficiente e você sabe o que esperar do começo ao fim. Em {CITY}, esse alinhamento é o que mais reduz imprevistos."
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
    ? `<p class="muted">Depoimentos desta cidade ainda não foram adicionados. Execute city:publish para gerar.</p>`
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
  const p5 = paragraphXL(seed, 5).replaceAll("{CITY}", city.name);
  const p6 = paragraphXL(seed, 6).replaceAll("{CITY}", city.name);
  const p7 = paragraphXL(seed, 7).replaceAll("{CITY}", city.name);
  const p8 = paragraphXL(seed, 8).replaceAll("{CITY}", city.name);
  const p9 = paragraphXL(seed, 9).replaceAll("{CITY}", city.name);
  const p10 = paragraphXL(seed, 10).replaceAll("{CITY}", city.name);
  const p11 = paragraphXL(seed, 11).replaceAll("{CITY}", city.name);
  const p12 = paragraphXL(seed, 12).replaceAll("{CITY}", city.name);
  const p13 = paragraphXL(seed, 13).replaceAll("{CITY}", city.name);
  const p14 = paragraphXL(seed, 14).replaceAll("{CITY}", city.name);
  const p15 = paragraphXL(seed, 15).replaceAll("{CITY}", city.name);
  const p16 = paragraphXL(seed, 16).replaceAll("{CITY}", city.name);
  const urg = urgentLine(seed, 3);
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";
  const enabledTypes = (data && data.publish && Array.isArray(data.publish.enabledTypes)) ? data.publish.enabledTypes : [];
  const hasMudancas = enabledTypes.includes("mudancas");
  const hasUrgente = enabledTypes.includes("urgente");

  const cc = cityContent.getType(city.slug, "fretes");
  const contentSource = cc ? "city_content" : "template";
  
  // REGRA: se o conteúdo GPT tem sectionTitles, assume que é versão nova e valida tudo
  const isEnabled = (data && data.publish && Array.isArray(data.publish.enabledCitySlugs) && data.publish.enabledCitySlugs.includes(city.slug));
  const isNewFormat = (cc && cc.sectionTitles && typeof cc.sectionTitles === "object");
  
  if (publishMode === "production" && isEnabled && isNewFormat) {
    const missing = [];
    if (!cc) missing.push("city_content");
    else {
      if (!Array.isArray(cc.introParagraphs) || cc.introParagraphs.length < 1) missing.push("introParagraphs");
      if (!Array.isArray(cc.guideParagraphs) || cc.guideParagraphs.length < 10) missing.push("guideParagraphs");
      if (!Array.isArray(cc.howSteps) || cc.howSteps.length < 5) missing.push("howSteps");
      if (!Array.isArray(cc.priceFactors) || cc.priceFactors.length < 5) missing.push("priceFactors");
      if (!Array.isArray(cc.prepChecklist) || cc.prepChecklist.length < 5) missing.push("prepChecklist");
      if (!Array.isArray(cc.scenarios) || cc.scenarios.length < 5) missing.push("scenarios");
      if (!Array.isArray(cc.faq) || cc.faq.length < 8) missing.push("faq");
      if (!Array.isArray(cc.types) || cc.types.length < 5) missing.push("types");
      if (!Array.isArray(cc.services) || cc.services.length < 4) missing.push("services");
      if (!cc.sectionTitles || typeof cc.sectionTitles !== "object") missing.push("sectionTitles");
      if (!cc.sectionDescriptions || typeof cc.sectionDescriptions !== "object") missing.push("sectionDescriptions");
    }
    if (missing.length) {
      throw new Error(`[gpt-only] fretes: conteúdo GPT obrigatório ausente/incompleto para ${city.slug}: ${missing.join(", ")}`);
    }
  }
  const introParas = (cc && Array.isArray(cc.introParagraphs) && cc.introParagraphs.length)
    ? cc.introParagraphs
    : [p1, p2, p3, p4];
  const guideParas = (cc && Array.isArray(cc.guideParagraphs) && cc.guideParagraphs.length)
    ? cc.guideParagraphs
    : [p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16];

  const nbh = neighborhoods.listForCityType(city.slug, "fretes");
  const nbhPick = nbh.length ? nbh.slice(0, 10) : [];
  const nbhMore = nbh.length ? nbh.slice(10, 20) : [];

  // REGRA ULTRA ENTERPRISE: em production, TODO conteúdo deve vir do GPT (sem fallback)
  // Templates hardcoded removidos para garantir 100% de unicidade
  if (publishMode === "production" && isEnabled && isNewFormat && !cc) {
    throw new Error(`[gpt-only] fretes: city_content obrigatório ausente para ${city.slug} em production`);
  }

  const howSteps = (cc && Array.isArray(cc.howSteps) && cc.howSteps.length) ? cc.howSteps : (publishMode === "production" ? [] : []);
  const scenariosList = (cc && Array.isArray(cc.scenarios) && cc.scenarios.length) ? cc.scenarios : (publishMode === "production" ? [] : []);
  const prepList = (cc && Array.isArray(cc.prepChecklist) && cc.prepChecklist.length) ? cc.prepChecklist : (publishMode === "production" ? [] : []);
  const faqList = (cc && Array.isArray(cc.faq) && cc.faq.length) ? cc.faq : (publishMode === "production" ? [] : []);

  // Seções específicas do fretes (obrigatórias em production)
  const types = (cc && Array.isArray(cc.types) && cc.types.length) ? cc.types : (publishMode === "production" ? [] : []);
  const services = (cc && Array.isArray(cc.services) && cc.services.length) ? cc.services : (publishMode === "production" ? [] : []);

  // Títulos e descrições de seção (obrigatórios em production)
  const st = (cc && cc.sectionTitles && typeof cc.sectionTitles === "object") ? cc.sectionTitles : {};
  const sd = (cc && cc.sectionDescriptions && typeof cc.sectionDescriptions === "object") ? cc.sectionDescriptions : {};

  // Validação: em production E cidade habilitada E formato novo, todas as seções devem existir
  if (publishMode === "production" && isEnabled && isNewFormat) {
    if (!types.length) throw new Error(`[gpt-only] fretes: types obrigatório ausente para ${city.slug}`);
    if (!services.length) throw new Error(`[gpt-only] fretes: services obrigatório ausente para ${city.slug}`);
  }

  const html = `
    <div class="wrap" data-content-source="${contentSource}">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Página pilar • Fretes em ${escapeHtml(city.name)}</div>
            <h1>Fretes em ${escapeHtml(city.name)}</h1>
            <div class="ctaRow" style="margin-top:10px">
              <a class="btn primary" data-ct-wa="1" data-wa-kind="fretes" href="${whatsLink({ data, city, kind: "fretes" })}">Chamar no WhatsApp</a>
              <a class="btn secondary" href="#como-funciona">Como funciona</a>
            </div>
            <p><b>Urgência:</b> ${escapeHtml(urg)}</p>
            ${hasUrgente ? `<div class="ctaRow"><a class="btn secondary" href="/frete-urgente-em-${encodeURIComponent(city.slug)}/">Ver frete urgente</a></div>` : ""}
            ${introParas.map(p => `<p>${escapeHtml(String(p || "").replaceAll("{CITY}", city.name))}</p>`).join("")}
          </div>
          <div class="card" style="padding:14px">
            <h2 style="margin-top:0">${escapeHtml(st.types || "Tipos de frete")}</h2>
            <ul class="list">
              ${types.map(t => `<li>${escapeHtml(t.replaceAll("{CITY}", city.name))}</li>`).join("")}
            </ul>
            <h2>${escapeHtml(st.services || "Serviços complementares")}</h2>
            <ul class="list">
              ${services.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
            </ul>
            <div class="muted" style="margin-top:10px">Observação: esta página é focada em <b>frete</b>. Mudanças aparecem como suporte.</div>
          </div>
        </div>
      </section>

      <section class="card" style="margin-top:18px" id="como-funciona">
        <h2>${escapeHtml(st.howItWorks || `Como funciona o frete em ${escapeHtml(city.name)}`)}</h2>
        <p class="muted">${escapeHtml(sd.howItWorks || "Processo simples, com confirmação de detalhes para reduzir imprevistos e garantir execução organizada.")}</p>
        <ol class="list">
          ${howSteps.map(x => `<li>${escapeHtml(String(x || "").replaceAll("{CITY}", city.name))}</li>`).join("")}
        </ol>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="fretes" href="${whatsLink({ data, city, kind: "fretes" })}">Pedir orçamento no WhatsApp</a>
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>${escapeHtml(st.completeGuide || `Guia completo do frete em ${escapeHtml(city.name)}`)}</h2>
        <p class="muted">${escapeHtml(sd.completeGuide || "Conteúdo mais detalhado para alinhar expectativa, evitar imprevistos e acelerar a confirmação de disponibilidade.")}</p>
        ${guideParas.map(p => `<p>${escapeHtml(String(p || "").replaceAll("{CITY}", city.name))}</p>`).join("")}
      </section>

      <section class="card" style="margin-top:18px">
        <h2>${escapeHtml(st.preparation || "Como se preparar para o frete")}</h2>
        <p class="muted">${escapeHtml(sd.preparation || "Pequenos ajustes antes do atendimento deixam tudo mais rápido e reduzem risco de dano.")}</p>
        <ul class="list">
          ${prepList.map(x => `<li>${escapeHtml(String(x || ""))}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>${escapeHtml(st.commonScenarios || "Casos comuns (residencial e comercial)")}</h2>
        <p class="muted">${escapeHtml(sd.commonScenarios || "Exemplos reais do dia a dia que ajudam a alinhar expectativas e evitar atraso por falta de informação.")}</p>
        <ul class="list">
          ${scenariosList.map(x => `<li>${escapeHtml(String(x || "").replaceAll("{CITY}", city.name))}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>${escapeHtml(st.neighborhoods || `Bairros atendidos em ${escapeHtml(city.name)}`)}</h2>
        <p class="muted">${escapeHtml(sd.neighborhoods || "Atendemos toda a cidade. Alguns bairros/regiões frequentemente atendidos:")}</p>
        ${nbhPick.length ? `<p><b>${escapeHtml(nbhPick.join(", "))}</b></p>` : ""}
        ${nbhMore.length ? `<p class="muted">${escapeHtml(nbhMore.join(", "))}</p>` : ""}
        <p class="muted">Confirme sua localização no WhatsApp para priorização logística e melhor encaixe.</p>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="fretes" href="${whatsLink({ data, city, kind: "fretes" })}">Pedir orçamento rápido</a>
          ${hasMudancas ? `<a class="btn secondary" href="/mudancas-em-${encodeURIComponent(city.slug)}/">Ver mudanças</a>` : ""}
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>${escapeHtml(st.faq || "Perguntas frequentes (FAQ)")}</h2>
        <div class="muted">${escapeHtml(sd.faq || "Respostas objetivas para as dúvidas mais comuns.")}</div>
        <div style="margin-top:12px; display:grid; gap:10px">
          ${faqList.map(f => `
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

