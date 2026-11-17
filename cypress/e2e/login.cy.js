describe('Autenticação', () => {
  it('CT01 - permite login com usuário válido', () => {
    cy.loginDemo();
    cy.location('pathname').should('eq', '/inventory.html');
    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.get('[data-test="inventory-item"]').should('have.length', 6);
  });

  it('CT02 - rejeita senha inválida sem abrir o catálogo', () => {
    cy.loginDemo('standard_user', 'senha_incorreta');
    cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match');
    cy.location('pathname').should('eq', '/');
    cy.get('[data-test="inventory-container"]').should('not.exist');
  });

  it('CT03 - impede acesso de usuário bloqueado', () => {
    cy.loginDemo('locked_out_user');
    cy.get('[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.');
    cy.location('pathname').should('eq', '/');
  });
});
