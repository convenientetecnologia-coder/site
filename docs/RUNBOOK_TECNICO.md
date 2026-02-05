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
  - Regra: **sempre** rodar `deploy:prepare` antes de `git push` (para o `index.html`/assets do webroot estarem atualizados)

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

#### Implantação automática (webhook) — CANÔNICO

Sem webhook, o Hostinger **não puxa automaticamente** após `git push` (você precisa clicar em **Implantar** manualmente).

Para automatizar:

1) No hPanel (Git Deploy): copiar a **URL do webhook** (Implantação automática).
2) No GitHub: `Settings → Webhooks → Add webhook`
3) Preencher:
   - **Payload URL**: colar a URL do webhook do Hostinger
   - **Content type**: `application/json`
   - **Secret**: vazio
   - **Which events**: **Just the push event**
   - **Active**: ligado
4) Salvar.
5) Fazer um commit/push pequeno e checar no hPanel (Visualizar resultado) se o deploy foi disparado.

Regra de segurança (docs):

- Não colar a URL do webhook em docs/repo. Tratar como dado operacional sensível.
  - Evidência de que está funcionando: `robots.txt` e `index.html` atualizam sem clicar em “Implantar”.

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

### Validação pós-deploy (CANÔNICO)

No Windows/PowerShell, use `curl.exe` (não `curl`, que é alias do `Invoke-WebRequest`).

Checklist mínimo (depois do deploy):

- `curl.exe -I "https://www.fretesoumudancas.com.br/"` → `HTTP/1.1 200 OK`
- `curl.exe -I "https://www.fretesoumudancas.com.br/cidades/"` → `HTTP/1.1 200 OK`
- `curl.exe -s "https://www.fretesoumudancas.com.br/robots.txt"` (confere draft vs production)
- `curl.exe -s "https://www.fretesoumudancas.com.br/sitemap.xml"`
- `curl.exe -s "https://www.fretesoumudancas.com.br/site_manifest.json"`

### Modo DRAFT vs PRODUCTION (CANÔNICO)

Objetivo: nunca deixar o Google indexar páginas rascunho.

- **DRAFT** (padrão antes do primeiro deploy):
  - gera somente o que está habilitado (ou pode gerar zero cidades)
  - `robots.txt` bloqueia crawl **(mas permite `/sitemap.xml` e `/robots.txt` para o GSC buscar)**
  - meta robots usa `noindex,nofollow`
- **PRODUCTION**:
  - gera e lista no sitemap apenas páginas habilitadas
  - `robots.txt` libera crawl
  - meta robots usa `index,follow`

Configuração: `src/_data/publish_config.json`

---

### Google Search Console (GSC) (CANÔNICO)

Objetivo: dar visibilidade/controle de indexação e saúde do site para o Google.

Configuração recomendada (1 vez): **verificação por DNS** (TXT).

Passo a passo:

1) No GSC: adicionar propriedade do tipo **Domínio**: `fretesoumudancas.com.br`
2) Copiar o TXT `google-site-verification=...`
3) No hPanel (DNS): criar registro TXT para o domínio (host `@` ou vazio) com o valor do GSC
4) Voltar no GSC e clicar **Verificar**
5) Enviar sitemap (1 vez): `sitemap.xml` (fica em `https://www.fretesoumudancas.com.br/sitemap.xml`)

Regra de segurança (docs):

- Não registrar o valor exato do TXT `google-site-verification=...` no repositório/docs. Registrar apenas que foi configurado no DNS.

Observação importante:

- Enquanto `publish.mode=draft`, o `robots.txt` está com `Disallow: /` e o Google não deve indexar (intencional).
- Depois que entrar em `production` e habilitar cidades, o sitemap passa a ser o canal principal para descoberta automática de novas URLs.

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

#### Regra crítica (UX / conversão) — CANÔNICO

- **Todo CTA de WhatsApp** (topo, botões no conteúdo e dock mobile) deve abrir o WhatsApp com **mensagem pré-preenchida**:
  - padrão: `https://wa.me/<numero>?text=<texto_urlencoded>`
- **Nunca** depender do tracking para isso funcionar.
  - Motivo: tracking pode ser bloqueado (rede, bloqueador, endpoint inválido), mas o CTA deve continuar perfeito.

Evidência técnica:

- Implementação canônica em `src/_includes/base.njk` (topbar + dock com `?text=`; “fiação” de CTA separada do tracking).

---

### Bairros (geração assistida) — CANÔNICO

Objetivo: para cada cidade, manter uma lista de bairros/regiões **curta, humana e não-spam**, e dividir em 3 blocos para as páginas:

- `/fretes-em-{cidade}`: bloco `fretes` (~15)
- `/mudancas-em-{cidade}`: bloco `mudancas` (~15)
- `/frete-urgente-em-{cidade}`: bloco `urgente` (~15)

Fonte de verdade no repo:

- `src/_data/neighborhoods.json` (conteúdo estático; não chama API em produção)

Comando canônico (local):

- Preparar o ambiente (Windows PowerShell):
  - definir `OPENAI_API_KEY` (NUNCA versionar em arquivo do repo)
  - opcional: `OPENAI_MODEL` (padrão: `gpt-5.2`)
- Rodar:
  - `npm run neighborhoods:fetch -- --city "Florianópolis" --slug florianopolis --state "SC" --maxPerPage 15`

Arquivo de exemplo (sem segredo):

- `env.example` (referência; não é usado automaticamente)

Regra de qualidade:

- A lista deve conter itens de alta confiança; se houver dúvida, melhor omitir do que inventar.
  - (O projeto prioriza integridade e anti-spam.)

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

