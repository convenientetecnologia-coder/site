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
- **Política de mídia (padrão canônico)**: **sem imagens** nas páginas de cidade (mais rápido, limpo, sem “foto de produto” para serviço). Se um dia voltar a usar imagem, só com fotos reais e otimizadas.
- **Política de CTA WhatsApp (padrão canônico)**: **todo botão/atalho de WhatsApp deve abrir o WhatsApp com mensagem pré-preenchida** (link `wa.me` + `?text=`). Nunca depender do tracking para funcionar.

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

---

## Últimas correções aplicadas (base estabilizada)

- **WhatsApp (CTA)**: corrigido caso em que **2 botões não abriam com mensagem automática** (topo e dock inferior).
  - Regra agora: topbar/dock sempre usam o “melhor link de WhatsApp” da página, e sempre com `?text=`.
  - Evidência: ajuste em `src/_includes/base.njk` (commit `7fe6edf` no repo do site).
- **Imagens**: consolidado padrão canônico “sem imagens” nas páginas de cidade (performance + clareza + menos fricção).

## Regras de copy (não-negociáveis)

- **Proibido** colocar “marcação” no texto tipo: “gerado por IA”, “fictício”, “exemplo”, etc.
- **Proibido** claims absolutos sem base (“melhor preço”, “24h garantido”, “sempre imediato”). Usar:
  - “conforme disponibilidade”, “avaliamos encaixes”, “horários estendidos quando possível”, etc.

