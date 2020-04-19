/// <reference types="cypress" />

describe('Cashback App - Tela de cadastro', () => {

  const baseData = require('../fixtures/base.data');
  const cadastroData = require('../fixtures/cadastro.data');

  beforeEach(() => {
    cy.visit(`${baseData.url}/cadastro.html`);
  });

  it('Deve mostrar o alert de sobrenome', () => {
    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Entre com um sobrenome!')
    });
  });

  it('Deve mostrar o alert de E-mail', () => {
    cy.get('#nameInput').type(cadastroData.nome);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Entre com um e-mail!')
    });
  });

  it('Deve mostrar o alert de CPF', () => {
    cy.get('#nameInput').type(cadastroData.nome);
    cy.get('#emailInput').type(cadastroData.email);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Entre com um CPF!')
    });
  });

  it('Deve mostrar o alert de senha', () => {
    cy.get('#nameInput').type(cadastroData.nome);
    cy.get('#emailInput').type(cadastroData.email);
    cy.get('#documentInput').type(cadastroData.document);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Digite a senha!')
    });
  });

  it('Deve mostrar o alert de senhas diferentes', () => {
    cy.get('#nameInput').type(cadastroData.nome);
    cy.get('#emailInput').type(cadastroData.email);
    cy.get('#documentInput').type(cadastroData.document);
    cy.get('#passwordInput').type(cadastroData.senha);
    cy.get('#passwordConfirmInput').type(cadastroData.senhaDiff);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('As senhas estão diferentes!')
    });
  });

  it('Deve mostrar o alert de cadastro efetuado com sucesso', () => {
    cy.get('#nameInput').type(cadastroData.nome);
    cy.get('#emailInput').type(cadastroData.email);
    cy.get('#documentInput').type(cadastroData.document);
    cy.get('#passwordInput').type(cadastroData.senha);
    cy.get('#passwordConfirmInput').type(cadastroData.senha);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      cy.wait(3000)
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Cadastro realizado com sucesso!')
    });
  });

  it('Deve deletar o usuário cadastrado', () => {
    cy.request('DELETE', `${baseData.server}/cypress/adler.coelho.santos@test.com/MTIzNDU2`)
      .should((response) => {
        expect(response.status).to.eq(200)
      })
  });

});
