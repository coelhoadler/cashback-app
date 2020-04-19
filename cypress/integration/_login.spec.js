/// <reference types="cypress" />

describe('Cashback App - Tela de login', () => {

  const baseData = require('../fixtures/base.data');
  const loginData = require('../fixtures/login.data');

  beforeEach(() => {
    cy.visit(baseData.url);
    cy.get('#email').type(loginData.wrongData.email);
    cy.get('#password').type(loginData.wrongData.senha);
  });

  it('Deve mostrar o mensagem de usuário inválido', () => {
    cy.get('#formLogin').click();
    cy.get('.alert').should('be.visible');
  });

  it('Deve ir para o dashboard', () => {
    cy.get('#email').clear().type(loginData.rightData.email);
    cy.get('#password').clear().type(loginData.rightData.senha);
    cy.get('#formLogin').click();
    cy.url().should('include', `${baseData.url}/dashboard.html`);
  });

  it('Deve retornar para o login', () => {
    cy.visit(`${baseData.url}/dashboard.html`);
    cy.url().should('include', baseData.url);
  });

});
