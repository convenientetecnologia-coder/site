### Timeline — SITE (mais novo em cima)

Regra: toda mudança relevante entra aqui com:
- o que mudou,
- por que mudou,
- evidência (arquivo/commit),
- impacto (build/deploy),
- rollback.

---

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

