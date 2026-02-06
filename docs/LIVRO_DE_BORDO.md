### Livro de bordo — SITE (Fretes & Mudanças) — CANÔNICO

Objetivo: qualquer GPT novo consegue continuar o projeto **sem perder contexto**, lendo:

- Runbook (como operar/deploy/rollback): `docs/RUNBOOK_TECNICO.md`
- Timeline (o que mudou e por quê): `docs/TIMELINE.md`
- Inbox (intake/triagem): `docs/INBOX_RELATOS_DO_HUMANO.md` e `docs/inbox/INDEX.md`
- Padrão definitivo das páginas: `docs/PAGINAS_MODELO.md`

Regras:

- **Uma página = uma intenção principal** (SEO). Não misturar.
- **100% GPT (regra ultra enterprise)**: TODO conteúdo das páginas de cidade deve ser gerado pelo GPT via `city_content.json`. **ZERO fallback para templates hardcoded em production**. Templates servem apenas como base/modelo para o GPT, nunca como conteúdo final.
- **Anti-duplicação (regra ultra enterprise)**: TODOS os títulos de seção (`sectionTitles`), descrições (`sectionDescriptions`) e listas (demands, whenYes, whenNo, common, types, services, checklist) devem ser **100% únicos e exclusivos** entre todas as cidades. O `validate.js` detecta duplicações e **FALHA em production**.
- **Sem duplicar texto** entre cidades (anti-spam). Validação automática via SimHash + comparação de títulos/descrições.
- **Deploy** tem que ser "commit -> publish" (via Git Deploy no Hostinger).
- **Sem secrets** em docs/repo. Só nomes e onde configurar.
- **Regra de operação (ultra enterprise)**: toda melhoria/mudança relevante deve atualizar **Runbook + Timeline** automaticamente.
- **Política de mídia (padrão canônico)**: **sem imagens** nas páginas de cidade (mais rápido, limpo, sem "foto de produto" para serviço). Se um dia voltar a usar imagem, só com fotos reais e otimizadas.
- **Política de CTA WhatsApp (padrão canônico)**: **todo botão/atalho de WhatsApp deve abrir o WhatsApp com mensagem pré-preenchida** (link `wa.me` + `?text=`). Nunca depender do tracking para funcionar.
- **Regra operacional (anti-achismo)**: **só declarar "Cidade X pronta/criada" após evidência no ar (`site_manifest.json` + curl das URLs) e após registrar no Livro/Timeline** (ver Runbook).

---

## Estado atual do projeto (resumo executivo)

- **Domínio no ar (Hostinger)**: `https://www.fretesoumudancas.com.br/`
- **Home (`/`)**: autoatendimento legado (não quebrar clientes).
- **Hub SEO (`/cidades/`)**: lista cidades publicadas (rollout controlado).
- **Páginas legais**:
  - `/politica-de-privacidade.html`
  - `/termos-de-uso.html`
- **Deploy**: Git Deploy Hostinger conectado + **webhook** configurado (push → deploy automático).
- **SEO safety**:
  - `draft`: `noindex` + `robots.txt` bloqueia crawl (mas permite buscar `sitemap.xml`).
  - `production`: indexável + sitemap com páginas habilitadas.

### Cidades publicadas (production)

