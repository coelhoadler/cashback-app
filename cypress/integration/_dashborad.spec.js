/// <reference types="cypress" />

describe('Cashback App - Tela de dashboard', () => {

  const baseData = require('../fixtures/base.data');
  const loginData = require('../fixtures/login.data');

  beforeEach(() => {
    cy.visit(baseData.url);
    cy.get('#email').type(loginData.rightData.email);
    cy.get('#password').type(loginData.rightData.senha);
    cy.get('#formLogin').click();
  });

  it('Deve ir para a rota do dashboard', () => {
    cy.url().should('include', `${baseData.url}/dashboard.html`);
  });

  it('Deve conter nome do revendedor logado no navbar', () => {
    const firstName =
    cy.get('#currentUserName').invoke('text').should('equals', loginData.rightData.primeiroNome);
  });

  it('Deve retornar para o login', () => {
    cy.get('#navbar-logout').click();
    cy.url().should('include', baseData.url);
  });

});
