/// <reference types="cypress" />

context('Navigation', () => {
  it("cy.go() - go back or forward in the browser's history", () => {
    cy.visit('http://localhost:3000')
  })
})
