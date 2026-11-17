# Validação da automação

## Resultado confirmado — 17/11/2026

Execução realizada localmente por André Junior, com resultado revisado a partir do resumo original do terminal.

- Total: **8 testes**, todos aprovados.
- Falhas: **0**. Pendentes: **0**. Ignorados: **0**.
- Arquivos: carrinho (1), checkout (4), login (3).
- Duração consolidada: aproximadamente **7 segundos**.
- Ambiente informado nas evidências: Cypress 16.3.0, Chrome 147 headless e Node.js 22.23.1 em Linux.

Resultado transcrito do resumo do terminal fornecido por André. A imagem original foi revisada durante a validação.

[Vídeo de login](login.cy.js.mp4) · [Vídeo de checkout](<checkout.cy.js (2).mp4>)

Não foi fornecido vídeo do carrinho. O resultado desse cenário está no resumo consolidado. Os vídeos podem terminar antes de o contador visual atualizar; use o resumo do terminal para comprovar o encerramento e os totais.

## Falha investigada e correção

Na primeira tentativa, o checkout falhou no `beforeEach`: o card de Sauce Labs Backpack foi encontrado, mas o seletor exato `[data-test="add-to-cart"]` não encontrou o botão. Como a preparação falhou, os cenários seguintes foram ignorados; isso não significava quatro defeitos nas regras de checkout.

A correção localiza o botão pelo texto exato, dentro do card do produto escolhido:

```js
cy.contains('[data-test="inventory-item"]', 'Sauce Labs Backpack')
  .contains('button', /^Add to cart$/).click();
```

A mudança foi aplicada no checkout e no carrinho. Em seguida, a execução completa terminou com oito cenários aprovados. A dependência do texto em inglês é uma escolha explícita neste projeto de demonstração.

## Limites da evidência

Os resultados são uma execução pontual sobre o SauceDemo, que pode mudar. A confirmação visual de compra não comprova pagamento, estoque ou persistência em backend. CI deve ser avaliada separadamente na aba Actions.
