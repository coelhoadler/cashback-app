/// <reference types="cypress" />

describe('Cashback App - Tela de cadastro', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/cadastro.html');
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
    cy.get('#nameInput').type('Adler Coelho Santos Test');

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Entre com um e-mail!')
    });
  });

  it('Deve mostrar o alert de CPF', () => {
    cy.get('#nameInput').type('Adler Coelho Santos Test');
    cy.get('#emailInput').type(`adler.santos@${new Date().getTime()}.com`);

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Entre com um CPF!')
    });
  });

  it('Deve mostrar o alert de senha', () => {
    cy.get('#nameInput').type('Adler Coelho Santos Test');
    cy.get('#emailInput').type(`adler.santos@${new Date().getTime()}.com`);
    cy.get('#documentInput').type(new Date().getTime());

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Digite a senha!')
    });
  });

  it('Deve mostrar o alert de senhas diferentes', () => {
    cy.get('#nameInput').type('Adler Coelho Santos Test');
    cy.get('#emailInput').type(`adler.santos@${new Date().getTime()}.com`);
    cy.get('#documentInput').type(new Date().getTime());
    cy.get('#passwordInput').type('123456');
    cy.get('#passwordConfirmInput').type('123');

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('As senhas  estão diferentes!')
    });
  });

  it('Deve mostrar o alert de cadastro efetuado com sucesso', () => {
    cy.get('#nameInput').type('Adler Coelho Santos Test');
    cy.get('#emailInput').type(`adler.santos@${new Date().getTime()}.com`);
    cy.get('#documentInput').type(new Date().getTime());
    cy.get('#passwordInput').type('123456');
    cy.get('#passwordConfirmInput').type('123456');

    const stub = cy.stub()
    cy.on ('window:alert', stub)
    cy
      .get('#newSeller').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Cadastro realizado com sucesso!')
    });
  });

});
