describe('Carrinho', () => {
  it('CT04 - adiciona dois produtos e remove somente o escolhido', () => {
    cy.loginDemo();
    cy.contains('[data-test="inventory-item"]', 'Sauce Labs Backpack')
      .contains('button', /^Add to cart$/).click();
    cy.contains('[data-test="inventory-item"]', 'Sauce Labs Bike Light')
      .contains('button', /^Add to cart$/).click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item"]').should('have.length', 2);
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    cy.get('[data-test="inventory-item"]').should('have.length', 1)
      .and('contain.text', 'Sauce Labs Bike Light')
      .and('not.contain.text', 'Sauce Labs Backpack');
  });
});
