### Livro de bordo — SITE (Fretes & Mudanças) — CANÔNICO

Objetivo: qualquer GPT novo consegue continuar o projeto **sem perder contexto**, lendo:

- Runbook (como operar/deploy/rollback): `docs/RUNBOOK_TECNICO.md`
- Timeline (o que mudou e por quê): `docs/TIMELINE.md`
- Inbox (intake/triagem): `docs/INBOX_RELATOS_DO_HUMANO.md` e `docs/inbox/INDEX.md`
- Padrão definitivo das páginas: `docs/PAGINAS_MODELO.md`

Regras:

- **Uma página = uma intenção principal** (SEO). Não misturar.
- **Sem duplicar texto** entre cidades (anti-spam).
- **Deploy** tem que ser “commit -> publish” (via Git Deploy no Hostinger).
- **Sem secrets** em docs/repo. Só nomes e onde configurar.
- **Regra de operação (ultra enterprise)**: toda melhoria/mudança relevante deve atualizar **Runbook + Timeline** automaticamente.

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
- **Métricas internas (CT)**:
  - `pageview` + `whatsapp_click` enviados via `sendBeacon` para o CT
  - painel no CT: Menu **Site** (cidades no ar + cliques WhatsApp por cidade/página)

## Regras de copy (não-negociáveis)

- **Proibido** colocar “marcação” no texto tipo: “gerado por IA”, “fictício”, “exemplo”, etc.
- **Proibido** claims absolutos sem base (“melhor preço”, “24h garantido”, “sempre imediato”). Usar:
  - “conforme disponibilidade”, “avaliamos encaixes”, “horários estendidos quando possível”, etc.

