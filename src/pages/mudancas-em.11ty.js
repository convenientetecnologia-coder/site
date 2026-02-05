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
  const limit = 3 + (variants.hash32(`t::mudancas::${city.slug}`) % 5); // 3..7 (determinístico)
  const list = testimonials.pickFor({ citySlug: city.slug, type: "mudancas", limit });
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
  const seed = `mudancas::${city.slug}`;
  const publishMode = (data && data.publish && data.publish.mode) ? String(data.publish.mode) : "draft";
  const nbh = neighborhoods.listForCityType(city.slug, "mudancas");
  const nbhPick = nbh.length ? nbh.slice(0, 10) : [];
  const nbhMore = nbh.length ? nbh.slice(10, 20) : [];
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

  const intro2 = variants.pick([
    "Uma mudança bem feita começa antes do caminhão encostar. Por isso, confirmamos acesso, volumes e janela de horário para reduzir retrabalho, atrasos e surpresas na hora da carga.",
    "O segredo de uma mudança tranquila é alinhar detalhes: quantos volumes, itens frágeis, acesso (elevador/escadas) e restrições do local. Com isso, a execução fica organizada e rápida.",
    "Mudança não é só transporte: é proteção, organização e cumprimento do combinado. Quando as informações estão claras, a operação flui e você evita stress desnecessário."
  ], seed, 3);

  const checklist = [
    "Planejamento de horário e rota",
    "Proteção de móveis e itens frágeis",
    "Carga e descarga com cuidado",
    "Organização para reduzir tempo de execução",
    "Alinhamento de acesso (elevador/escadas) quando necessário"
  ];

  const how = [
    "Você envia origem, destino (bairro) e a janela de horário preferida.",
    "Lista resumida de itens/volumes (móveis, caixas, eletros) e se há itens frágeis.",
    "Informações de acesso: casa, condomínio, prédio com elevador/escadas e regras de portaria.",
    "Confirmamos disponibilidade e o melhor encaixe logístico conforme rota do dia.",
    "Proteção e organização de carga conforme os itens (priorizando o que é mais sensível).",
    "Execução com comunicação clara até finalizar no destino.",
    "Fechamento: conferência final e orientação rápida do que ficou pendente (se houver)."
  ];

  const price = [
    "Distância e rota (origem → destino)",
    "Quantidade de volumes e tamanho dos móveis",
    "Tipo de acesso (escadas, elevador, vaga, distância até a porta)",
    "Itens frágeis e necessidade de proteção extra",
    "Janelas de horário e restrições de portaria/condomínio",
    "Necessidade de desmontagem/montagem (quando combinado)",
    "Urgência (encaixe no dia / hoje) conforme disponibilidade",
    "Tempo estimado de carga/descarga",
    "Trechos de difícil acesso (rampa, corredor estreito, lances longos)",
    "Quantidade de paradas (se houver)"
  ];

  const careP = variants.pick([
    "Para reduzir risco de avaria, organizamos a carga por prioridade: itens frágeis e cantos sensíveis vão protegidos e posicionados de forma segura. Caixas pesadas ficam na base; itens leves, por cima.",
    "Se houver eletros ou itens com vidro, é importante avisar antes. A proteção adequada e a ordem de carregamento fazem diferença para chegar tudo inteiro e sem arranhões.",
    "Mudança em prédio exige alinhamento de elevador/escadas e horários de portaria. Com essas informações antecipadas, a execução fica mais rápida e evita tempo parado."
  ], seed, 4);

  const deepPool = [
    "Em {CITY}, a diferença entre uma mudança tranquila e uma mudança estressante costuma estar no planejamento. Quando você informa volume e acesso com clareza, dá para ajustar rota e tempo de execução. Isso evita atrasos por falta de elevador, restrição de portaria ou corredor estreito, e reduz o risco de dano porque a equipe consegue organizar a carga com calma.",
    "Mudanças em {CITY} frequentemente envolvem condomínios com regras. Confirmar janela de carga/descarga e disponibilidade de elevador faz parte do básico. Se você tiver itens grandes, vale conferir medidas de portas e corredores. Esse cuidado simples evita improvisos no meio da operação e deixa a execução mais rápida e segura.",
    "Se a mudança tem itens frágeis (vidro, eletrônicos) ou itens com cantos sensíveis, avise antes. A organização de carga é feita por prioridade: proteção, posicionamento e fixação. Quando isso está combinado, você reduz a chance de arranhões e evita aquela sensação de “correria” no final.",
    "Para preparar a mudança, pense em categorias: caixas leves, caixas pesadas, itens frágeis e itens grandes. Separar por cômodo e identificar as caixas principais ajuda muito no destino. Em {CITY}, esse detalhe é o que faz a descarga ficar organizada e evita perda de tempo procurando o que vai para cada ambiente.",
    "Se houver escadas, informe quantos lances e se existe corrimão/apoio. Isso muda o tempo de execução e o planejamento de proteção. Para prédio com elevador, informe se é elevador social ou de serviço e se há reserva. Quanto mais objetivo, mais previsível e rápido o atendimento.",
    "Quando a mudança envolve duas paradas, alinhar a sequência antes evita confusão. Uma lista curta do que vai em cada local resolve isso. É simples, mas faz diferença no resultado.",
    "Em mudanças, o que mais causa atraso é falta de acesso: elevador ocupado, portaria com regra rígida, vaga distante, corredor estreito. Informar isso antes muda o planejamento e evita tempo parado.",
    "Uma mudança segura depende de proteção e organização de carga. Caixas pesadas vão na base; itens frágeis protegidos e posicionados de forma estável. Esse padrão reduz risco de dano e acelera a descarga no destino.",
    "Se você está com prazo apertado em {CITY}, o ideal é escolher uma janela realista e estar pronto no horário combinado. Urgência é encaixe; quanto mais claro você for, mais rápido dá para confirmar disponibilidade.",
    "Separar uma “caixa do primeiro dia” ajuda muito: itens essenciais, carregadores, documentos e o que você não quer procurar depois. Avise para não ir no fundo da carga.",
    "Para mudanças com crianças ou pets, planeje para não cruzar com a área de carga/descarga. Isso melhora segurança e reduz interrupções durante a execução.",
    "Se houver móveis que precisam desmontar, avise antes. Mesmo uma desmontagem simples exige tempo e muda a estimativa. Com isso combinado, o dia flui sem improviso.",
    "Mudança comercial pede comunicação e pontualidade. Informe horários de recebimento, restrições do local e prioridade de itens. Isso evita travar operação e mantém a entrega organizada.",
    "Em {CITY}, o trânsito e a logística variam. Em vez de promessa rígida, uma janela bem combinada permite execução mais segura e com menos stress."
  ];

  const deep = Array.from({ length: 18 }, (_, i) => variants.pick(deepPool, seed, 20 + i))
    .map(p => String(p || "").replaceAll("{CITY}", city.name));

  const packing = [
    "Use caixas menores para itens pesados (livros, ferramentas).",
    "Identifique caixas por cômodo e destaque as mais importantes.",
    "Separe itens frágeis e avise antes para definir proteção e posição na carga.",
    "Deixe o caminho livre (corredores/portas) para agilizar carga e descarga.",
    "Confirme regras de condomínio/portaria e janela de carga/descarga.",
    "Se houver elevador, informe se é social/serviço e se precisa de reserva.",
    "Guarde parafusos/peças pequenas em um saquinho identificado (se houver desmontagem).",
    "Deixe uma “caixa do primeiro dia” separada (carregador, itens essenciais).",
    "Se tiver pets/crianças, organize para não cruzar com a área de carga.",
    "Combine ponto de encontro e melhor local de parada (sem dados pessoais)."
  ];

  const scenarios = [
    "Mudança de apartamento: confirmar elevador, horário de carga/descarga e regras do condomínio.",
    "Mudança com escadas: informar quantos lances e se há pontos de apoio para proteção.",
    "Mudança pequena (poucos móveis e caixas): foco em rapidez e organização.",
    "Mudança com itens volumosos (sofá, geladeira, máquina): checar medidas e rota de passagem.",
    "Mudança em dia de chuva: reforçar proteção e planejamento de entrada/saída.",
    "Mudança comercial: priorizar pontualidade para não travar operação da empresa.",
    "Mudança com prazo apertado: avaliar encaixe e janela de horário realista.",
    "Mudança com duas paradas: alinhar sequência e o que vai em cada destino."
  ];

  const faq = [
    { q: `Quanto custa uma mudança em ${city.name}?`, a: "O valor depende de distância, volume, acesso (escadas/elevador), itens frágeis e janela de horário. Pelo WhatsApp, com essas informações básicas, dá pra estimar rápido." },
    { q: "Vocês fazem mudança pequena?", a: "Sim. Mudanças pequenas e parciais são comuns. O ideal é enviar uma lista resumida do que vai para alinhar o melhor encaixe logístico." },
    { q: "Precisa desmontar móveis?", a: "Quando combinado, podemos orientar o que precisa ser desmontado e o que vai inteiro. Informe antes para alinhar tempo e segurança." },
    { q: "Como evitar danos?", a: "O principal é proteção + organização de carga. Avise sobre itens frágeis (vidro, eletrônicos, cantos sensíveis) para definirmos a melhor forma de acomodar." },
    { q: "Atendem condomínio e prédio?", a: "Sim. Para não atrasar, informe regras de portaria, janela de carga/descarga e se há elevador disponível." },
    { q: "Dá pra fazer hoje?", a: "Depende do encaixe na rota e da disponibilidade. Para urgência, envie bairro, janela de horário e volumes; confirmamos rapidamente." }
  ];

  return `
    <div class="wrap">
      <section class="card">
        <div class="grid">
          <div>
            <div class="kicker">Página pilar • Mudanças em ${escapeHtml(city.name)}</div>
            <h1>Mudanças em ${escapeHtml(city.name)}</h1>
            <p>${escapeHtml(open)}</p>
            <p>${escapeHtml(intro2)}</p>
            <p><b>Urgência:</b> ${escapeHtml(urg)}</p>
            <div class="ctaRow">
              <a class="btn primary" data-ct-wa="1" data-wa-kind="mudancas" href="${whatsLink({ data, city, kind: "mudancas" })}">Chamar no WhatsApp</a>
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

      <section class="card" style="margin-top:18px" id="como-funciona">
        <h2>Como funciona a mudança em ${escapeHtml(city.name)}</h2>
        <p class="muted">Fluxo simples: alinhar detalhes antes reduz atraso e melhora o resultado no dia.</p>
        <ol class="list">
          ${how.map(x => `<li>${escapeHtml(x.replaceAll("{CITY}", city.name))}</li>`).join("")}
        </ol>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="mudancas" href="${whatsLink({ data, city, kind: "mudancas" })}">Pedir orçamento no WhatsApp</a>
        </div>
      </section>

      <section class="card" style="margin-top:18px" id="preco">
        <h2>O que influencia o preço da mudança</h2>
        <p class="muted">Para estimar com precisão, precisamos entender volume e acesso. Os fatores abaixo costumam pesar mais no valor final.</p>
        <ul class="list">
          ${price.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
        <p class="muted">Dica: se puder, envie uma lista curta de itens (ex.: “cama, guarda-roupa, geladeira, 15 caixas”) e o tipo de acesso. Isso acelera o orçamento.</p>
      </section>

      <section class="card" style="margin-top:18px" id="cuidados">
        <h2>Cuidados, proteção e itens frágeis</h2>
        <p>${escapeHtml(careP)}</p>
        <p class="muted">Se você tiver itens muito sensíveis (vidro, eletrônicos, instrumentos), avise antes para definirmos proteção, posicionamento e prioridade de carregamento.</p>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Guia completo da mudança (para evitar imprevistos)</h2>
        ${deep.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
        <p class="muted">Se quiser agilizar ainda mais, envie também: acesso (escadas/elevador), lista curta de itens e janela de horário — isso reduz idas e voltas e ajuda a confirmar encaixe.</p>
        <h3 style="margin-top:10px">Checklist rápido de preparação</h3>
        <ul class="list">
          ${packing.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Casos comuns em mudanças</h2>
        <p class="muted">Exemplos que ajudam a alinhar expectativas e evitar imprevistos por falta de informação.</p>
        <ul class="list">
          ${scenarios.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
        </ul>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Perguntas frequentes (FAQ)</h2>
        <div class="muted">Respostas diretas para dúvidas comuns antes de fechar a mudança.</div>
        <div style="margin-top:12px; display:grid; gap:10px">
          ${faq.map(f => `
            <div class="card" style="padding:14px">
              <div style="font-weight:900">${escapeHtml(f.q)}</div>
              <div class="muted" style="margin-top:6px">${escapeHtml(f.a)}</div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="card" style="margin-top:18px">
        <h2>Bairros atendidos em ${escapeHtml(city.name)}</h2>
        <p class="muted">Atendemos toda a cidade. Alguns bairros/regiões frequentemente atendidos:</p>
        ${nbhPick.length ? `<p><b>${escapeHtml(nbhPick.join(", "))}</b></p>` : ""}
        ${nbhMore.length ? `<p class="muted">${escapeHtml(nbhMore.join(", "))}</p>` : ""}
        <p class="muted">Para logística e encaixe, confirme origem/destino e tipo de acesso (casa/condomínio/prédio) no WhatsApp.</p>
        <div class="ctaRow">
          <a class="btn primary" data-ct-wa="1" data-wa-kind="mudancas" href="${whatsLink({ data, city, kind: "mudancas" })}">Pedir orçamento no WhatsApp</a>
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
        if (!types.includes("mudancas")) return false;
        return `/mudancas-em-${data.city.slug}/`;
      },
      eleventyComputed: {
        pageMeta: (data) => ({ type: "mudancas", citySlug: data.city.slug }),
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
    return renderBody(data.city, data);
  }
};

