# `city_content/` — conteúdo por cidade (canônico)

Esta pasta contém **um JSON por cidade** (nome do arquivo = `slug.json`) com o conteúdo “pilar” gerado/curado para as 3 páginas:

- `fretes`
- `mudancas`
- `urgente`

As páginas em `src/pages/*.11ty.js` consomem este conteúdo quando existir e fazem fallback para o template determinístico quando não existir.

## Formato (alto nível)

Cada arquivo deve ter:

- `meta`: `{ version, city, slug, generatedAt, sources[] }`
- `fretes`, `mudancas`, `urgente`: blocos com listas:
  - `introParagraphs[]`
  - `guideParagraphs[]`
  - `howSteps[]`
  - `priceFactors[]`
  - `prepChecklist[]`
  - `scenarios[]`
  - `faq[]` (objetos `{ q, a }`)

Regras: sem PII, sem claims absolutos, linguagem humana.

