/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // it("can navigate between home, women's and men's pages", () => {
  //   cy.get('#women-link').click()
  //   cy.contains('dresses')
  //   cy.get('#men-link').click()
  //   cy.contains('shirts')
  //   cy.get('#home-link').click()
  //   cy.contains("latest women's")
  // })

  it('can navigate to a product', () => {
    cy.visit('/women/catalog')

    // cy.contains('dresses')
    // cy.get('#men-link').click()
    // cy.contains('shirts')
    // cy.get('#home-link').click()
    // cy.contains("latest women's")
  })
})
