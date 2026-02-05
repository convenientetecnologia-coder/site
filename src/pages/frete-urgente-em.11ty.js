"use strict";

const variants = require("../_data/variants");
const testimonials = require("../_data/testimonials");
const neighborhoods = require("../_data/neighborhoods");
const cityContent = require("../_data/city_content");

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
  const seed = `urgente::${city.slug}`;
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";
  const nbh = neighborhoods.listForCityType(city.slug, "urgente");
  const nbhPick = nbh.length ? nbh.slice(0, 12) : [];
  const nbhMore = nbh.length ? nbh.slice(12, 24) : [];
  const cc = cityContent.getType(city.slug, "urgente");
  const contentSource = cc ? "city_content" : "template";
  if (publishMode === "production") {
    const missing = [];
    if (!cc) missing.push("city_content");
    else {
      if (!Array.isArray(cc.introParagraphs) || cc.introParagraphs.length < 1) missing.push("introParagraphs");
      if (!Array.isArray(cc.guideParagraphs) || cc.guideParagraphs.length < 10) missing.push("guideParagraphs");
      if (!Array.isArray(cc.howSteps) || cc.howSteps.length < 5) missing.push("howSteps");
      if (!Array.isArray(cc.priceFactors) || cc.priceFactors.length < 5) missing.push("priceFactors");
      if (!Array.isArray(cc.prepChecklist) || cc.prepChecklist.length < 5) missing.push("prepChecklist");
      if (!Array.isArray(cc.faq) || cc.faq.length < 8) missing.push("faq");
    }
    if (missing.length) {
      throw new Error(`[gpt-only] urgente: conteúdo GPT obrigatório ausente/incompleto para ${city.slug}: ${missing.join(", ")}`);
    }
  }
  const open = variants.pick([
    "Precisa de frete urgente em {CITY}? Trabalhamos com atendimento imediato para situações que exigem rapidez.",
    "Frete urgente em {CITY} com foco em agilidade e resposta rápida — consulte disponibilidade agora.",
    "Atendimento para frete urgente em {CITY}: priorização logística e comunicação direta no WhatsApp."
  ], seed, 1).replaceAll("{CITY}", city.name);

  const open2 = variants.pick([
    "Para ser realmente urgente, a gente precisa de poucas informações bem claras: bairro (origem/destino), o que vai transportar, e a janela de horário. Com isso, confirmamos encaixe e seguimos.",
    "Urgência é encaixe logístico. Quando a rota permite, atendemos rápido. Quando não permite, avisamos de forma direta e sugerimos o melhor horário disponível.",
    "Frete urgente dá certo quando a comunicação é objetiva. Envie o essencial e a gente retorna com disponibilidade e estimativa conforme a operação do dia."
  ], seed, 4);

  const terms = ["agora", "hoje", "imediato", "24 horas", "prioridade"];
  const t2 = variants.pick(terms, seed, 2);
  const t3 = variants.pick(terms, seed, 3);

  const demands = [
    "Frete residencial urgente",
    "Frete comercial urgente",
    "Transporte rápido de itens e volumes",
    "Atendimento imediato quando possível"
  ];

  const how = [
    "Envie origem e destino (bairro) e diga se é para “agora” ou “hoje” (qual janela de horário).",
    "Descreva o que será transportado (quantidade/itens) e se há algo frágil.",
    "Informe o tipo de acesso (casa/condomínio/prédio, elevador/escadas) e regras do local.",
    "Confirmamos encaixe conforme rota e retornamos com estimativa de chegada.",
    "Execução rápida com cuidado e comunicação até finalizar."
  ];

  const whatToSend = [
    "Bairro de origem e destino (ou ponto de referência sem dados pessoais)",
    "Janela de horário (ex.: “até 2h”, “entre 14–16h”, “hoje à noite”)",
    "Lista curta de itens/volume (ex.: “10 caixas + 1 geladeira”)",
    "Acesso: escadas/elevador, distância até a porta, restrição de portaria",
    "Se tem itens frágeis (vidro, eletrônico, cantos sensíveis)"
  ];

  const whenYes = [
    "Quando a rota do dia tem espaço para encaixe",
    "Quando origem/destino estão em regiões próximas do trajeto atual",
    "Quando o volume é compatível com o tempo disponível",
    "Quando o acesso é simples (sem muitas restrições)"
  ];

  const whenNo = [
    "Quando a operação está com agenda cheia no momento",
    "Quando há restrição pesada de horário/portaria sem flexibilidade",
    "Quando o volume exige planejamento maior do que a janela permite",
    "Quando origem/destino estão fora do raio viável para encaixe imediato"
  ];

  const pricing = [
    "Distância e rota (origem → destino)",
    "Volume/quantidade de itens",
    "Acesso (escadas/elevador/condomínio) e tempo de carga/descarga",
    "Urgência (encaixe imediato) conforme disponibilidade",
    "Itens frágeis e necessidade de proteção extra"
  ];

  const faq = [
    { q: `Quanto custa um frete urgente em ${city.name}?`, a: "Depende de distância, volume e acesso. A urgência é encaixe logístico: com bairro (origem/destino) e lista curta de itens, conseguimos estimar rapidamente." },
    { q: "Vocês atendem agora?", a: "Quando há disponibilidade e a rota permite encaixe imediato. Envie bairro, janela de horário e o que precisa transportar; confirmamos na hora." },
    { q: "Preciso informar itens frágeis?", a: "Sim. Isso muda proteção e posicionamento na carga. Avise antes para reduzir risco de avaria." },
    { q: "Atende condomínio/prédio?", a: "Sim. Informe regras de portaria, elevador e janela de carga/descarga para evitar atraso." },
    { q: "Posso agendar ainda hoje?", a: "Na maioria dos casos, sim, se houver encaixe. Quanto mais cedo enviar as informações, maior a chance de horário bom." },
    { q: "Como agilizar o atendimento?", a: "Mande bairro (origem/destino), janela de horário e lista curta de itens. Se puder, inclua acesso (escadas/elevador)." }
  ];

  const introParas = (cc && Array.isArray(cc.introParagraphs) && cc.introParagraphs.length)
    ? cc.introParagraphs
    : [open, open2];
  const howSteps = (cc && Array.isArray(cc.howSteps) && cc.howSteps.length) ? cc.howSteps : how;
  const priceFactors = (cc && Array.isArray(cc.priceFactors) && cc.priceFactors.length) ? cc.priceFactors : pricing;
  const sendChecklist = (cc && Array.isArray(cc.prepChecklist) && cc.prepChecklist.length) ? cc.prepChecklist : whatToSend;
  const faqList = (cc && Array.isArray(cc.faq) && cc.faq.length) ? cc.faq : faq;

  const deepPool = [
    "Frete urgente em {CITY} não é mágica — é logística. O que faz dar certo é a clareza: origem, destino, janela de horário e volume. Quando isso vem bem definido, a gente decide rápido se existe encaixe imediato ou se a melhor saída é um horário ainda hoje. Esse alinhamento evita promessas irreais e mantém execução rápida sem perder cuidado.",
    "A urgência normalmente quebra quando faltam detalhes de acesso. Escadas, elevador indisponível, portaria com horário restrito ou distância grande até a porta mudam muito o tempo de execução. Por isso, informar o tipo de acesso antes é essencial. Em {CITY}, condomínios e prédios são comuns e as regras variam: quanto mais cedo você informa, mais fácil ajustar o plano.",
    "Mesmo em atendimento rápido, a segurança continua. Itens frágeis (vidro, eletrônicos, cantos sensíveis) precisam de proteção e posicionamento certo para não “chacoalhar” durante o trajeto. Caixas pesadas vão na base; volumes leves por cima. Esses cuidados parecem detalhes, mas são o que diferencia um transporte organizado de um transporte apressado.",
    "Se você quer aumentar a chance de atendimento imediato em {CITY}, ajude a operação: envie uma lista curta de itens, indique a janela realista e esteja pronto para liberar acesso no momento combinado. Urgência costuma falhar quando a pessoa ainda está embalando ou quando o local não permite carga/descarga no horário. Ajustar isso antes acelera muito.",
    "Quando não dá para atender “agora”, o melhor caminho é escolher um horário viável ainda hoje. Uma janela de 2–3 horas costuma ser mais realista do que um horário cravado, porque depende do trânsito e da sequência de atendimentos. Se você tiver flexibilidade mínima, a chance de encaixe sobe bastante.",
    "Para urgências comerciais em {CITY}, a prioridade costuma ser pontualidade e comunicação. Enviar o essencial (rota, volume, janela) e definir o ponto de encontro evita perda de tempo. Se houver restrição de entrega/retirada, informe antes. O foco é resolver rápido sem criar um problema maior.",
    "O termo “urgente” cobre muita coisa: desde um item único até vários volumes. O que define o atendimento não é a palavra, e sim o cenário. Um sofá pode ser mais complexo que 10 caixas, dependendo de acesso e medidas. Se você descreve o cenário com objetividade, a confirmação vem mais rápida e o orçamento fica mais justo.",
    "Para frete urgente com chuva, escadas ou acesso difícil, a execução precisa ser ainda mais organizada. Em vez de pressa cega, o melhor é proteção e sequência correta de carga/descarga. Isso reduz risco de danos e evita retrabalho no final.",
    "Se o seu frete urgente é para hoje em {CITY}, evite mensagens longas. Envie 5 itens: origem (bairro), destino (bairro), janela, lista curta de itens e acesso. Só isso. A partir daí, a confirmação de disponibilidade e a orientação do próximo passo acontecem rápido.",
    "Se você mora em prédio, confirme se o elevador pode ser usado e em qual horário. Se mora em casa com escadas ou corredor estreito, avise antes. Isso não é burocracia: é o que define tempo de execução. Quanto melhor esse alinhamento, mais rápido e previsível fica o urgente.",
    "Em urgente, a melhor forma de reduzir custo é reduzir tempo parado. Acesso liberado, itens minimamente organizados e janela realista fazem o serviço fluir. Em {CITY}, essa combinação aumenta a chance de encaixe no mesmo dia.",
    "Para itens volumosos, o ponto crítico é rota de passagem: portas, corredores e curvas. Se houver dúvida, informe logo. Esse cuidado evita travar no meio do caminho e mantém a execução rápida com segurança.",
    "Se você tem restrição de horário (ex.: até 17h), avise logo. Em urgente, essa informação muda tudo: pode ser que dê encaixe, pode ser que a melhor janela seja um pouco depois. Com transparência, a decisão é rápida e você não perde tempo esperando retorno sem contexto.",
    "Em {CITY}, o trânsito pode mudar a rota em poucos minutos. Por isso, em vez de promessa rígida, trabalhamos com estimativa e comunicação. Quando você tem uma janela razoável, dá pra executar com menos stress e com mais chance de atender no mesmo dia.",
    "Para melhorar a experiência, deixe pronto o que depende de você: acesso liberado, itens organizados e ponto de encontro claro. Isso reduz o tempo de carga/descarga e ajuda a operação a cumprir a urgência sem sacrificar cuidado.",
    "Se o frete urgente é recorrente (empresa, loja, operação), dá para padronizar as informações: origem/destino, janela e descrição de volume. Esse padrão acelera atendimentos futuros e reduz ruído na comunicação."
  ];

  const deep = Array.from({ length: 18 }, (_, i) => variants.pick(deepPool, seed, 20 + i))
    .map(p => String(p || "").replaceAll("{CITY}", city.name));

  const guideParas = (cc && Array.isArray(cc.guideParagraphs) && cc.guideParagraphs.length) ? cc.guideParagraphs : deep;

  const common = [
    "Retirada e entrega no mesmo dia com janela de horário curta (quando há encaixe).",
    "Itens volumosos (sofá, geladeira, máquina): checar medidas e acesso antes evita travar no caminho.",
    "Condomínio com regras: confirmar portaria e elevador reduz atraso e tempo parado.",
    "Escadas: informar lances e pontos de apoio ajuda a planejar proteção e execução.",
    "Frete comercial urgente: priorizar pontualidade e comunicação para não travar operação.",
    "Mudança parcial urgente: separar itens por prioridade e deixar o caminho livre agiliza."
  ];

  return `
    <div class="wrap" data-content-source="${contentSource}">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Alta conversão • Urgência • ${escapeHtml(city.name)}</div>
            <h1>Frete Urgente em ${escapeHtml(city.name)}</h1>
            ${introParas.map(p => `<p>${escapeHtml(String(p || "").replaceAll("{CITY}", city.name))}</p>`).join("")}
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

      <section class="card" style="margin-top:18px" id="como-funciona">
        <h2>Como funciona o frete urgente em ${escapeHtml(city.name)}</h2>
        <p class="muted">Objetivo: confirmar encaixe rápido e executar com cuidado, sem prometer o impossível.</p>
        <ol class="list">
          ${howSteps.map(x => `<li>${escapeHtml(String(x || "").replaceAll("{CITY}", city.name))}</li>`).join("")}
        </ol>
      </section>

      <section class="card" style="margin-top:18px" id="o-que-enviar">
        <h2>O que enviar no WhatsApp para agilizar</h2>
        <p class="muted">Quanto mais objetivo você for, mais rápido a gente confirma disponibilidade.</p>
        <ul class="list">
          ${sendChecklist.map(x => `<li>${escapeHtml(String(x || ""))}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px" id="disponibilidade">
        <h2>Disponibilidade: quando dá (e quando pode não dar)</h2>
        <p class="muted">Urgência é logística. Abaixo, exemplos comuns de cenário.</p>
        <div class="grid" style="gap:12px">
          <div class="card" style="padding:14px">
            <div style="font-weight:900">Quando costuma dar certo</div>
            <ul class="list" style="margin-top:10px">
              ${whenYes.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
          </div>
          <div class="card" style="padding:14px">
            <div style="font-weight:900">Quando pode não dar na hora</div>
            <ul class="list" style="margin-top:10px">
              ${whenNo.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
          </div>
        </div>
        <p class="muted" style="margin-top:10px">Mesmo quando não dá “agora”, normalmente conseguimos sugerir a melhor janela ainda hoje, conforme a operação.</p>
      </section>

      <section class="card" style="margin-top:18px" id="preco">
        <h2>Preço: o que mais influencia no urgente</h2>
        <p class="muted">O valor é composto por rota, volume e tempo de execução. A urgência entra como encaixe conforme disponibilidade.</p>
        <ul class="list">
          ${priceFactors.map(x => `<li>${escapeHtml(String(x || ""))}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Guia completo do frete urgente</h2>
        ${guideParas.map(p => `<p>${escapeHtml(String(p || "").replaceAll("{CITY}", city.name))}</p>`).join("")}
        <h3 style="margin-top:10px">Cenários comuns</h3>
        <p class="muted">Exemplos reais de situações de urgência (ajuda a alinhar expectativa e acelerar a confirmação).</p>
        <ul class="list">
          ${common.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Perguntas frequentes (FAQ)</h2>
        <div class="muted">Respostas diretas para dúvidas comuns de urgência.</div>
        <div style="margin-top:12px; display:grid; gap:10px">
          ${faqList.map(f => `
            <div class="card" style="padding:14px">
              <div style="font-weight:900">${escapeHtml(f.q)}</div>
              <div class="muted" style="margin-top:6px">${escapeHtml(f.a)}</div>
            </div>
          `).join("")}
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

