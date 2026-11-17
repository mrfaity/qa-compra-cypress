// Credenciais públicas da aplicação de demonstração, sem dados pessoais reais.
Cypress.Commands.add('loginDemo', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password, { log: false });
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('preencherEntregaDemo', () => {
  cy.get('[data-test="firstName"]').type('Pessoa');
  cy.get('[data-test="lastName"]').type('Teste');
  cy.get('[data-test="postalCode"]').type('00000-000');
});
