### Livro de bordo — SITE (Fretes & Mudanças) — CANÔNICO

Objetivo: qualquer GPT novo consegue continuar o projeto **sem perder contexto**, lendo:

- Runbook (como operar/deploy/rollback): `docs/RUNBOOK_TECNICO.md`
- Timeline (o que mudou e por quê): `docs/TIMELINE.md`
- Controle de indexação manual (GSC): `docs/INDEXACAO_MANUAL_GSC.md`
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

- **Londrina (PR)** — publicado em 2026-02-09
  - `/fretes-em-londrina/` (~3077 palavras)
  - `/mudancas-em-londrina/` (~2791 palavras)
  - `/frete-urgente-em-londrina/` (~3077 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `1ef27ea`

- **Limeira (SP)** — publicado em 2026-02-09
  - `/fretes-em-limeira/` (~3147 palavras)
  - `/mudancas-em-limeira/` (~3000 palavras)
  - `/frete-urgente-em-limeira/` (~3135 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - Depoimentos: 35 (11/12/12 por tipo)
  - Commit: `ab00bf6`

- **Jundiaí (SP)** — publicado em 2026-02-09
  - `/fretes-em-jundiai/` (~3146 palavras)
  - `/mudancas-em-jundiai/` (~3040 palavras)
  - `/frete-urgente-em-jundiai/` (~3244 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `ba7a583`

- **Juiz de Fora (MG)** — publicado em 2026-02-09
  - `/fretes-em-juiz-de-fora/` (~3000 palavras)
  - `/mudancas-em-juiz-de-fora/` (~2994 palavras)
  - `/frete-urgente-em-juiz-de-fora/` (~3151 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - Depoimentos: 35 (12/12/11 por tipo)
  - Commit: `be6d28b`

- **Juazeiro do Norte (CE)** — publicado em 2026-02-09
  - `/fretes-em-juazeiro-do-norte/` (~2998 palavras)
  - `/mudancas-em-juazeiro-do-norte/` (~3091 palavras)
  - `/frete-urgente-em-juazeiro-do-norte/` (~3221 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 20 bairros divididos em 3 blocos únicos (6/7/7 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Commit: `4e42991`

- **Joinville (SC)** — publicado em 2026-02-09
  - `/fretes-em-joinville/` (~3183 palavras)
  - `/mudancas-em-joinville/` (~3226 palavras)
  - `/frete-urgente-em-joinville/` (~3242 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 40 bairros divididos em 3 blocos únicos (13/13/14 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Commit: `d5dbb13`

- **João Pessoa (PB)** — publicado em 2026-02-09
  - `/fretes-em-joao-pessoa/` (~3081 palavras)
  - `/mudancas-em-joao-pessoa/` (~2947 palavras)
  - `/frete-urgente-em-joao-pessoa/` (~3213 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `6588ce2`

- **Ipatinga (MG)** — publicado em 2026-02-09
  - `/fretes-em-ipatinga/` (~3032 palavras)
  - `/mudancas-em-ipatinga/` (~2876 palavras)
  - `/frete-urgente-em-ipatinga/` (~3411 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 24 bairros divididos em 3 blocos únicos (8/8/8 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `a1fbd93`

- **Indaiatuba (SP)** — publicado em 2026-02-09
  - `/fretes-em-indaiatuba/` (~3057 palavras)
  - `/mudancas-em-indaiatuba/` (~3039 palavras)
  - `/frete-urgente-em-indaiatuba/` (~3131 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `0f1f36c`

- **Imperatriz (MA)** — publicado em 2026-02-09
  - `/fretes-em-imperatriz/` (~3072 palavras)
  - `/mudancas-em-imperatriz/` (~2922 palavras)
  - `/frete-urgente-em-imperatriz/` (~3387 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 10 bairros divididos em 3 blocos únicos (3/3/4 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `369b884`

- **Goiânia (GO)** — publicado em 2026-02-09
  - `/fretes-em-goiania/` (~3008 palavras)
  - `/mudancas-em-goiania/` (~3005 palavras)
  - `/frete-urgente-em-goiania/` (~3243 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `c4719b0`

- **Franca (SP)** — publicado em 2026-02-09
  - `/fretes-em-franca/` (~3097 palavras)
  - `/mudancas-em-franca/` (~3035 palavras)
  - `/frete-urgente-em-franca/` (~3074 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 36 bairros divididos em 3 blocos únicos (12/12/12 por página)
  - 36 depoimentos (12 por tipo)
  - Commit: `750c044`

- **Foz do Iguaçu (PR)** — publicado em 2026-02-06
  - `/fretes-em-foz-do-iguacu/` (~2906 palavras)
  - `/mudancas-em-foz-do-iguacu/` (~3187 palavras)
  - `/frete-urgente-em-foz-do-iguacu/` (~3368 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 32 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `90ef663`

- **Fortaleza (CE)** — publicado em 2026-02-06
  - `/fretes-em-fortaleza/` (~3213 palavras)
  - `/mudancas-em-fortaleza/` (~3047 palavras)
  - `/frete-urgente-em-fortaleza/` (~3194 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `52e35c8`

- **Duque de Caxias (RJ)** — publicado em 2026-02-06
  - `/fretes-em-duque-de-caxias/` (~3082 palavras)
  - `/mudancas-em-duque-de-caxias/` (~3005 palavras)
  - `/frete-urgente-em-duque-de-caxias/` (~3386 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 30 bairros divididos em 3 blocos únicos
  - 35 depoimentos (11/12/12 por tipo)
  - Commit: `5ed044d`

- **Curitiba (PR)** — publicado em 2026-02-06
  - `/fretes-em-curitiba/` (~3229 palavras)
  - `/mudancas-em-curitiba/` (~2939 palavras)
  - `/frete-urgente-em-curitiba/` (~3298 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `4828ffd`

- **Cuiabá (MT)** — publicado em 2026-02-06
  - `/fretes-em-cuiaba/` (~2955 palavras)
  - `/mudancas-em-cuiaba/` (~3007 palavras)
  - `/frete-urgente-em-cuiaba/` (~3098 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `cfec3d4`

- **Caxias do Sul (RS)** — publicado em 2026-02-06
  - `/fretes-em-caxias-do-sul/` (~3164 palavras)
  - `/mudancas-em-caxias-do-sul/` (~3209 palavras)
  - `/frete-urgente-em-caxias-do-sul/` (~3475 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 33 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `7c77ef9`

- **Cascavel (PR)** — publicado em 2026-02-06
  - `/fretes-em-cascavel/` (~3028 palavras)
  - `/mudancas-em-cascavel/` (~2970 palavras)
  - `/frete-urgente-em-cascavel/` (~3329 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 45 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `c8e06c1`

- **Caruaru (PE)** — publicado em 2026-02-06
  - `/fretes-em-caruaru/` (~3013 palavras)
  - `/mudancas-em-caruaru/` (~2760 palavras)
  - `/frete-urgente-em-caruaru/` (~3320 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 19 bairros divididos em 3 blocos únicos
  - 36 depoimentos (12 por tipo)
  - Commit: `0f8a0e0`

- **Campos dos Goytacazes (RJ)** — publicado em 2026-02-06
  - `/fretes-em-campos-dos-goytacazes/` (~3066 palavras)
  - `/mudancas-em-campos-dos-goytacazes/` (~3117 palavras)
  - `/frete-urgente-em-campos-dos-goytacazes/` (~3402 palavras)
  - Conteúdo GPT 100% único (sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - 38 bairros divididos em 3 blocos únicos
  - 35 depoimentos (12/12/11 por tipo)
  - Commit: `91f18c9`

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

## Indexação (Google Search Console) — operação

- **Sitemap canônico**: `https://www.fretesoumudancas.com.br/sitemap.xml`
- **Controle de indexação manual (GSC)**: `docs/INDEXACAO_MANUAL_GSC.md`
  - Regra: sempre solicitar indexação usando **URL canônica com `www`**.
  - Cadência sugerida (site novo): **3 URLs/dia** (bem escolhidas) para não desperdiçar “fila”.

## Regras de copy (não-negociáveis)

- **Proibido** colocar “marcação” no texto tipo: “gerado por IA”, “fictício”, “exemplo”, etc.
  - A seção é exibida como **"Depoimentos"**; o texto de cada depoimento deve soar humano e natural.
- **Proibido** claims absolutos sem base (“melhor preço”, “24h garantido”, “sempre imediato”). Usar:
  - “conforme disponibilidade”, “avaliamos encaixes”, “horários estendidos quando possível”, etc.

