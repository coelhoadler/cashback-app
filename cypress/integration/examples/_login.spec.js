/// <reference types="cypress" />

describe('Cashback App - Tela de login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('#email').type('adler@teste');
    cy.get('#password').type('123');
  });

  it('Deve mostrar o mensagem de usuário inváido', () => {
    cy.get('#formLogin').click();
    cy.get('#email').type('adler@teste');
    cy.get('#password').type('123');
    cy.get('.alert').should('be.visible');
  });

  it('Limpa o formulário e aperta no botão para fazer login', () => {
    cy.get('#email').clear();
    cy.get('#password').clear();
    cy.get('#formLogin').click();
    cy.get('.alert').should('be.visible');
  });

  it('Deve retornar para o login', () => {
    cy.visit('http://localhost:4200/dashboard.html');
    cy.url().should('include', 'http://localhost:4200/')
  });

});
