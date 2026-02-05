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

### Depoimentos (geração assistida) — CANÔNICO

Objetivo: preencher prova social com depoimentos de clientes — textos **humanos** e **curtos**, exibidos na seção "Depoimentos".

Fonte de verdade:

- `src/_data/testimonials.json`

Comando canônico (local):

- Pré-requisito: `OPENAI_API_KEY` no `local.env` (arquivo ignorado pelo Git)
- Rodar (um tipo por vez):
  - `npm run testimonials:generate -- --city "Florianópolis" --slug florianopolis --type fretes --count 12`
  - `npm run testimonials:generate -- --city "Florianópolis" --slug florianopolis --type mudancas --count 12`
  - `npm run testimonials:generate -- --city "Florianópolis" --slug florianopolis --type urgente --count 12`

Notas:

- As páginas exibem **3–7** depoimentos por cidade+tipo de forma determinística (não muda a cada build).
- Em `production`, o validate exige **>=3** depoimentos por página de cidade.

---

### Workflow canônico: “Criar páginas da cidade X” (ULTRA ENTERPRISE) — CANÔNICO

**Regra mestra**: quando o humano pedir "criar páginas da cidade X", o GPT deve executar **TUDO** automaticamente:
1. Gerar conteúdo GPT (3 páginas)
2. Gerar bairros (divididos em 3 blocos)
3. Gerar depoimentos (12 por tipo)
4. Habilitar cidade em `production`
5. Build + validate
6. **Commit + push para GitHub** (sem perguntar)
7. Avisar o humano: "Páginas criadas e publicadas. Pronto para próxima cidade."

**Sem exceções**: não parar no meio, não pedir confirmação, não deixar pendente.

#### Passo a passo automático (GPT executa tudo)

**1) Gerar páginas completas:**
```powershell
cd C:\site
npm run city:publish -- --city "NOME_DA_CIDADE" --slug slug_da_cidade --state "UF" --production 1
```

Este comando faz **TUDO** automaticamente:
- Gera conteúdo GPT para as 3 páginas (fretes/mudanças/urgente)
- Busca bairros via OpenAI e divide em 3 blocos
- Gera 12 depoimentos por tipo (36 no total)
- Habilita cidade em `publish_config.json` em modo `production`
- Executa `deploy:prepare` (build + validate + copia para raiz)

**2) Commit e push automático (obrigatório):**
```powershell
cd C:\site
git add .
git commit -m "feat: publica paginas de NOME_DA_CIDADE (fretes/mudancas/urgente) em production" -m "Paginas geradas com conteudo GPT, bairros e depoimentos unicos. Modo production ativado para indexacao."
git push origin main
```

**3) Atualizar documentação (obrigatório):**
- Atualizar `docs/LIVRO_DE_BORDO.md` (adicionar cidade na lista de publicadas)
- Atualizar `docs/TIMELINE.md` (registrar publicação com commit hash)

**4) Commit da documentação (obrigatório):**
```powershell
cd C:\site
git add docs/
git commit -m "docs: atualiza livros apos publicacao de NOME_DA_CIDADE"
git push origin main
```

**5) Avisar o humano:**
- "✅ Páginas de [CIDADE] criadas e publicadas no GitHub."
- "📦 Commit: [hash]"
- "🌐 Aguardando deploy automático do Hostinger (1-2 minutos)."
- "✅ Pronto para próxima cidade."

#### Validação automática (gate de qualidade)

O `npm run city:publish` já executa `deploy:prepare` que inclui:
- `npm run build` (gera HTML estático)
- `npm run validate` (quality gate: palavras >=1200, depoimentos >=3, titles/H1 únicos, sem duplicatas)

**Se o validate falhar**, o processo para e o GPT deve:
1. Corrigir o problema
2. Re-executar `npm run city:publish`
3. Só então fazer commit/push

#### Evidência no ar (verificação pós-deploy — opcional para GPT)

Após o deploy automático do Hostinger (1-2 minutos), pode verificar:

1) Manifest (fonte de verdade):
   - `curl.exe -s "https://www.fretesoumudancas.com.br/site_manifest.json"`
   - Verificar que o `slug` aparece e que os links batem.

2) Páginas respondem:
   - `curl.exe -I "https://www.fretesoumudancas.com.br/fretes-em-slug/"`
   - `curl.exe -I "https://www.fretesoumudancas.com.br/mudancas-em-slug/"`
   - `curl.exe -I "https://www.fretesoumudancas.com.br/frete-urgente-em-slug/"`

**Nota**: o GPT não precisa esperar o deploy para avisar o humano. O importante é que o commit/push foi feito e a documentação atualizada.

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

