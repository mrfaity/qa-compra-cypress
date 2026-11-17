describe('Checkout de demonstração', () => {
  beforeEach(() => {
    // Cada cenário começa com uma sessão e carrinho independentes.
    cy.loginDemo();
    cy.contains('[data-test="inventory-item"]', 'Sauce Labs Backpack')
      .contains('button', /^Add to cart$/).click();
    cy.contains('[data-test="inventory-item"]', 'Sauce Labs Bike Light')
      .contains('button', /^Add to cart$/).click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
  });

  it('CT05 - exige nome, sobrenome e código postal antes de avançar', () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'First Name is required');
    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('Pessoa');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'Last Name is required');
    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.get('[data-test="lastName"]').type('Teste');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'Postal Code is required');
    cy.location('pathname').should('eq', '/checkout-step-one.html');
  });

  it('CT06 - mantém os produtos e apresenta os valores esperados', () => {
    cy.preencherEntregaDemo();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    // Oráculo explícito: valores conhecidos dos produtos padrão desta demo.
    cy.contains('[data-test="inventory-item"]', 'Sauce Labs Backpack').within(() => {
      cy.get('[data-test="inventory-item-price"]').should('have.text', '$29.99');
      cy.get('[data-test="item-quantity"]').should('have.text', '1');
    });
    cy.contains('[data-test="inventory-item"]', 'Sauce Labs Bike Light').within(() => {
      cy.get('[data-test="inventory-item-price"]').should('have.text', '$9.99');
      cy.get('[data-test="item-quantity"]').should('have.text', '1');
    });
    cy.get('[data-test="subtotal-label"]').should('have.text', 'Item total: $39.98');
    cy.get('[data-test="tax-label"]').should('have.text', 'Tax: $3.20');
    cy.get('[data-test="total-label"]').should('have.text', 'Total: $43.18');
  });

  it('CT07 - conclui a compra simulada e esvazia o carrinho', () => {
    cy.preencherEntregaDemo();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.location('pathname').should('eq', '/checkout-complete.html');
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('[data-test="back-to-products"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item"]').should('not.exist');
  });

  it('CT08 - cancela o checkout e preserva os produtos no carrinho', () => {
    cy.get('[data-test="cancel"]').click();
    cy.location('pathname').should('eq', '/cart.html');
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.get('[data-test="inventory-item-name"]').should('contain.text', 'Sauce Labs Backpack')
      .and('contain.text', 'Sauce Labs Bike Light');
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
  });
});
