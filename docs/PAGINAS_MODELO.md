## MODELO ULTRA ENTERPRISE DE PÁGINAS (PADRÃO DEFINITIVO)

**Regra mestra**: uma página = uma intenção principal. Todo o resto é suporte.

### Objetivo (anti-spam / anti-queima)

Escalar para centenas de páginas **sem queimar o domínio**. Isso exige:

- conteúdo realmente útil (não “página vazia”),
- conteúdo **único por página**,
- rollout controlado (não publicar 200 rascunhos de uma vez),
- checklist + validação automática antes de entrar em produção.

### Garantias (controle automático)

Antes de qualquer cidade entrar em `production`, o `npm run validate` garante:

- `title` e `h1` **não duplicam**
- conteúdo mínimo **>= 1200 palavras** (em production)
- **anti-página-igual**: fingerprint do texto visível **não pode repetir**
- **depoimentos**: 3 por página e **sem texto duplicado** (em production)

### Tipos de páginas permitidas (oficiais)

Para cada cidade, somente:

- `/fretes-em-{cidade}`
- `/mudancas-em-{cidade}`
- `/frete-urgente-em-{cidade}`

Qualquer variação fora disso **não** deve ser criada.

### Regras absolutas (sem exceção)

- Não criar URLs com: `agora`, `já`, `hoje`, `24h` (urgência fica no texto/título).
- Não repetir texto entre cidades (anti-spam).
- Conteúdo alvo: **~1500 palavras** (mínimo recomendado: **1200**).
- Bairros citados no corpo (não como URL).
- CTA WhatsApp funcionando.
- **Padrão canônico: sem imagens** nas páginas de cidade (mais rápido, mais limpo, sem “cara de produto”). Se um dia usar imagens, só reais e otimizadas.
- **CTA WhatsApp**: todo botão/atalho deve abrir com **mensagem pré-preenchida** (`wa.me` + `?text=`).

### Bairros (padrão definitivo)

- **Não** listar “todos os bairros” (vira spam e piora leitura).
- Alvo por página: **~15 bairros/regiões** (curto, humano, representativo) + “e demais bairros”.
- Para cada cidade, a lista canônica é dividida em 3 blocos (para evitar repetição entre as 3 URLs):
  - `fretes`: bloco A
  - `mudancas`: bloco B
  - `urgente`: bloco C
- Fonte de verdade: `src/_data/neighborhoods.json`.

### Estrutura obrigatória (por tipo)

#### 1) `/fretes-em-{cidade}` (pilar)
- Abertura (intenção clara: o que/onde/rapidez).
- Tipos de frete (pequeno/médio/grande/local/intermunicipal ou interestadual quando fizer sentido).
- Urgência integrada (texto; sem URL extra).
- Serviços complementares (mudanças/carreto como suporte).
- Bairros/regiões atendidas (sem virar URL).
- CTA WhatsApp (botão + texto de urgência).
- FAQ (3–6 perguntas com variação por cidade).

#### 2) `/frete-urgente-em-{cidade}` (alta conversão)
- Abertura focada em urgência.
- Termos de urgência no texto (agora/hoje/imediato/24h) **sem criar URL**.
- Tipos de demanda urgente (residencial/comercial/transporte rápido).
- Cobertura (bairros/regiões).
- CTA agressivo.
- FAQ curto.

#### 3) `/mudancas-em-{cidade}`
- Mesma lógica do frete, com intenção principal “mudança”.
- Fretes entram como suporte.
- CTA + FAQ.

### Prova social (regra de integridade)

**Não apresentar depoimento como real quando não for.** Isso é risco legal e de confiança.

Opções seguras:

- Se tiver provas reais: usar frases curtas (sem PII) e registrar origem (interno).
- Se ainda não tiver: usar **depoimentos de clientes** na seção "Depoimentos" com linguagem humana (sem marketing robótico, sem citar IA no texto).

### Observação (implementação)

O gerador deve produzir variações **determinísticas** por cidade (não random) para evitar mudanças de conteúdo a cada build.

### Rollout seguro (CANÔNICO)

Antes de conectar no Hostinger e liberar indexação:

- publicar 1 cidade (3 páginas) perfeita
- validar visualmente (humano)
- liberar mais cidades em lotes (ex.: 3 cidades/dia = 9 páginas/dia) e ajustar conforme confiança


