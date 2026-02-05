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
  - `npm run build` (gera estático em `dist/`)
- Quality gate:
  - `npm run validate` (falha se tiver títulos/H1 repetidos, páginas faltando, etc.)

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

Nota: alguns planos do Hostinger fazem deploy do repo “como está”. Se for o seu caso, vamos ajustar para:
- publicar `dist/` no root do repo **ou**
- configurar o deploy para a pasta correta.

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

