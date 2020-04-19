/// <reference types="cypress" />

describe('Cashback App - Viewport', () => {

  const baseData = require('../fixtures/base.data');

  beforeEach(() => {
    cy.visit(baseData.url);
  });

  it('Testando diversas resolucões da página de Login', () => {
    cy.viewport(320, 480);
    cy.wait(200);
    cy.viewport(1366, 768);
    cy.wait(200);
    cy.viewport('macbook-15');
    cy.wait(200);
    cy.viewport('macbook-13');
    cy.wait(200);
    cy.viewport('macbook-11');
    cy.wait(200);
    cy.viewport('ipad-2');
    cy.wait(200);
    cy.viewport('ipad-mini');
    cy.wait(200);
    cy.viewport('iphone-6+');
    cy.wait(200);
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.viewport('iphone-5');
    cy.wait(200);
    cy.viewport('iphone-4');
    cy.wait(200);
    cy.viewport('iphone-3');
    cy.wait(200);

    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200);
  });

});
