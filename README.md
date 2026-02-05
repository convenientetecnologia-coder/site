# Site — Fretes & Mudanças (páginas por cidade)

Projeto do site em `C:\site`.

## Objetivo

Gerar e publicar páginas por cidade seguindo o padrão definitivo de SEO:

- `/fretes-em-{cidade}`
- `/mudancas-em-{cidade}`
- `/frete-urgente-em-{cidade}`

Sem criar variações de URL para “hoje/agora/24h” e sem duplicar texto entre cidades.

## Rodar local

Pré-requisito: Node.js instalado.

- Instalar dependências:
  - `npm install`
- Rodar em modo dev:
  - `npm run dev`
- Build (gera site estático em `dist/`):
  - `npm run build`
- Validação (quality gate):
  - `npm run validate`

## Deploy (Hostinger Git Deploy)

Padrão: Hostinger puxa do GitHub e publica o conteúdo do build.

Detalhes e checklist: `docs/RUNBOOK_TECNICO.md`.

