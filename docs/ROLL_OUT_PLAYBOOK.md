### Rollout Playbook — SITE (CANÔNICO)

Objetivo: publicar em produção **sem queimar SEO** e sem “doorway pages”.

---

## Princípio

**Só vai para PRODUCTION/indexação quando estiver pronto.**

“Pronto” = página útil, única, com CTA funcionando e checklist aprovado.

---

## Estados do rollout (por cidade)

- **draft**: página pode existir no repo, mas não deve ser rastreável/indexável.
- **live**: página é gerada e entra no sitemap.

Fonte de verdade: `src/_data/publish_config.json` (slugs habilitados).

---

## Passo a passo (primeira cidade)

1) Escolher 1 cidade (ex.: `florianopolis`) e preencher conteúdo completo (3 páginas).
2) Rodar:
   - `npm run build`
   - `npm run validate`
3) Mudar modo para `production` e habilitar a cidade no `publish_config.json`.
4) Commit/push.
5) Só então conectar o Git Deploy no Hostinger.
6) Validar visualmente (humano):
   - home carrega
   - as 3 URLs da cidade abrem
   - links e CTA WhatsApp funcionam
   - `robots.txt` e `sitemap.xml` estão corretos

---

## Cadência sugerida (após confiança)

- Começar com **1 cidade**.
- Depois: **3 cidades/dia (9 páginas/dia)** por 3–5 dias.
- Se tudo ok: aumentar para 6–10 cidades/dia conforme capacidade de revisão.

---

## Checklist “pronto para indexar”

- URL correta (sem variações fora do padrão)
- Title único e coerente
- H1 único e coerente
- 1200–1800 palavras (alvo ~1500)
- CTA WhatsApp com número real e texto correto
- Bairros/regiões citados (sem gerar URLs)
- FAQ com variação local
- Sem claims falsos / sem depoimentos inventados
- `sitemap.xml` inclui somente páginas live

