### Depoimentos (prova social) — SITE (CANÔNICO)

Objetivo: adicionar prova social nas páginas **sem vazar PII** e sem inventar fatos.

---

## Regra de integridade (obrigatória)

- Depoimentos devem ser **reais** e enviados por você (coletados com motoristas/clientes).
- **Proibido**: telefone, sobrenome, endereço, CPF, placa, prints com dados pessoais.
- Identidade: usar apenas **primeiro nome** ou **inicial** (ex.: “João”, “M.”) + cidade/UF (opcional).

---

## Unicidade (SEO)

- Não precisa ser 100% único por página, mas **é melhor variar**.
- Padrão:
  - cada página usa **3 depoimentos**
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

## Formato de envio (humano -> GPT)

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

