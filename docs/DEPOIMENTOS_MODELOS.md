## Modelos de depoimentos — SITE (CANÔNICO)

Objetivo: você usar estes modelos como **roteiro** para pedir/receber depoimentos reais dos motoristas/clientes, mantendo:

- **sem PII** (nada de telefone, sobrenome, endereço completo, placa, CPF)
- **claros e úteis**
- **naturais** (parece humano, não “texto de marketing”)
- **com variação** (para evitar duplicidade)

> Importante: estes são **modelos com placeholders**. No modo atual do projeto, o site exibe a seção **"Depoimentos"** — use estes modelos como roteiro canônico para depoimentos reais de clientes.

---

### Checklist do “depoimento perfeito”

- 1 frase sobre **o problema** (o que precisava transportar / mudança / urgência)
- 1 frase sobre **como foi o atendimento** (rápido, comunicação, pontualidade)
- 1 frase sobre **o resultado** (chegou inteiro, sem stress, no prazo)
- 1 detalhe concreto **sem expor dados** (ex.: “subida de escada”, “horário apertado”, “chuva”, “muito volume”)
- assinatura simples: **Primeiro nome ou inicial** (ex.: “João”, “M.”)

Tamanho ideal: **180–320 caracteres** (curto, escaneável).

---

## 10 modelos (use como roteiro)

### 1) Fretes — curto e direto
> "Precisei de um frete em {CIDADE} e foi tudo bem rápido. Combinaram pelo WhatsApp, chegaram no horário e levaram com cuidado. Recomendo." — {NOME}

### 2) Fretes — com detalhe concreto (sem PII)
> "Fiz um frete em {CIDADE} com alguns móveis e caixas. Mesmo com {DETALHE} eles foram super cuidadosos e organizados. Chegou tudo certinho." — {INICIAL}

### 3) Fretes — foco em comunicação (alta conversão)
> "O atendimento no WhatsApp foi muito claro e objetivo. Em {CIDADE} combinaram tudo rapidinho e o frete saiu sem dor de cabeça. Ótima experiência." — {NOME}

### 4) Mudanças — cuidado com móveis
> "Minha mudança em {CIDADE} foi tranquila. A equipe teve cuidado com os móveis e ajudou a organizar a logística. Chegou tudo sem avarias." — {INICIAL}

### 5) Mudanças — prazo apertado + solução
> "Eu estava com prazo apertado para mudar em {CIDADE}. Responderam rápido, organizaram o horário e fizeram a mudança sem correria e sem stress. Excelente." — {NOME}

### 6) Mudanças — experiência “do início ao fim”
> "Do primeiro contato até a entrega, foi tudo muito bem conduzido. Minha mudança em {CIDADE} foi pontual, cuidadosa e com boa comunicação. Recomendo." — {INICIAL}

### 7) Urgente — “hoje/agora” (sem URL extra, mas pode no texto)
> "Precisei de frete urgente em {CIDADE} e conseguiram atender ainda hoje. Chegaram rápido, foram práticos e resolveram. Salvou meu dia." — {NOME}

### 8) Urgente — imprevisto + resposta
> "Tive um imprevisto e precisava transportar {ITEM} com urgência em {CIDADE}. O atendimento foi imediato e a execução foi rápida e cuidadosa. Muito bom." — {INICIAL}

### 9) Urgente — foco em pontualidade
> "Era um frete urgente em {CIDADE} e eu precisava que fosse no horário certo. Foram pontuais e cuidadosos, e deu tudo certo no final." — {NOME}

### 10) “Geral do tipo” (fallback) — sem cidade (quando necessário)
> "Atendimento rápido, comunicação fácil e cuidado com os itens. Já usei mais de uma vez e sempre foi uma boa experiência." — {INICIAL}

---

## Anti-duplicidade (regra prática)

- Evite frases “genéricas” iguais. Troque:
  - o **detalhe concreto** (chuva, escada, horário, volume, acesso)
  - o **objeto** (caixas, geladeira, sofá, equipamento, etc.)
  - a forma de elogio (rápido/pontual/cuidadoso/organizado)
- Antes de publicar em `production`, rode:

```bash
npm run audit:testimonials
```

Ele gera `docs/AUDITORIA_DEPOIMENTOS.md` e aponta duplicados.