- **Campo Grande (MS)** — publicado em 2026-02-06
  - `/fretes-em-campo-grande/` (~2934 palavras)
  - `/mudancas-em-campo-grande/` (~2830 palavras)
  - `/frete-urgente-em-campo-grande/` (~3441 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 39 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `1a57d09`

- **Campinas (SP)** — publicado em 2026-02-06
  - `/fretes-em-campinas/` (~2906 palavras)
  - `/mudancas-em-campinas/` (~2933 palavras)
  - `/frete-urgente-em-campinas/` (~3308 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 35 depoimentos (11/12/12 por tipo)
  - Commit: `e5bdc70`

- **Campina Grande (PB)** — publicado em 2026-02-06
  - `/fretes-em-campina-grande/` (~3036 palavras)
  - `/mudancas-em-campina-grande/` (~2848 palavras)
  - `/frete-urgente-em-campina-grande/` (~3341 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 36 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `c3e7144`

- **Brasília (DF)** — publicado em 2026-02-06
  - `/fretes-em-brasilia/` (~2756 palavras)
  - `/mudancas-em-brasilia/` (~2740 palavras)
  - `/frete-urgente-em-brasilia/` (~3249 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 34 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `05feb85`

- **Boa Vista (RR)** — publicado em 2026-02-06
  - `/fretes-em-boa-vista/` (~3117 palavras)
  - `/mudancas-em-boa-vista/` (~3090 palavras)
  - `/frete-urgente-em-boa-vista/` (~3123 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 31 bairros divididos em 3 blocos únicos
  - 35 depoimentos (12/12/11 por tipo)
  - Commit: `96819b0`

- **Blumenau (SC)** — publicado em 2026-02-06
  - `/fretes-em-blumenau/` (~2903 palavras)
  - `/mudancas-em-blumenau/` (~2985 palavras)
  - `/frete-urgente-em-blumenau/` (~3290 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 33 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `b80cfea`

- **Belo Horizonte (MG)** — publicado em 2026-02-06
  - `/fretes-em-belo-horizonte/` (~2963 palavras)
  - `/mudancas-em-belo-horizonte/` (~3197 palavras)
  - `/frete-urgente-em-belo-horizonte/` (~3150 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 35 depoimentos (11/12/12 por tipo)
  - Commit: `e840571`

- **Belém (PA)** — publicado em 2026-02-06
  - `/fretes-em-belem/` (~3159 palavras)
  - `/mudancas-em-belem/` (~2961 palavras)
  - `/frete-urgente-em-belem/` (~3347 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 33 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `243dbb5`

- **Bauru (SP)** — publicado em 2026-02-06
  - `/fretes-em-bauru/` (~2809 palavras)
  - `/mudancas-em-bauru/` (~2745 palavras)
  - `/frete-urgente-em-bauru/` (~3235 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 34 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `d6e6faa`

- **Anápolis (GO)** — publicado em 2026-02-06
  - `/fretes-em-anapolis/` (~2829 palavras)
  - `/mudancas-em-anapolis/` (~2861 palavras)
  - `/frete-urgente-em-anapolis/` (~3286 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 20 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `9f5d375`

- **Porto Alegre (RS)** — publicado em 2026-02-06
  - `/fretes-em-porto-alegre/` (~3028 palavras)
  - `/mudancas-em-porto-alegre/` (~3009 palavras)
  - `/frete-urgente-em-porto-alegre/` (~3355 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `3236f25`

- **São Paulo (SP)** — publicado em 2026-02-06
  - `/fretes-em-sao-paulo/` (~3187 palavras)
  - `/mudancas-em-sao-paulo/` (~3256 palavras)
  - `/frete-urgente-em-sao-paulo/` (~3409 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `2f15ea0`

- **Florianópolis (SC)** — publicado em 2026-02-06
  - `/fretes-em-florianopolis/` (~3038 palavras)
  - `/mudancas-em-florianopolis/` (~2964 palavras)
  - `/frete-urgente-em-florianopolis/` (~3178 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `ef0b51d`
- **Métricas internas (CT)**:
  - `pageview` + `whatsapp_click` enviados via `sendBeacon` para o CT
  - painel no CT: Menu **Site** (cidades no ar + cliques WhatsApp por cidade/página)
- **Bairros (conteúdo local)**:
  - Fonte canônica: `src/_data/neighborhoods.json`
  - Cada cidade é dividida em 3 blocos (~15) para as páginas `fretes/mudancas/urgente` (evita repetição entre URLs).
  - Comando local para gerar/atualizar via OpenAI: `npm run neighborhoods:fetch` (chave via ambiente; nunca no Git).
- **Depoimentos (prova social)**:
  - Modo atual: seção **"Depoimentos"** (depoimentos de clientes).
  - Fonte canônica: `src/_data/testimonials.json`
  - Comando local para gerar por cidade+tipo: `npm run testimonials:generate` (chave via `local.env`, nunca no Git).

---

## Últimas correções aplicadas (base estabilizada)

- **WhatsApp (CTA)**: corrigido caso em que **2 botões não abriam com mensagem automática** (topo e dock inferior).
  - Regra agora: topbar/dock sempre usam o “melhor link de WhatsApp” da página, e sempre com `?text=`.
  - Evidência: ajuste em `src/_includes/base.njk` (commit `7fe6edf` no repo do site).
- **Imagens**: consolidado padrão canônico “sem imagens” nas páginas de cidade (performance + clareza + menos fricção).
- **Bairros**: padronizado fluxo “gerar → dividir em 3 → publicar” com arquivo canônico + comando local (ver Runbook).

## Regras de copy (não-negociáveis)

- **Proibido** colocar “marcação” no texto tipo: “gerado por IA”, “fictício”, “exemplo”, etc.
  - A seção é exibida como **"Depoimentos"**; o texto de cada depoimento deve soar humano e natural.
- **Proibido** claims absolutos sem base (“melhor preço”, “24h garantido”, “sempre imediato”). Usar:
  - “conforme disponibilidade”, “avaliamos encaixes”, “horários estendidos quando possível”, etc.

