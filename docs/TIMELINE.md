### Timeline — SITE (mais novo em cima)

Regra: toda mudança relevante entra aqui com:
- o que mudou,
- por que mudou,
- evidência (arquivo/commit),
- impacto (build/deploy),
- rollback.

---

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

