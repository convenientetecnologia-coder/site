## MODELO ULTRA ENTERPRISE DE PÁGINAS (PADRÃO DEFINITIVO)

**Regra mestra**: uma página = uma intenção principal. Todo o resto é suporte.

### Tipos de páginas permitidas (oficiais)

Para cada cidade, somente:

- `/fretes-em-{cidade}`
- `/mudancas-em-{cidade}`
- `/frete-urgente-em-{cidade}`

Qualquer variação fora disso **não** deve ser criada.

### Regras absolutas (sem exceção)

- Não criar URLs com: `agora`, `já`, `hoje`, `24h` (urgência fica no texto/título).
- Não repetir texto entre cidades.
- Conteúdo mínimo: 600–1.200 palavras.
- Bairros citados no corpo (não como URL).
- CTA WhatsApp funcionando.

### Observação (implementação)

O gerador deve produzir variações **determinísticas** por cidade (não random) para evitar mudanças de conteúdo a cada build.

