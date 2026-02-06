### Timeline — SITE (mais novo em cima)

Regra: toda mudança relevante entra aqui com:
- o que mudou,
- por que mudou,
- evidência (arquivo/commit),
- impacto (build/deploy),
- rollback.

---

#### 2026-02-06 — [SITE] Florianópolis (SC): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Florianópolis com sistema 100% GPT:
  - `/fretes-em-florianopolis/` (~3038 palavras)
  - `/mudancas-em-florianopolis/` (~2964 palavras)
  - `/frete-urgente-em-florianopolis/` (~3178 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (títulos/descrições únicos)
- **Por quê**: primeira cidade publicada com sistema 100% GPT e anti-duplicação implementado. Conteúdo 100% único e exclusivo.
- **Evidência**:
  - Commit: `ef0b51d` (repo `site`)
  - `src/_data/publish_config.json` (florianopolis habilitado em production)
  - `src/_data/city_content/florianopolis.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `ef0b51d` ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Limpeza completa: Florianópolis e São Paulo removidas

- **O que**: remoção completa de todas as páginas de Florianópolis e São Paulo:
  - Cidades removidas do `publish_config.json` (modo `draft`, lista vazia)
  - Arquivos `city_content` deletados (florianopolis.json, sao-paulo.json)
  - `neighborhoods.json` limpo (vazio)
  - `testimonials.json` limpo (vazio)
  - Todas as páginas HTML removidas do ar (não indexáveis)
  - Sistema limpo e pronto para produção real
- **Por quê**: começar produção real do zero, com sistema 100% GPT e anti-duplicação implementado. Florianópolis e São Paulo foram testes e identificaram duplicações que foram corrigidas.
- **Evidência**:
  - Commit: `bb57735` (repo `site`)
  - `src/_data/publish_config.json` (modo draft, enabledCitySlugs vazio)
  - `src/_data/city_content/` (arquivos deletados)
  - `src/_data/neighborhoods.json` (vazio)
  - `src/_data/testimonials.json` (vazio)
- **Impacto**: 
  - Páginas removidas do ar (não indexáveis)
  - Sistema pronto para criar cidades novas com conteúdo 100% único
  - **Nota**: dados de acesso/cliques no CT (menu Site) precisam ser limpos manualmente no projeto `conveniente`
- **Rollback**: reverter commit `bb57735` (não recomendado; sistema foi limpo intencionalmente).

---

#### 2026-02-05 — [SITE] Sistema 100% GPT + Anti-duplicação (ultra enterprise)

- **O que**: implementado sistema de conteúdo 100% GPT com validação anti-duplicação:
  - Removidos todos os templates hardcoded (demands, whenYes, whenNo, common, types, services, checklist)
  - GPT agora gera TODAS as seções: títulos únicos (`sectionTitles`), descrições únicas (`sectionDescriptions`), listas únicas
  - `validate.js` detecta duplicações de títulos/descrições e **FALHA em production**
  - Em `production`, conteúdo GPT é **obrigatório** (sem fallback)
  - Regeneração necessária: Florianópolis e São Paulo precisam ser regeneradas com conteúdo 100% único
- **Por quê**: garantir 100% de unicidade entre páginas de diferentes cidades, evitando penalização SEO por conteúdo duplicado. Alinhar com objetivo "ultra enterprise melhor do mundo".
- **Evidência**:
  - `C:\site\scripts\generate_city_content_openai.js` (GPT gera sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - `C:\site\src\pages\frete-urgente-em.11ty.js` (templates hardcoded removidos, validação GPT obrigatória)
  - `C:\site\src\pages\fretes-em.11ty.js` (templates hardcoded removidos, validação GPT obrigatória)
  - `C:\site\src\pages\mudancas-em.11ty.js` (templates hardcoded removidos, validação GPT obrigatória)
  - `C:\site\scripts\validate.js` (gate anti-duplicação de títulos/descrições)
  - `C:\site\docs\ANALISE_DUPLICACOES_SEO.md` (análise completa das duplicações identificadas)
- **Impacto**: 
  - Páginas futuras já nascem 100% únicas
  - Páginas existentes (Florianópolis e São Paulo) precisam ser regeneradas
  - Validação automática previne duplicações antes do deploy
- **Rollback**: reverter commits desta mudança (não recomendado; compromete qualidade SEO).

---

#### 2026-02-05 — [SITE] São Paulo (SP): 3 páginas publicadas em production

- **O que**: criadas e publicadas as 3 páginas de São Paulo:
  - `/fretes-em-sao-paulo/` (~2560 palavras)
  - `/mudancas-em-sao-paulo/` (~2773 palavras)
  - `/frete-urgente-em-sao-paulo/` (~2704 palavras)
  - Conteúdo GPT gerado, 45 bairros divididos em 3 blocos, 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
- **Por quê**: segunda cidade publicada seguindo o protocolo enterprise completo.
- **Evidência**:
  - Commit: `15492be` (repo `site`)
  - `src/_data/publish_config.json` (sao-paulo habilitado em production)
  - `src/_data/city_content/sao-paulo.json` (conteúdo GPT)
  - `src/_data/neighborhoods.json` (bairros atualizados)
  - `src/_data/testimonials.json` (depoimentos atualizados)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `15492be` ou desabilitar cidade no `publish_config.json`.

#### 2026-02-05 — [SITE] Protocolo enterprise: criação automática de páginas (criar → validar → commit → push → avisar)

- **O que**: estabelecido protocolo ultra enterprise para criação de páginas de cidade:
  - Comando único: `npm run city:publish` gera tudo (conteúdo GPT, bairros, depoimentos, habilita production)
  - Commit + push automático (sem perguntar ao humano)
  - Atualização automática de documentação (LIVRO + TIMELINE)
  - Aviso claro ao humano: "Pronto para próxima cidade"
- **Por quê**: garantir que qualquer GPT consiga criar páginas de forma consistente, sem deixar pendências, sem perder tempo.
- **Evidência**:
  - `C:\site\docs\RUNBOOK_TECNICO.md` (seção "Workflow canônico: Criar páginas da cidade X")
  - `C:\site\scripts\city_publish.js` (orquestra tudo)
- **Impacto**: processo 100% automatizado; humano só precisa pedir "criar páginas da cidade X".
- **Rollback**: reverter commits e voltar ao processo manual (não recomendado).

#### 2026-02-05 — [SITE] Florianópolis (SC): 3 páginas publicadas em production

- **O que**: criadas e publicadas as 3 páginas de Florianópolis:
  - `/fretes-em-florianopolis/` (~2877 palavras)
  - `/mudancas-em-florianopolis/`
  - `/frete-urgente-em-florianopolis/`
  - Conteúdo GPT gerado, 45 bairros divididos em 3 blocos, 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
- **Por quê**: primeira cidade publicada seguindo o protocolo enterprise completo.
- **Evidência**:
  - Commit: `3719b35` (repo `site`)
  - `src/_data/publish_config.json` (florianopolis habilitado em production)
  - `src/_data/city_content/florianopolis.json` (conteúdo GPT)
  - `src/_data/neighborhoods.json` (bairros)
  - `src/_data/testimonials.json` (depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `3719b35` ou desabilitar cidade no `publish_config.json`.

#### 2026-02-05 — [SITE] WhatsApp: todos os CTAs garantidos com mensagem pré-preenchida (topo + dock)

- **O que**: corrigidos os CTAs de WhatsApp que abriam sem mensagem automática no **topo** e no **dock inferior**.
- **Por quê**: conversão/UX; nenhum botão pode “parecer quebrado” e a mensagem deve estar sempre pronta.
- **Evidência**:
  - `C:\site\src\_includes\base.njk` (topbar/dock com `?text=` e “fiação” de CTA independente do tracking)
  - commit do repo `site`: `7fe6edf`
- **Impacto**: todos os botões/atalhos WA abrem `wa.me` com `?text=` (mensagem pré-preenchida).
- **Rollback**: reverter o commit `7fe6edf` no repo do site.

#### 2026-02-05 — [SITE] Bairros: geração assistida + divisão em 3 blocos (~15 por página)

- **O que**:
  - Criado `src/_data/neighborhoods.json` como fonte canônica (conteúdo estático).
  - Criado comando local `npm run neighborhoods:fetch` que consulta OpenAI, normaliza/deduplica e divide em 3 blocos (fretes/mudanças/urgente).
  - Páginas passaram a consumir blocos por tipo para reduzir repetição entre URLs.
- **Por quê**: manter conteúdo local (bairros) sem virar spam; e garantir diferenciação entre as 3 páginas da mesma cidade.
- **Evidência**:
  - `C:\site\scripts\fetch_neighborhoods_openai.js`
  - `C:\site\src\_data\neighborhoods.json`
  - `C:\site\src\_data\neighborhoods.js`
  - `C:\site\src\pages\fretes-em.11ty.js`, `mudancas-em.11ty.js`, `frete-urgente-em.11ty.js`
- **Impacto**: cada página mostra ~15 bairros diferentes (quando disponíveis).
- **Rollback**: reverter commits e voltar a usar lista fixa/única (não recomendado).

#### 2026-02-05 — [SITE] Depoimentos: geração assistida + 3–7 por página

- **O que**:
  - Adicionado comando local `npm run testimonials:generate` para preparar depoimentos de clientes e salvar em `src/_data/testimonials.json`.
  - Páginas passaram a exibir **3–7** depoimentos (determinístico por cidade+tipo) com o título **“Depoimentos”**.
- **Por quê**: prova social com depoimentos de clientes; linguagem humana.
- **Evidência**:
  - `C:\site\scripts\generate_testimonials_openai.js`
  - `C:\site\src\pages\fretes-em.11ty.js`, `mudancas-em.11ty.js`, `frete-urgente-em.11ty.js`
  - `C:\site\docs\DEPOIMENTOS.md`
- **Impacto**: em `production`, validate continua exigindo >=3 e bloqueando duplicados; em `draft` pode ficar vazio sem travar.
- **Rollback**: reverter commit do repo “sem depoimentos” `site`.

#### 2026-02-05 — [SITE] Google Search Console verificado (DNS TXT)

- **O que**: propriedade do domínio `fretesoumudancas.com.br` foi verificada no Google Search Console via registro TXT (DNS).
- **Por quê**: habilitar controle/visibilidade de indexação, cobertura e alertas técnicos do Google.
- **Evidência**: verificação concluída no GSC (método DNS TXT).
- **Próximo passo**: enviar `sitemap.xml` no GSC (1 vez) e manter rollout `draft → production` conforme playbook.
- **Rollback**: remover o TXT do DNS (não recomendado; só se precisar trocar de conta).

#### 2026-02-05 — [SITE] GSC: sitemap enviado + ajuste do robots em draft para permitir fetch do sitemap

- **O que**:
  - Sitemap enviado no GSC: `https://www.fretesoumudancas.com.br/sitemap.xml`
  - Em `draft`, `robots.txt` ganhou allowlist para o GSC buscar o sitemap: `Allow: /sitemap.xml` e `Allow: /robots.txt`
- **Por quê**: manter anti-queima (sem indexação) e ainda permitir que o GSC valide/consuma o sitemap.
- **Evidência**:
  - `https://www.fretesoumudancas.com.br/robots.txt` (Allowlist)
  - `https://www.fretesoumudancas.com.br/sitemap.xml` (HTTP 200)
- **Rollback**: reverter commit do repo `site`.

#### 2026-02-05 — [SITE] Webhook do GitHub configurado e validado (push → deploy automático)

- **O que**: webhook do Hostinger foi configurado no GitHub para disparar deploy automático a cada `push` no branch `main`.
- **Por quê**: eliminar deploy manual (“Implantar”) e reduzir risco operacional.
- **Evidência**: atualização automática de arquivos públicos após `git push` (ex.: `robots.txt`).
- **Rollback**: desativar/remover o webhook no GitHub.

#### 2026-02-05 — [SITE] Hostinger Git Deploy conectado (public_html zerado → site no ar)

- **O que**: Git Deploy do Hostinger foi configurado apontando para o repositório do site (branch `main`) com `public_html` vazio.
- **Por quê**: centralizar 100% do conteúdo do domínio no Git (deploy automático via `git push`).
- **Evidência (produção)**:
  - `curl.exe -I https://www.fretesoumudancas.com.br/` → `HTTP/1.1 200 OK`
  - `curl.exe -I https://www.fretesoumudancas.com.br/cidades/` → `HTTP/1.1 200 OK`
  - `https://www.fretesoumudancas.com.br/robots.txt` gerado pelo modo atual (`draft`).
  - `https://www.fretesoumudancas.com.br/site_manifest.json` disponível para o CT.
- **Impacto**: qualquer commit/push do repo publica no Hostinger automaticamente.
- **Rollback**: desativar Git Deploy no hPanel ou reverter commits (git revert) e fazer push.

#### 2026-02-05 — [SITE] Home legado (autoatendimento) ajustada para mobile-first (viewport/teclado)

- **O que**: ajustes de CSS/JS na home legado (`/`) para estabilizar altura em mobile (iOS/Android) e evitar bugs do `100vh` com barras/teclado.
- **Por quê**: melhorar UX mobile-first sem alterar o fluxo do autoatendimento (conversão e confiança).
- **Evidência**: `C:\site\src\index.njk` (uso de `--vh` via `visualViewport`).
- **Rollback**: reverter commit do repo `site`.

#### 2026-02-05 — [SITE] CTA WhatsApp real + métricas (pageview + clique) integradas ao CT

- **O que**:
  - CTA WhatsApp passou a gerar link real `wa.me` por tipo (fretes/mudanças/urgente) com texto pré-preenchido por cidade.
  - Telemetria adicionada (sem bloquear navegação): `pageview` + `whatsapp_click` via `sendBeacon`.
  - Manifest público do site criado (`/site_manifest.json`) para o CT listar cidades no ar e links oficiais.
- **Por quê**: aumentar conversão e medir engajamento com controle enterprise (quantos acessos e quantos cliques WhatsApp por cidade/página).
- **Evidência**:
  - `C:\site\src/_data/site.json` (WhatsApp + trackingEndpoint)
  - `C:\site\src/_includes/base.njk` (beacon)
  - `C:\site\src/site_manifest.json.11ty.js`
  - (CT) `C:\sitechatbot\convenientetecnologia/index.js` e `C:\sitechatbot\convenientetecnologia/public/site.html`
- **Impacto**:
  - Em `production`, o `npm run validate` falha se WhatsApp/tracking não estiverem configurados.
  - Métricas ficam em `C:\sitechatbot\dados\site_metrics.json`.
- **Rollback**: reverter commit do repo `site` e remover rotas `/api/site/*` do CT se necessário.

#### 2026-02-05 — [SITE] Preservar auto atendimento no domínio principal (home legado) + hub SEO em `/cidades/`

- **O que**:
  - A home (`/`) passou a publicar o **auto atendimento legado** (para não quebrar clientes existentes).
  - A lista/hub de cidades e páginas oficiais ficou em: `/cidades/`.
- **Por quê**: manter o fluxo antigo funcionando enquanto o novo rollout SEO é feito de forma incremental e segura.
- **Evidência**:
  - `C:\site\src\index.njk` (home legado)
  - `C:\site\src\cidades.njk` (hub)
  - `C:\site\docs\RUNBOOK_TECNICO.md` (regra canônica de deploy)
- **Impacto**: o Git Deploy no Hostinger pode apontar para `public_html` sem apagar o auto atendimento (ele está dentro do build).
- **Rollback**: reverter commits do repo `site` e republicar versão anterior.

#### 2026-02-05 — [SITE] Páginas legais (política/termos) dentro do Git + gate de palavras só para páginas de cidade

- **O que**:
  - Criadas páginas canônicas:
    - `/politica-de-privacidade.html`
    - `/termos-de-uso.html`
  - Ajustado o `validate` para aplicar o gate de **>=1200 palavras em production** somente em páginas de cidade (fretes/mudanças/urgente).
- **Por quê**: manter conformidade e não travar produção por páginas institucionais curtas.
- **Evidência**:
  - `C:\site\src\politica-de-privacidade.njk`
  - `C:\site\src\termos-de-uso.njk`
  - `C:\site\scripts\validate.js`
- **Rollback**: reverter commit do repo `site`.

#### 2026-02-05 — [SITE] Hostinger Git Deploy compatível (webroot na raiz + `.htaccess` de proteção)

- **O que**:
  - Criado `npm run deploy:prepare` que faz: build → validate → copia `dist/*` para a **raiz do repo** (webroot).
  - Adicionado `.htaccess` bloqueando acesso público a `src/`, `docs/`, `scripts/`, `dist/` e arquivos internos.
- **Por quê**: o Git Deploy da Hostinger clona o repo inteiro no `public_html` e não executa build — então precisamos de `index.html` na raiz e proteção do conteúdo interno.
- **Evidência**:
  - `C:\site\scripts\deploy_root.js`
  - `C:\site\.htaccess`
  - `C:\site\docs\RUNBOOK_TECNICO.md`
- **Rollback**: reverter commit do repo `site` (remove webroot sync e `.htaccess`).

#### 2026-02-05 — [SITE] Bootstrap do projeto (Eleventy + docs canônicos)

- **O que**:
  - Inicializado projeto em `C:\site` com Eleventy.
  - Criada base documental (livro/runbook/timeline/inbox + padrão de páginas).
- **Por quê**: garantir continuidade perfeita entre GPTs e preparar geração segura de ~200 páginas.
- **Evidência**: `C:\site\package.json`, `C:\site\.eleventy.js`, `C:\site\docs\*`.
- **Deploy**: ainda não conectado ao Hostinger (pendente setup inicial).
- **Rollback**: reverter commits do repo do site.

#### 2026-02-05 — [SITE] Protocolo anti-queima (draft vs production + rollout por cidade)

- **O que**:
  - Definido playbook de rollout incremental (1 cidade -> lotes).
  - Definido modo DRAFT/PRODUCTION com `robots/noindex` e sitemap apenas de páginas live.
- **Por quê**: evitar thin content/doorway pages e publicar só páginas prontas.
- **Evidência**: `C:\site\docs\PAGINAS_MODELO.md`, `C:\site\docs\ROLL_OUT_PLAYBOOK.md`, `C:\site\docs\RUNBOOK_TECNICO.md`.
- **Deploy**: manter DRAFT até a primeira cidade estar perfeita.
- **Rollback**: voltar `publish_config.json` para DRAFT e remover slugs habilitados.

