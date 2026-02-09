### Indexação manual (Google Search Console) — Controle canônico

Objetivo: manter controle “ultra enterprise” do que já foi feito manualmente no GSC (Inspeção de URL → **Testar URL publicada** → **Solicitar indexação**), evitando repetição e permitindo que qualquer GPT continue do ponto certo.

Importante:

- **Isso não garante indexação** — apenas coloca a URL na fila/priority do Google.
- Não “spammar” centenas de solicitações: melhor enviar poucas por dia, bem escolhidas.
- Sempre usar a URL **canônica** (neste projeto: **com `www`**).
- Se uma URL estiver com `N/D` em “canônico / rastreamento”, significa **ainda não rastreou** (normal em site novo).

URL canônica do sitemap: `https://www.fretesoumudancas.com.br/sitemap.xml`

---

## Workflow padrão (humano)

Para cada URL escolhida:

1. Abra **GSC → Inspeção de URL**
2. Cole a URL (sempre `https://www...`)
3. Clique **Testar URL publicada**
4. Se aprovado, clique **Solicitar indexação**
5. Registre aqui (linha nova)

---

## Controle (log)

Colunas:

- Data (BRT)
- Cidade
- Tipo (`fretes` | `mudancas` | `urgente` | `hub` | `legal` | `home`)
- URL
- Status (ex.: “testado OK + solicitado”)
- Observações (opcional)

| Data (BRT) | Cidade | Tipo | URL | Status | Observações |
|---|---|---|---|---|---|
| 2026-02-09 | Anápolis (GO) | fretes | https://www.fretesoumudancas.com.br/fretes-em-anapolis/ | Testar URL publicada OK → Solicitar indexação (fila) | GSC: “URL disponível para o Google” + “Indexação solicitada” |

---

## Política de cadência (sugestão ultra enterprise)

- **Dia a dia (site novo)**: 3 URLs/dia (bem escolhidas).
- **Quando começar a indexar em lote**: reduzir solicitações manuais e deixar o sitemap trabalhar.
- Priorizar:
  - 1 URL `fretes` + 1 URL `mudancas` + 1 URL `urgente` (mesma cidade) **ou**
  - 3 URLs de cidades diferentes (diversificar sinais)

