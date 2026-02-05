### Depoimentos (prova social) — SITE (CANÔNICO)

Objetivo: adicionar prova social nas páginas **sem vazar PII** e com transparência.

---

## Regra de integridade (obrigatória)

- **Modo atual do projeto**: depoimentos **sintéticos** (gerados) e **explicitamente rotulados** como “Depoimentos sintéticos” nas páginas.
- Regra: nunca apresentar um depoimento sintético como se fosse real.
- Quando você começar a coletar depoimentos reais, é só substituir/mesclar no JSON (mesmo schema).
- **Proibido**: telefone, sobrenome, endereço, CPF, placa, prints com dados pessoais.
- Identidade: usar apenas **primeiro nome** ou **inicial** (ex.: “João”, “M.”) + cidade/UF (opcional).

Observação de copy:

- Depoimento precisa soar humano (mensagem curta), sem marketing robótico e sem exageros (“sempre”, “garantido”, “o melhor”, etc.).

---

## Unicidade (SEO)

- Não precisa ser 100% único por página, mas **é melhor variar**.
- Padrão:
  - cada página usa **3–7 depoimentos** (determinístico por cidade+tipo)
  - preferir depoimentos marcados para a **cidade** e para o **tipo** (fretes/mudanças/urgente)
  - se faltar, usar fallback “geral do tipo”

---

## Gate (obrigatório em production)

- Em `publish.mode = "production"`, o `npm run validate` **falha** se alguma página de cidade tiver **<3 depoimentos**.
- Onde isso é aplicado:
  - render: `src/pages/*.11ty.js` (bloco `data-ct="testimonials"` + cards `data-ct-testimonial="1"`)
  - validação: `scripts/validate.js`

---

## Onde fica no projeto

- Fonte: `src/_data/testimonials.json`
- Seleção automática: `src/_data/testimonials.js`
- Modelos (estrutura/copy): `docs/DEPOIMENTOS_MODELOS.md`
- Auditoria/registro humano (gerado): `docs/AUDITORIA_DEPOIMENTOS.md` (rodar `npm run audit:testimonials`)

---

## Geração assistida (sintético) — comando canônico

Pré-requisito:

- `OPENAI_API_KEY` em `local.env` (arquivo ignorado pelo Git)

Comando (rode 3 vezes por cidade — um por tipo):

- Fretes:
  - `npm run testimonials:generate -- --city "Florianópolis" --slug florianopolis --type fretes --count 12`
- Mudanças:
  - `npm run testimonials:generate -- --city "Florianópolis" --slug florianopolis --type mudancas --count 12`
- Urgente:
  - `npm run testimonials:generate -- --city "Florianópolis" --slug florianopolis --type urgente --count 12`

Notas:

- O script deduplica globalmente por fingerprint do texto (evita repetição no site).
- Por padrão, ele substitui (replace) os sintéticos daquela cidade+tipo para manter controle.

---

## Formato de envio (humano -> GPT) — quando for REAL

Você me manda assim (um bloco por cidade):

```text
CIDADE: Florianópolis
SLUG (se souber): florianopolis

FRETES:
- "texto do depoimento..." — NomeInicial (opcional: mês/ano)
- "texto..." — NomeInicial
- "texto..." — NomeInicial

MUDANÇAS:
- ...

URGENTE:
- ...
```

Eu converto para o JSON e o site passa a exibir automaticamente.

