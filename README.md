# Automação de compra com Cypress

Projeto de estudo para o portfólio de **André Junior**, QA Pleno.

## Objetivo

Verificar o fluxo de autenticação, carrinho e checkout da aplicação pública [SauceDemo](https://www.saucedemo.com/), mantida pela Sauce Labs para demonstração. A conclusão do checkout é uma simulação: não há cobrança, pagamento ou entrega real. Usamos apenas usuários públicos de demonstração e dados fictícios.

## Resultado da execução

Em 17/11/2026, os **8 cenários passaram**, sem falhas, pendências ou cenários ignorados, em aproximadamente **7 segundos**, conforme o resumo de execução local fornecido por André.

| Arquivo | Cenários | Aprovados |
| --- | ---: | ---: |
| `login.cy.js` | 3 | 3 |
| `carrinho.cy.js` | 1 | 1 |
| `checkout.cy.js` | 4 | 4 |

[Registro do resultado](VALIDACAO.md) · [Vídeo de login](login.cy.js.mp4) · [Vídeo de checkout](<checkout.cy.js (2).mp4>)

Os vídeos acompanham a execução; o resumo do terminal é a evidência do resultado consolidado. Não foi fornecido vídeo do cenário de carrinho.

## Executar no seu computador

Pré-requisito: Node.js com npm compatível com Cypress 16.3.0. Execução local comprovada com Node.js 22.23.1, Cypress 16.3.0 e Chrome 147; o arquivo `.nvmrc` sugere Node.js 24 para novas instalações. No Linux, o Cypress também depende das bibliotecas de sistema descritas em sua [documentação de instalação](https://docs.cypress.io/app/get-started/install-cypress).

1. Clone este repositório ou extraia o ZIP e abra um terminal na pasta do projeto.
2. Instale as dependências:

```bash
npm ci
```

3. Abra o Cypress para acompanhar os testes no navegador:

```bash
npm run test:open
```

Selecione **E2E Testing**, escolha um navegador e abra `checkout.cy.js`. Para começar pelo caminho feliz, execute o cenário **CT07** pela interface.

Para executar todos os testes sem a interface do Cypress:

```bash
npm test
```

Para executar somente os quatro cenários de checkout:

```bash
npm run test:checkout
```

## Cobertura e riscos

| ID | Cenário | Risco tratado |
| --- | --- | --- |
| CT01 | Login válido e catálogo | Usuário válido não consegue comprar |
| CT02 | Senha inválida | Acesso indevido |
| CT03 | Usuário bloqueado | Bloqueio de acesso ignorado |
| CT04 | Adicionar dois produtos e remover um | Carrinho altera o produto errado ou a quantidade |
| CT05 | Nome, sobrenome e código postal obrigatórios | Checkout avança sem informações necessárias |
| CT06 | Produtos, quantidades, subtotal, imposto e total | Pedido com itens ou cobrança incorretos |
| CT07 | Compra simulada e limpeza do carrinho | Checkout falha ou mantém itens já comprados |
| CT08 | Cancelamento do checkout | Usuário perde o carrinho ao voltar |

## Decisões de teste

- Seletores `data-test` para reduzir dependência de classes visuais. Exceção: o botão `Add to cart` é localizado por texto exato dentro do card do produto, após o seletor anterior falhar no ambiente do usuário.
- Cada teste começa independente, sem depender da execução anterior.
- Login pela interface neste primeiro projeto: a autenticação faz parte do aprendizado e da cobertura. Uma evolução futura pode usar uma sessão validada para reduzir repetição.
- Nenhuma espera fixa nem supressão global de erros da aplicação. Os comandos aguardam as condições verificadas.
- CT06 usa um resultado esperado explícito: mochila de US$ 29,99, lanterna de US$ 9,99, subtotal de US$ 39,98, imposto de US$ 3,20 e total de US$ 43,18. Esses valores são da demo, não uma regra fiscal geral. Se o catálogo mudar, investigar a alteração antes de atualizar o teste.
- CT05 verifica as três validações obrigatórias em sequência dentro de um único cenário; os demais cenários são independentes.
- `retries: 0`: a primeira versão expõe falhas para investigação, sem ocultá-las com repetições automáticas.

## Estrutura

```text
cypress/e2e/login.cy.js       — autenticação
cypress/e2e/carrinho.cy.js    — inclusão e remoção
cypress/e2e/checkout.cy.js    — validação, valores e conclusão
cypress/support/e2e.js       — ações reutilizadas
.github/workflows/e2e.yml    — execução no GitHub Actions
VALIDACAO.md                — resultado real da validação
```

## Evidências e integração contínua

O Cypress salva vídeos das execuções e capturas de tela quando um teste falha. O workflow incluído roda em pushes, pull requests e disparos manuais. Guarda os arquivos como artefatos por sete dias. O workflow requer GitHub Actions habilitado e não exige Cypress Cloud. O resultado local acima é independente das futuras execuções de CI; consulte a aba Actions para o estado atual da integração.

## Limites

Este projeto cobre interface de uma aplicação de terceiros, cuja disponibilidade e conteúdo podem mudar. Não cobre pagamento real, backend de pedidos, estoque, acessibilidade, carga ou segurança. Uma confirmação visual de compra não comprova persistência em backend.

Não há dados, código ou credenciais de empregadores neste projeto. O projeto é independente, sem vínculo com a Sauce Labs.

## Como apresentar no portfólio

Explique o risco escolhido, mostre o teste e uma evidência de execução, e conte como investigaria uma falha. Publique apenas resultados realmente executados. A implementação e o aprendizado devem ser revisados e compreendidos por quem apresenta o projeto.

## Próximo exercício

Leia o CT07, acompanhe cada comando na execução e explique o que faria o teste falhar. Depois acrescente um cenário para remover todos os produtos e verificar que o indicador do carrinho desaparece.
