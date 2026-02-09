### Timeline — SITE (mais novo em cima)

Regra: toda mudança relevante entra aqui com:
- o que mudou,
- por que mudou,
- evidência (arquivo/commit),
- impacto (build/deploy),
- rollback.

---

#### 2026-02-09 — [SITE] Maringá (PR): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Maringá com sistema 100% GPT:
  - `/fretes-em-maringa/` (~3059 palavras)
  - `/mudancas-em-maringa/` (~2771 palavras)
  - `/frete-urgente-em-maringa/` (~3223 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - Bairros: 36 divididos em 3 blocos (12/12/12)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (3 títulos duplicados ajustados em `maringa.json` + correção de encoding “Maringá”)
- **Por quê**: expandir cobertura orgânica no PR seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `6a42af7` (repo `site`)
  - `src/_data/city_content/maringa.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (maringa habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `maringa` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Marabá (PA): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Marabá com sistema 100% GPT:
  - `/fretes-em-maraba/` (~3212 palavras)
  - `/mudancas-em-maraba/` (~2896 palavras)
  - `/frete-urgente-em-maraba/` (~2976 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - Bairros: 25 divididos em 3 blocos (8/8/9)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (8 títulos duplicados ajustados em `maraba.json` + correção de encoding “Marabá”)
- **Por quê**: expandir cobertura orgânica no PA seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `295fed2` (repo `site`)
  - `src/_data/city_content/maraba.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (maraba habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `maraba` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Manaus (AM): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Manaus com sistema 100% GPT:
  - `/fretes-em-manaus/` (~3026 palavras)
  - `/mudancas-em-manaus/` (~3007 palavras)
  - `/frete-urgente-em-manaus/` (~3096 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - Bairros: 45 divididos em 3 blocos (15/15/15)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (3 títulos duplicados ajustados em `manaus.json` + normalização de depoimentos para 12/12/12)
- **Por quê**: expandir cobertura orgânica no AM seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `1d13b96` (repo `site`)
  - `src/_data/city_content/manaus.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (manaus habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `manaus` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Maceió (AL): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Maceió com sistema 100% GPT:
  - `/fretes-em-maceio/` (~3036 palavras)
  - `/mudancas-em-maceio/` (~2968 palavras)
  - `/frete-urgente-em-maceio/` (~3182 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - Bairros: 42 divididos em 3 blocos (14/14/14)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (5 títulos duplicados ajustados em `maceio.json` + correção de encoding “Maceió”)
- **Por quê**: expandir cobertura orgânica em AL seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `8a408df` (repo `site`)
  - `src/_data/city_content/maceio.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (maceio habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `maceio` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Macapá (AP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Macapá com sistema 100% GPT:
  - `/fretes-em-macapa/` (~3008 palavras)
  - `/mudancas-em-macapa/` (~2802 palavras)
  - `/frete-urgente-em-macapa/` (~3125 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - Bairros: 27 divididos em 3 blocos (9/9/9)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (5 títulos duplicados ajustados em `macapa.json` + correção de encoding “Macapá”)
- **Por quê**: expandir cobertura orgânica no AP seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `91c9727` (repo `site`)
  - `src/_data/city_content/macapa.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (macapa habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `macapa` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Londrina (PR): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Londrina com sistema 100% GPT:
  - `/fretes-em-londrina/` (~3077 palavras)
  - `/mudancas-em-londrina/` (~2791 palavras)
  - `/frete-urgente-em-londrina/` (~3077 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos (15/15/15)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (6 títulos duplicados ajustados em `londrina.json`)
- **Por quê**: próxima cidade publicada seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `1ef27ea` (repo `site`)
  - `src/_data/city_content/londrina.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (londrina habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `londrina` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Limeira (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Limeira com sistema 100% GPT:
  - `/fretes-em-limeira/` (~3147 palavras)
  - `/mudancas-em-limeira/` (~3000 palavras)
  - `/frete-urgente-em-limeira/` (~3135 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos (15/15/15)
  - Depoimentos: 35 (11/12/12 por tipo)
  - Validação anti-duplicação passou (4 títulos duplicados ajustados em `limeira.json`)
- **Por quê**: próxima cidade publicada seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `ab00bf6` (repo `site`)
  - `src/_data/city_content/limeira.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (limeira habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `limeira` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Jundiaí (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Jundiaí com sistema 100% GPT:
  - `/fretes-em-jundiai/` (~3146 palavras)
  - `/mudancas-em-jundiai/` (~3040 palavras)
  - `/frete-urgente-em-jundiai/` (~3244 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos (15/15/15)
  - Depoimentos: 36 (12 por tipo)
  - Validação anti-duplicação passou (3 títulos duplicados ajustados em `jundiai.json` + correção de encoding do nome da cidade)
- **Por quê**: próxima cidade publicada seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `ba7a583` (repo `site`)
  - `src/_data/city_content/jundiai.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (jundiai habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `jundiai` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SITE] Juiz de Fora (MG): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Juiz de Fora com sistema 100% GPT:
  - `/fretes-em-juiz-de-fora/` (~3000 palavras)
  - `/mudancas-em-juiz-de-fora/` (~2994 palavras)
  - `/frete-urgente-em-juiz-de-fora/` (~3151 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos (15/15/15)
  - Depoimentos: 35 (12/12/11 por tipo)
  - Validação anti-duplicação passou (4 títulos duplicados ajustados em `juiz-de-fora.json`)
- **Por quê**: próxima cidade publicada seguindo protocolo ultra enterprise (unicidade 100% + gates de qualidade).
- **Evidência**:
  - Commit: `be6d28b` (repo `site`)
  - `src/_data/city_content/juiz-de-fora.json`
  - `src/_data/neighborhoods.json`
  - `src/_data/testimonials.json`
  - `src/_data/publish_config.json` (juiz-de-fora habilitado em production)
- **Impacto**: +3 URLs indexáveis (via sitemap) para expansão de cobertura orgânica.
- **Rollback**: desabilitar `juiz-de-fora` no `publish_config.json` e fazer deploy.

---

#### 2026-02-09 — [SEO] Canonical host: forçar `www` (301) + link interno para `/cidades/` em todas as páginas

- **O que**:
  - Implementado redirect **301** de `https://fretesoumudancas.com.br/*` → `https://www.fretesoumudancas.com.br/*` (canonical host único).
  - Adicionado no rodapé global links internos: `/cidades/`, `/termos-de-uso.html`, `/politica-de-privacidade.html`.
- **Por quê**:
  - Evitar duplicidade (www vs sem www) que gera “cópia sem canônica” e atrasa consolidação no Google.
  - Melhorar descoberta/crawl (todas as páginas apontam para o hub e páginas legais).
- **Evidência**:
  - Commit: `a964c96` (repo `site`)
  - `.htaccess` (301 canonical host)
  - `src/_includes/base.njk` (rodapé com links)
- **Impacto**:
  - URLs sem `www` passam a redirecionar para `www` (sitemap e canonicals já usam `www`).
  - Site mais “enterprise” para o GSC (menos confusão de variantes).
- **Rollback**: reverter commit `a964c96`.

---

#### 2026-02-09 — [GSC] Início do controle de indexação manual (Inspeção de URL → Testar URL publicada → Solicitar indexação)

- **O que**: criado log canônico para registrar solicitações manuais no GSC.
- **Por quê**: evitar repetição e permitir continuidade perfeita entre GPTs/humanos.
- **Evidência**:
  - `docs/INDEXACAO_MANUAL_GSC.md`
- **Impacto**: operação mais controlada (3 URLs/dia sugerido no início).
- **Rollback**: não aplicável (documentação).

---

#### 2026-02-09 — [SEO] Sitemap corrigido: agora inclui todas as páginas de cidades publicadas (pagination)

- **O que**: corrigido `src/sitemap.xml.11ty.js` para gerar `sitemap.xml` a partir de `publishedCities` + `enabledTypes` (fonte canônica), em vez de `collections.all`.
- **Por quê**: com páginas geradas via pagination, o Eleventy não inclui todas as páginas paginadas em `collections.all` por padrão — o sitemap estava saindo com poucas URLs (ex.: só home + legais + 1ª cidade).
- **Evidência**:
  - Commit: `07033c5` (repo `site`)
  - `src/sitemap.xml.11ty.js`
  - `sitemap.xml` agora lista todas as URLs de cidades habilitadas
- **Impacto**: Google Search Console passa a descobrir muito mais URLs via sitemap; melhora cobertura de indexação.
- **Rollback**: reverter commit `07033c5`.

---

#### 2026-02-09 — [SITE] Juazeiro do Norte (CE): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Juazeiro do Norte com sistema 100% GPT:
  - `/fretes-em-juazeiro-do-norte/` (~2998 palavras)
  - `/mudancas-em-juazeiro-do-norte/` (~3091 palavras)
  - `/frete-urgente-em-juazeiro-do-norte/` (~3221 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 20 bairros divididos em 3 blocos únicos (6/7/7 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (2 títulos duplicados corrigidos manualmente)
- **Por quê**: trigésima segunda cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `4e42991` (repo `site`)
  - `src/_data/publish_config.json` (juazeiro-do-norte habilitado em production)
  - `src/_data/city_content/juazeiro-do-norte.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (20 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] Joinville (SC): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Joinville com sistema 100% GPT:
  - `/fretes-em-joinville/` (~3183 palavras)
  - `/mudancas-em-joinville/` (~3226 palavras)
  - `/frete-urgente-em-joinville/` (~3242 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 40 bairros divididos em 3 blocos únicos (13/13/14 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (5 títulos duplicados corrigidos manualmente)
- **Por quê**: trigésima primeira cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `d5dbb13` (repo `site`)
  - `src/_data/publish_config.json` (joinville habilitado em production)
  - `src/_data/city_content/joinville.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (40 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] João Pessoa (PB): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de João Pessoa com sistema 100% GPT:
  - `/fretes-em-joao-pessoa/` (~3081 palavras)
  - `/mudancas-em-joao-pessoa/` (~2947 palavras)
  - `/frete-urgente-em-joao-pessoa/` (~3213 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (2 títulos duplicados corrigidos manualmente)
- **Por quê**: trigésima cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `6588ce2` (repo `site`)
  - `src/_data/publish_config.json` (joao-pessoa habilitado em production)
  - `src/_data/city_content/joao-pessoa.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] Ipatinga (MG): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Ipatinga com sistema 100% GPT:
  - `/fretes-em-ipatinga/` (~3032 palavras)
  - `/mudancas-em-ipatinga/` (~2876 palavras)
  - `/frete-urgente-em-ipatinga/` (~3411 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 24 bairros divididos em 3 blocos únicos (8/8/8 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente + 1 reexecução por JSON inválido)
- **Por quê**: vigésima nona cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `a1fbd93` (repo `site`)
  - `src/_data/publish_config.json` (ipatinga habilitado em production)
  - `src/_data/city_content/ipatinga.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (24 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] Indaiatuba (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Indaiatuba com sistema 100% GPT:
  - `/fretes-em-indaiatuba/` (~3057 palavras)
  - `/mudancas-em-indaiatuba/` (~3039 palavras)
  - `/frete-urgente-em-indaiatuba/` (~3131 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima oitava cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `0f1f36c` (repo `site`)
  - `src/_data/publish_config.json` (indaiatuba habilitado em production)
  - `src/_data/city_content/indaiatuba.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] Imperatriz (MA): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Imperatriz com sistema 100% GPT:
  - `/fretes-em-imperatriz/` (~3072 palavras)
  - `/mudancas-em-imperatriz/` (~2922 palavras)
  - `/frete-urgente-em-imperatriz/` (~3387 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 10 bairros divididos em 3 blocos únicos (3/3/4 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (5 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima sétima cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `369b884` (repo `site`)
  - `src/_data/publish_config.json` (imperatriz habilitado em production)
  - `src/_data/city_content/imperatriz.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (10 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] Goiânia (GO): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Goiânia com sistema 100% GPT:
  - `/fretes-em-goiania/` (~3008 palavras)
  - `/mudancas-em-goiania/` (~3005 palavras)
  - `/frete-urgente-em-goiania/` (~3243 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (4 títulos duplicados corrigidos manualmente + correção de encoding do nome “Goiânia” no `city_content`)
- **Por quê**: vigésima sexta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `c4719b0` (repo `site`)
  - `src/_data/publish_config.json` (goiania habilitado em production)
  - `src/_data/city_content/goiania.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-09 — [SITE] Franca (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Franca com sistema 100% GPT:
  - `/fretes-em-franca/` (~3097 palavras)
  - `/mudancas-em-franca/` (~3035 palavras)
  - `/frete-urgente-em-franca/` (~3074 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 36 bairros divididos em 3 blocos únicos (12/12/12 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (6 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima quinta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `750c044` (repo `site`)
  - `src/_data/publish_config.json` (franca habilitado em production)
  - `src/_data/city_content/franca.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (36 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Foz do Iguaçu (PR): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Foz do Iguaçu com sistema 100% GPT:
  - `/fretes-em-foz-do-iguacu/` (~2906 palavras)
  - `/mudancas-em-foz-do-iguacu/` (~3187 palavras)
  - `/frete-urgente-em-foz-do-iguacu/` (~3368 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 32 bairros divididos em 3 blocos únicos (10/11/11 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (5 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima quarta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `90ef663` (repo `site`)
  - `src/_data/publish_config.json` (foz-do-iguacu habilitado em production)
  - `src/_data/city_content/foz-do-iguacu.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (32 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Fortaleza (CE): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Fortaleza com sistema 100% GPT:
  - `/fretes-em-fortaleza/` (~3213 palavras)
  - `/mudancas-em-fortaleza/` (~3047 palavras)
  - `/frete-urgente-em-fortaleza/` (~3194 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima terceira cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `52e35c8` (repo `site`)
  - `src/_data/publish_config.json` (fortaleza habilitado em production)
  - `src/_data/city_content/fortaleza.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Duque de Caxias (RJ): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Duque de Caxias com sistema 100% GPT:
  - `/fretes-em-duque-de-caxias/` (~3082 palavras)
  - `/mudancas-em-duque-de-caxias/` (~3005 palavras)
  - `/frete-urgente-em-duque-de-caxias/` (~3386 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 30 bairros divididos em 3 blocos únicos (10/10/10 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima segunda cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `5ed044d` (repo `site`)
  - `src/_data/publish_config.json` (duque-de-caxias habilitado em production)
  - `src/_data/city_content/duque-de-caxias.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (30 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Curitiba (PR): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Curitiba com sistema 100% GPT:
  - `/fretes-em-curitiba/` (~3229 palavras)
  - `/mudancas-em-curitiba/` (~2939 palavras)
  - `/frete-urgente-em-curitiba/` (~3298 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: vigésima primeira cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `4828ffd` (repo `site`)
  - `src/_data/publish_config.json` (curitiba habilitado em production)
  - `src/_data/city_content/curitiba.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Cuiabá (MT): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Cuiabá com sistema 100% GPT:
  - `/fretes-em-cuiaba/` (~2955 palavras)
  - `/mudancas-em-cuiaba/` (~3007 palavras)
  - `/frete-urgente-em-cuiaba/` (~3098 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (1 título duplicado corrigido manualmente)
- **Por quê**: vigésima cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `cfec3d4` (repo `site`)
  - `src/_data/publish_config.json` (cuiaba habilitado em production)
  - `src/_data/city_content/cuiaba.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Caxias do Sul (RS): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Caxias do Sul com sistema 100% GPT:
  - `/fretes-em-caxias-do-sul/` (~3164 palavras)
  - `/mudancas-em-caxias-do-sul/` (~3209 palavras)
  - `/frete-urgente-em-caxias-do-sul/` (~3475 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 33 bairros divididos em 3 blocos únicos (11/11/11 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (1 título duplicado corrigido manualmente)
- **Por quê**: décima nona cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `7c77ef9` (repo `site`)
  - `src/_data/publish_config.json` (caxias-do-sul habilitado em production)
  - `src/_data/city_content/caxias-do-sul.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (33 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Cascavel (PR): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Cascavel com sistema 100% GPT:
  - `/fretes-em-cascavel/` (~3028 palavras)
  - `/mudancas-em-cascavel/` (~2970 palavras)
  - `/frete-urgente-em-cascavel/` (~3329 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (1 título duplicado corrigido manualmente)
- **Por quê**: décima oitava cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `c8e06c1` (repo `site`)
  - `src/_data/publish_config.json` (cascavel habilitado em production)
  - `src/_data/city_content/cascavel.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Caruaru (PE): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Caruaru com sistema 100% GPT:
  - `/fretes-em-caruaru/` (~3013 palavras)
  - `/mudancas-em-caruaru/` (~2760 palavras)
  - `/frete-urgente-em-caruaru/` (~3320 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 19 bairros divididos em 3 blocos únicos (6/6/7 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: décima sétima cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `0f8a0e0` (repo `site`)
  - `src/_data/publish_config.json` (caruaru habilitado em production)
  - `src/_data/city_content/caruaru.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (19 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Campos dos Goytacazes (RJ): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Campos dos Goytacazes com sistema 100% GPT:
  - `/fretes-em-campos-dos-goytacazes/` (~3066 palavras)
  - `/mudancas-em-campos-dos-goytacazes/` (~3117 palavras)
  - `/frete-urgente-em-campos-dos-goytacazes/` (~3402 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 38 bairros divididos em 3 blocos únicos (12/13/13 por página)
  - 35 depoimentos (12/12/11 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (1 título duplicado corrigido manualmente)
- **Por quê**: décima sexta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `91f18c9` (repo `site`)
  - `src/_data/publish_config.json` (campos-dos-goytacazes habilitado em production)
  - `src/_data/city_content/campos-dos-goytacazes.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (38 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Campo Grande (MS): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Campo Grande com sistema 100% GPT:
  - `/fretes-em-campo-grande/` (~2934 palavras)
  - `/mudancas-em-campo-grande/` (~2830 palavras)
  - `/frete-urgente-em-campo-grande/` (~3441 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 39 bairros divididos em 3 blocos únicos (13/13/13 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: décima quinta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `1a57d09` (repo `site`)
  - `src/_data/publish_config.json` (campo-grande habilitado em production)
  - `src/_data/city_content/campo-grande.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (39 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Campinas (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Campinas com sistema 100% GPT:
  - `/fretes-em-campinas/` (~2906 palavras)
  - `/mudancas-em-campinas/` (~2933 palavras)
  - `/frete-urgente-em-campinas/` (~3308 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (2 títulos duplicados corrigidos manualmente)
- **Por quê**: décima quarta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `e5bdc70` (repo `site`)
  - `src/_data/publish_config.json` (campinas habilitado em production)
  - `src/_data/city_content/campinas.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Campina Grande (PB): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Campina Grande com sistema 100% GPT:
  - `/fretes-em-campina-grande/` (~3036 palavras)
  - `/mudancas-em-campina-grande/` (~2848 palavras)
  - `/frete-urgente-em-campina-grande/` (~3341 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 36 bairros divididos em 3 blocos únicos (12/12/12 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: décima terceira cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `c3e7144` (repo `site`)
  - `src/_data/publish_config.json` (campina-grande habilitado em production)
  - `src/_data/city_content/campina-grande.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (36 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Brasília (DF): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Brasília com sistema 100% GPT:
  - `/fretes-em-brasilia/` (~2756 palavras)
  - `/mudancas-em-brasilia/` (~2740 palavras)
  - `/frete-urgente-em-brasilia/` (~3249 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 34 bairros divididos em 3 blocos únicos (11/11/12 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (1 título duplicado corrigido manualmente)
- **Por quê**: décima segunda cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `05feb85` (repo `site`)
  - `src/_data/publish_config.json` (brasilia habilitado em production)
  - `src/_data/city_content/brasilia.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (34 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Boa Vista (RR): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Boa Vista com sistema 100% GPT:
  - `/fretes-em-boa-vista/` (~3117 palavras)
  - `/mudancas-em-boa-vista/` (~3090 palavras)
  - `/frete-urgente-em-boa-vista/` (~3123 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 31 bairros divididos em 3 blocos únicos (10/10/11 por página)
  - 35 depoimentos (12/12/11 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (1 título duplicado corrigido manualmente)
- **Por quê**: décima primeira cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `96819b0` (repo `site`)
  - `src/_data/publish_config.json` (boa-vista habilitado em production)
  - `src/_data/city_content/boa-vista.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (31 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Blumenau (SC): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Blumenau com sistema 100% GPT:
  - `/fretes-em-blumenau/` (~2903 palavras)
  - `/mudancas-em-blumenau/` (~2985 palavras)
  - `/frete-urgente-em-blumenau/` (~3290 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 33 bairros divididos em 3 blocos únicos (11/11/11 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (sem duplicações detectadas)
- **Por quê**: décima cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `b80cfea` (repo `site`)
  - `src/_data/publish_config.json` (blumenau habilitado em production)
  - `src/_data/city_content/blumenau.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (33 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Belo Horizonte (MG): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Belo Horizonte com sistema 100% GPT:
  - `/fretes-em-belo-horizonte/` (~2963 palavras)
  - `/mudancas-em-belo-horizonte/` (~3197 palavras)
  - `/frete-urgente-em-belo-horizonte/` (~3150 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15/15/15 por página)
  - 35 depoimentos (11/12/12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (2 títulos duplicados corrigidos manualmente)
- **Por quê**: nona cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `e840571` (repo `site`)
  - `src/_data/publish_config.json` (belo-horizonte habilitado em production)
  - `src/_data/city_content/belo-horizonte.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (35 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Belém (PA): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Belém com sistema 100% GPT:
  - `/fretes-em-belem/` (~3159 palavras)
  - `/mudancas-em-belem/` (~2961 palavras)
  - `/frete-urgente-em-belem/` (~3347 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 33 bairros divididos em 3 blocos únicos (11/11/11 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (3 títulos duplicados corrigidos manualmente)
- **Por quê**: oitava cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `243dbb5` (repo `site`)
  - `src/_data/publish_config.json` (belem habilitado em production)
  - `src/_data/city_content/belem.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (33 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Bauru (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Bauru com sistema 100% GPT:
  - `/fretes-em-bauru/` (~2809 palavras)
  - `/mudancas-em-bauru/` (~2745 palavras)
  - `/frete-urgente-em-bauru/` (~3235 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 34 bairros divididos em 3 blocos únicos (11/11/12 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (títulos/descrições únicos, sem duplicação com outras cidades)
- **Por quê**: sétima cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `d6e6faa` (repo `site`)
  - `src/_data/publish_config.json` (bauru habilitado em production)
  - `src/_data/city_content/bauru.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (34 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Anápolis (GO): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Anápolis com sistema 100% GPT:
  - `/fretes-em-anapolis/` (~2829 palavras)
  - `/mudancas-em-anapolis/` (~2861 palavras)
  - `/frete-urgente-em-anapolis/` (~3286 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 20 bairros divididos em 3 blocos únicos (6/7/7 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (títulos/descrições únicos, sem duplicação com outras cidades)
- **Por quê**: quarta cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `9f5d375` (repo `site`)
  - `src/_data/publish_config.json` (anapolis habilitado em production)
  - `src/_data/city_content/anapolis.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (20 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Porto Alegre (RS): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Porto Alegre com sistema 100% GPT:
  - `/fretes-em-porto-alegre/` (~3028 palavras)
  - `/mudancas-em-porto-alegre/` (~3009 palavras)
  - `/frete-urgente-em-porto-alegre/` (~3355 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (títulos/descrições únicos, sem duplicação com outras cidades)
- **Por quê**: terceira cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `3236f25` (repo `site`)
  - `src/_data/publish_config.json` (porto-alegre habilitado em production)
  - `src/_data/city_content/porto-alegre.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `3236f25` ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] São Paulo (SP): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de São Paulo com sistema 100% GPT:
  - `/fretes-em-sao-paulo/` (~3187 palavras)
  - `/mudancas-em-sao-paulo/` (~3256 palavras)
  - `/frete-urgente-em-sao-paulo/` (~3409 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (títulos/descrições únicos, sem duplicação com Florianópolis)
- **Por quê**: segunda cidade publicada com sistema 100% GPT. Conteúdo 100% único e exclusivo, sem duplicações.
- **Evidência**:
  - Commit: `2f15ea0` (repo `site`)
  - `src/_data/publish_config.json` (sao-paulo habilitado em production)
  - `src/_data/city_content/sao-paulo.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Florianópolis (SC): 3 páginas publicadas em production (sistema 100% GPT)

- **O que**: criadas e publicadas as 3 páginas de Florianópolis com sistema 100% GPT:
  - `/fretes-em-florianopolis/` (~3038 palavras)
  - `/mudancas-em-florianopolis/` (~2964 palavras)
  - `/frete-urgente-em-florianopolis/` (~3178 palavras)
  - Conteúdo GPT 100% único: `sectionTitles`, `sectionDescriptions`, `demands`, `whenYes`, `whenNo`, `common`, `types`, `services`, `checklist`
  - 45 bairros divididos em 3 blocos únicos (15 por página)
  - 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
  - Validação anti-duplicação passou (títulos/descrições únicos)
- **Por quê**: primeira cidade publicada com sistema 100% GPT e anti-duplicação implementado. Conteúdo 100% único e exclusivo.
- **Evidência**:
  - Commit: `ef0b51d` (repo `site`)
  - `src/_data/publish_config.json` (florianopolis habilitado em production)
  - `src/_data/city_content/florianopolis.json` (conteúdo GPT com todas as seções)
  - `src/_data/neighborhoods.json` (45 bairros divididos em 3 blocos)
  - `src/_data/testimonials.json` (36 depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `ef0b51d` ou desabilitar cidade no `publish_config.json`.

---

#### 2026-02-06 — [SITE] Limpeza completa: Florianópolis e São Paulo removidas

- **O que**: remoção completa de todas as páginas de Florianópolis e São Paulo:
  - Cidades removidas do `publish_config.json` (modo `draft`, lista vazia)
  - Arquivos `city_content` deletados (florianopolis.json, sao-paulo.json)
  - `neighborhoods.json` limpo (vazio)
  - `testimonials.json` limpo (vazio)
  - Todas as páginas HTML removidas do ar (não indexáveis)
  - Sistema limpo e pronto para produção real
- **Por quê**: começar produção real do zero, com sistema 100% GPT e anti-duplicação implementado. Florianópolis e São Paulo foram testes e identificaram duplicações que foram corrigidas.
- **Evidência**:
  - Commit: `bb57735` (repo `site`)
  - `src/_data/publish_config.json` (modo draft, enabledCitySlugs vazio)
  - `src/_data/city_content/` (arquivos deletados)
  - `src/_data/neighborhoods.json` (vazio)
  - `src/_data/testimonials.json` (vazio)
- **Impacto**: 
  - Páginas removidas do ar (não indexáveis)
  - Sistema pronto para criar cidades novas com conteúdo 100% único
  - **Nota**: dados de acesso/cliques no CT (menu Site) precisam ser limpos manualmente no projeto `conveniente`
- **Rollback**: reverter commit `bb57735` (não recomendado; sistema foi limpo intencionalmente).

---

#### 2026-02-05 — [SITE] Sistema 100% GPT + Anti-duplicação (ultra enterprise)

- **O que**: implementado sistema de conteúdo 100% GPT com validação anti-duplicação:
  - Removidos todos os templates hardcoded (demands, whenYes, whenNo, common, types, services, checklist)
  - GPT agora gera TODAS as seções: títulos únicos (`sectionTitles`), descrições únicas (`sectionDescriptions`), listas únicas
  - `validate.js` detecta duplicações de títulos/descrições e **FALHA em production**
  - Em `production`, conteúdo GPT é **obrigatório** (sem fallback)
  - Regeneração necessária: Florianópolis e São Paulo precisam ser regeneradas com conteúdo 100% único
- **Por quê**: garantir 100% de unicidade entre páginas de diferentes cidades, evitando penalização SEO por conteúdo duplicado. Alinhar com objetivo "ultra enterprise melhor do mundo".
- **Evidência**:
  - `C:\site\scripts\generate_city_content_openai.js` (GPT gera sectionTitles, sectionDescriptions, demands, whenYes, whenNo, common, types, services, checklist)
  - `C:\site\src\pages\frete-urgente-em.11ty.js` (templates hardcoded removidos, validação GPT obrigatória)
  - `C:\site\src\pages\fretes-em.11ty.js` (templates hardcoded removidos, validação GPT obrigatória)
  - `C:\site\src\pages\mudancas-em.11ty.js` (templates hardcoded removidos, validação GPT obrigatória)
  - `C:\site\scripts\validate.js` (gate anti-duplicação de títulos/descrições)
  - `C:\site\docs\ANALISE_DUPLICACOES_SEO.md` (análise completa das duplicações identificadas)
- **Impacto**: 
  - Páginas futuras já nascem 100% únicas
  - Páginas existentes (Florianópolis e São Paulo) precisam ser regeneradas
  - Validação automática previne duplicações antes do deploy
- **Rollback**: reverter commits desta mudança (não recomendado; compromete qualidade SEO).

---

#### 2026-02-05 — [SITE] São Paulo (SP): 3 páginas publicadas em production

- **O que**: criadas e publicadas as 3 páginas de São Paulo:
  - `/fretes-em-sao-paulo/` (~2560 palavras)
  - `/mudancas-em-sao-paulo/` (~2773 palavras)
  - `/frete-urgente-em-sao-paulo/` (~2704 palavras)
  - Conteúdo GPT gerado, 45 bairros divididos em 3 blocos, 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
- **Por quê**: segunda cidade publicada seguindo o protocolo enterprise completo.
- **Evidência**:
  - Commit: `15492be` (repo `site`)
  - `src/_data/publish_config.json` (sao-paulo habilitado em production)
  - `src/_data/city_content/sao-paulo.json` (conteúdo GPT)
  - `src/_data/neighborhoods.json` (bairros atualizados)
  - `src/_data/testimonials.json` (depoimentos atualizados)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `15492be` ou desabilitar cidade no `publish_config.json`.

#### 2026-02-05 — [SITE] Protocolo enterprise: criação automática de páginas (criar → validar → commit → push → avisar)

- **O que**: estabelecido protocolo ultra enterprise para criação de páginas de cidade:
  - Comando único: `npm run city:publish` gera tudo (conteúdo GPT, bairros, depoimentos, habilita production)
  - Commit + push automático (sem perguntar ao humano)
  - Atualização automática de documentação (LIVRO + TIMELINE)
  - Aviso claro ao humano: "Pronto para próxima cidade"
- **Por quê**: garantir que qualquer GPT consiga criar páginas de forma consistente, sem deixar pendências, sem perder tempo.
- **Evidência**:
  - `C:\site\docs\RUNBOOK_TECNICO.md` (seção "Workflow canônico: Criar páginas da cidade X")
  - `C:\site\scripts\city_publish.js` (orquestra tudo)
- **Impacto**: processo 100% automatizado; humano só precisa pedir "criar páginas da cidade X".
- **Rollback**: reverter commits e voltar ao processo manual (não recomendado).

#### 2026-02-05 — [SITE] Florianópolis (SC): 3 páginas publicadas em production

- **O que**: criadas e publicadas as 3 páginas de Florianópolis:
  - `/fretes-em-florianopolis/` (~2877 palavras)
  - `/mudancas-em-florianopolis/`
  - `/frete-urgente-em-florianopolis/`
  - Conteúdo GPT gerado, 45 bairros divididos em 3 blocos, 36 depoimentos (12 por tipo)
  - Modo `production` ativado para indexação
- **Por quê**: primeira cidade publicada seguindo o protocolo enterprise completo.
- **Evidência**:
  - Commit: `3719b35` (repo `site`)
  - `src/_data/publish_config.json` (florianopolis habilitado em production)
  - `src/_data/city_content/florianopolis.json` (conteúdo GPT)
  - `src/_data/neighborhoods.json` (bairros)
  - `src/_data/testimonials.json` (depoimentos)
- **Impacto**: páginas indexáveis no Google; deploy automático via webhook GitHub → Hostinger.
- **Rollback**: reverter commit `3719b35` ou desabilitar cidade no `publish_config.json`.

#### 2026-02-05 — [SITE] WhatsApp: todos os CTAs garantidos com mensagem pré-preenchida (topo + dock)

- **O que**: corrigidos os CTAs de WhatsApp que abriam sem mensagem automática no **topo** e no **dock inferior**.
- **Por quê**: conversão/UX; nenhum botão pode “parecer quebrado” e a mensagem deve estar sempre pronta.
- **Evidência**:
  - `C:\site\src\_includes\base.njk` (topbar/dock com `?text=` e “fiação” de CTA independente do tracking)
  - commit do repo `site`: `7fe6edf`
- **Impacto**: todos os botões/atalhos WA abrem `wa.me` com `?text=` (mensagem pré-preenchida).
- **Rollback**: reverter o commit `7fe6edf` no repo do site.

#### 2026-02-05 — [SITE] Bairros: geração assistida + divisão em 3 blocos (~15 por página)

- **O que**:
  - Criado `src/_data/neighborhoods.json` como fonte canônica (conteúdo estático).
  - Criado comando local `npm run neighborhoods:fetch` que consulta OpenAI, normaliza/deduplica e divide em 3 blocos (fretes/mudanças/urgente).
  - Páginas passaram a consumir blocos por tipo para reduzir repetição entre URLs.
- **Por quê**: manter conteúdo local (bairros) sem virar spam; e garantir diferenciação entre as 3 páginas da mesma cidade.
- **Evidência**:
  - `C:\site\scripts\fetch_neighborhoods_openai.js`
  - `C:\site\src\_data\neighborhoods.json`
  - `C:\site\src\_data\neighborhoods.js`
  - `C:\site\src\pages\fretes-em.11ty.js`, `mudancas-em.11ty.js`, `frete-urgente-em.11ty.js`
- **Impacto**: cada página mostra ~15 bairros diferentes (quando disponíveis).
- **Rollback**: reverter commits e voltar a usar lista fixa/única (não recomendado).

#### 2026-02-05 — [SITE] Depoimentos: geração assistida + 3–7 por página

- **O que**:
  - Adicionado comando local `npm run testimonials:generate` para preparar depoimentos de clientes e salvar em `src/_data/testimonials.json`.
  - Páginas passaram a exibir **3–7** depoimentos (determinístico por cidade+tipo) com o título **“Depoimentos”**.
- **Por quê**: prova social com depoimentos de clientes; linguagem humana.
- **Evidência**:
  - `C:\site\scripts\generate_testimonials_openai.js`
  - `C:\site\src\pages\fretes-em.11ty.js`, `mudancas-em.11ty.js`, `frete-urgente-em.11ty.js`
  - `C:\site\docs\DEPOIMENTOS.md`
- **Impacto**: em `production`, validate continua exigindo >=3 e bloqueando duplicados; em `draft` pode ficar vazio sem travar.
- **Rollback**: reverter commit do repo “sem depoimentos” `site`.

#### 2026-02-05 — [SITE] Google Search Console verificado (DNS TXT)

- **O que**: propriedade do domínio `fretesoumudancas.com.br` foi verificada no Google Search Console via registro TXT (DNS).
- **Por quê**: habilitar controle/visibilidade de indexação, cobertura e alertas técnicos do Google.
- **Evidência**: verificação concluída no GSC (método DNS TXT).
- **Próximo passo**: enviar `sitemap.xml` no GSC (1 vez) e manter rollout `draft → production` conforme playbook.
- **Rollback**: remover o TXT do DNS (não recomendado; só se precisar trocar de conta).

#### 2026-02-05 — [SITE] GSC: sitemap enviado + ajuste do robots em draft para permitir fetch do sitemap

- **O que**:
  - Sitemap enviado no GSC: `https://www.fretesoumudancas.com.br/sitemap.xml`
  - Em `draft`, `robots.txt` ganhou allowlist para o GSC buscar o sitemap: `Allow: /sitemap.xml` e `Allow: /robots.txt`
- **Por quê**: manter anti-queima (sem indexação) e ainda permitir que o GSC valide/consuma o sitemap.
- **Evidência**:
  - `https://www.fretesoumudancas.com.br/robots.txt` (Allowlist)
  - `https://www.fretesoumudancas.com.br/sitemap.xml` (HTTP 200)
- **Rollback**: reverter commit do repo `site`.

#### 2026-02-05 — [SITE] Webhook do GitHub configurado e validado (push → deploy automático)

- **O que**: webhook do Hostinger foi configurado no GitHub para disparar deploy automático a cada `push` no branch `main`.
- **Por quê**: eliminar deploy manual (“Implantar”) e reduzir risco operacional.
- **Evidência**: atualização automática de arquivos públicos após `git push` (ex.: `robots.txt`).
- **Rollback**: desativar/remover o webhook no GitHub.

#### 2026-02-05 — [SITE] Hostinger Git Deploy conectado (public_html zerado → site no ar)

- **O que**: Git Deploy do Hostinger foi configurado apontando para o repositório do site (branch `main`) com `public_html` vazio.
- **Por quê**: centralizar 100% do conteúdo do domínio no Git (deploy automático via `git push`).
- **Evidência (produção)**:
  - `curl.exe -I https://www.fretesoumudancas.com.br/` → `HTTP/1.1 200 OK`
  - `curl.exe -I https://www.fretesoumudancas.com.br/cidades/` → `HTTP/1.1 200 OK`
  - `https://www.fretesoumudancas.com.br/robots.txt` gerado pelo modo atual (`draft`).
  - `https://www.fretesoumudancas.com.br/site_manifest.json` disponível para o CT.
- **Impacto**: qualquer commit/push do repo publica no Hostinger automaticamente.
- **Rollback**: desativar Git Deploy no hPanel ou reverter commits (git revert) e fazer push.

#### 2026-02-05 — [SITE] Home legado (autoatendimento) ajustada para mobile-first (viewport/teclado)

- **O que**: ajustes de CSS/JS na home legado (`/`) para estabilizar altura em mobile (iOS/Android) e evitar bugs do `100vh` com barras/teclado.
- **Por quê**: melhorar UX mobile-first sem alterar o fluxo do autoatendimento (conversão e confiança).
- **Evidência**: `C:\site\src\index.njk` (uso de `--vh` via `visualViewport`).
- **Rollback**: reverter commit do repo `site`.

#### 2026-02-05 — [SITE] CTA WhatsApp real + métricas (pageview + clique) integradas ao CT

- **O que**:
  - CTA WhatsApp passou a gerar link real `wa.me` por tipo (fretes/mudanças/urgente) com texto pré-preenchido por cidade.
  - Telemetria adicionada (sem bloquear navegação): `pageview` + `whatsapp_click` via `sendBeacon`.
  - Manifest público do site criado (`/site_manifest.json`) para o CT listar cidades no ar e links oficiais.
- **Por quê**: aumentar conversão e medir engajamento com controle enterprise (quantos acessos e quantos cliques WhatsApp por cidade/página).
- **Evidência**:
  - `C:\site\src/_data/site.json` (WhatsApp + trackingEndpoint)
  - `C:\site\src/_includes/base.njk` (beacon)
  - `C:\site\src/site_manifest.json.11ty.js`
  - (CT) `C:\sitechatbot\convenientetecnologia/index.js` e `C:\sitechatbot\convenientetecnologia/public/site.html`
- **Impacto**:
  - Em `production`, o `npm run validate` falha se WhatsApp/tracking não estiverem configurados.
  - Métricas ficam em `C:\sitechatbot\dados\site_metrics.json`.
- **Rollback**: reverter commit do repo `site` e remover rotas `/api/site/*` do CT se necessário.

#### 2026-02-05 — [SITE] Preservar auto atendimento no domínio principal (home legado) + hub SEO em `/cidades/`

- **O que**:
  - A home (`/`) passou a publicar o **auto atendimento legado** (para não quebrar clientes existentes).
  - A lista/hub de cidades e páginas oficiais ficou em: `/cidades/`.
- **Por quê**: manter o fluxo antigo funcionando enquanto o novo rollout SEO é feito de forma incremental e segura.
- **Evidência**:
  - `C:\site\src\index.njk` (home legado)
  - `C:\site\src\cidades.njk` (hub)
  - `C:\site\docs\RUNBOOK_TECNICO.md` (regra canônica de deploy)
- **Impacto**: o Git Deploy no Hostinger pode apontar para `public_html` sem apagar o auto atendimento (ele está dentro do build).
- **Rollback**: reverter commits do repo `site` e republicar versão anterior.

#### 2026-02-05 — [SITE] Páginas legais (política/termos) dentro do Git + gate de palavras só para páginas de cidade

- **O que**:
  - Criadas páginas canônicas:
    - `/politica-de-privacidade.html`
    - `/termos-de-uso.html`
  - Ajustado o `validate` para aplicar o gate de **>=1200 palavras em production** somente em páginas de cidade (fretes/mudanças/urgente).
- **Por quê**: manter conformidade e não travar produção por páginas institucionais curtas.
- **Evidência**:
  - `C:\site\src\politica-de-privacidade.njk`
  - `C:\site\src\termos-de-uso.njk`
  - `C:\site\scripts\validate.js`
- **Rollback**: reverter commit do repo `site`.

#### 2026-02-05 — [SITE] Hostinger Git Deploy compatível (webroot na raiz + `.htaccess` de proteção)

- **O que**:
  - Criado `npm run deploy:prepare` que faz: build → validate → copia `dist/*` para a **raiz do repo** (webroot).
  - Adicionado `.htaccess` bloqueando acesso público a `src/`, `docs/`, `scripts/`, `dist/` e arquivos internos.
- **Por quê**: o Git Deploy da Hostinger clona o repo inteiro no `public_html` e não executa build — então precisamos de `index.html` na raiz e proteção do conteúdo interno.
- **Evidência**:
  - `C:\site\scripts\deploy_root.js`
  - `C:\site\.htaccess`
  - `C:\site\docs\RUNBOOK_TECNICO.md`
- **Rollback**: reverter commit do repo `site` (remove webroot sync e `.htaccess`).

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

