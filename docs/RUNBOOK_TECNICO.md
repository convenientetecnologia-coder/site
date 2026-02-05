### Runbook técnico — SITE (Fretes & Mudanças)

Este arquivo é o manual de operação do projeto em `C:\site`.

---

### Como rodar local (CANÔNICO)

- Instalar dependências:
  - `npm install`
- Rodar dev:
  - `npm run dev`
  - abre `http://127.0.0.1:8088`
- Build:
  - `npm run build` (gera estático em `dist/`; faz clean automático antes do build)
- Quality gate:
  - `npm run validate` (falha se tiver títulos/H1 repetidos, páginas faltando, etc.)
- Auditoria de depoimentos:
  - `npm run audit:testimonials` (gera `docs/AUDITORIA_DEPOIMENTOS.md` e acusa duplicados)
- Preparar deploy (Hostinger Git Deploy):
  - `npm run deploy:prepare` (build + validate + copia `dist/` para a raiz do repo como webroot)

Importante: **não existe servidor Node rodando em produção** neste padrão. O Node é só ferramenta de build.

---

### Deploy Hostinger (Git Deploy) — “commit e sobe sozinho” (CANÔNICO)

Objetivo: o humano faz **1 configuração inicial** no hPanel, depois o fluxo vira:

`git push -> Hostinger puxa -> site no ar`

#### Configuração inicial (humano, 1 vez)

1) Criar repositório GitHub do projeto do site (público ou privado).
2) No hPanel: Git Deploy
   - colar URL do repo
   - escolher branch (geralmente `main`)
   - diretório: **vazio** (ou `public_html` vazio)
3) Se for repo privado:
   - gerar/capturar a SSH key do Hostinger (deploy key)
   - adicionar no GitHub como Deploy Key com permissão de leitura.

#### Política de publicação

- O Hostinger deve publicar o conteúdo **estático**.
- Fonte de verdade do build: `dist/`.

IMPORTANTE (Hostinger Git Deploy):

- O Hostinger clona o repositório inteiro dentro do `public_html` e **não roda build**.
- Portanto este projeto usa um passo canônico: `npm run deploy:prepare`, que copia `dist/*` para a **raiz** do repo (webroot).
- Segurança: `.htaccess` bloqueia acesso público a `src/`, `docs/`, `scripts/`, `dist/` e arquivos do projeto.

Regra para não quebrar clientes antigos:

- A home (`/`) permanece como **auto atendimento legado** (fluxo existente).
- O “hub SEO / lista de cidades” fica em: `/cidades/`.

**IMPORTANTE (Hostinger Git Deploy):** o Hostinger normalmente **não executa** `npm run build`.
Ele só copia os arquivos do repositório para o `public_html`.

Portanto o repositório do site deve conter o conteúdo pronto para servir:

- `dist/` versionado (recomendado neste projeto) **ou**
- publicar o build no root do repo (alternativa)

Este projeto está configurado no modo “`dist/` versionado” para simplificar o deploy.

---

### Modo DRAFT vs PRODUCTION (CANÔNICO)

Objetivo: nunca deixar o Google indexar páginas rascunho.

- **DRAFT** (padrão antes do primeiro deploy):
  - gera somente o que está habilitado (ou pode gerar zero cidades)
  - `robots.txt` bloqueia crawl
  - meta robots usa `noindex,nofollow`
- **PRODUCTION**:
  - gera e lista no sitemap apenas páginas habilitadas
  - `robots.txt` libera crawl
  - meta robots usa `index,follow`

Configuração: `src/_data/publish_config.json`

---

### WhatsApp (CTA) + métricas (CANÔNICO)

O CTA de WhatsApp é gerado por página usando `wa.me` e texto pré-preenchido.

Configuração (fonte de verdade): `src/_data/site.json`

- `whatsAppNumberE164`: número em E.164 **somente dígitos** (ex.: `5548999999999`)
- `whatsAppTemplates`: textos por tipo (usa `{CITY}`)
- `trackingEndpoint`: endpoint público HTTPS do CT para telemetria (pageview + clique WhatsApp)
  - exemplo de formato: `https://SEU_CT_DOMINIO/convenientetecnologia/api/site/event`

Gates:

- Em `production`, `npm run validate` **falha** se `whatsAppNumberE164` ou `trackingEndpoint` estiverem vazios/ inválidos.

---

### Rollback (CANÔNICO)

- Reverter commit no GitHub (ex.: `git revert`) e fazer `push`.
- O Hostinger vai puxar a versão anterior e o site volta.

---

### Cache (CANÔNICO)

Se uma alteração parece não refletir:
- aguardar 1–2 min (deploy)
- testar em janela anônima
- limpar cache do browser

