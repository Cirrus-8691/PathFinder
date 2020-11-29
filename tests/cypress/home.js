describe('Test home page', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('Find trail', () => {
        cy.contains("Find path from 0 to 4 by km")
            .should('have.attr', 'href', './findPath?from=0&to=4&by=km')
    });
    it('Find input-from', () => {
        cy.get("#input-from")
    });
  /*
    it('Finds the partner 01 Conseil', () => {
      cy.contains('01-Conseil')
        .should('have.attr', 'href', 'https://www.01conseils.com/')
    })
  
    it('Finds the partner Digital-it', () => {
      cy.contains('Digital-It')
        .should('have.attr', 'href', 'https://www.digital-it.fr/')
    })
  
    it('Finds the partner Alyra', () => {
      cy.contains('Alyra')
        .should('have.attr', 'href', 'https://alyra.fr/')
    })
  
    it('Finds the partner Bechain', () => {
      cy.contains('Bechain')
        .should('have.attr', 'href', 'https://www.bechainsc.com/')
    })
  
    it('Test navigation bar', () => {
      cy.get('#responsive-navbar-nav')
    })
  
    it('Test text zone Partners', () => {
      cy.get("h1")
        .should("have.text", "Partners")
    })
  
    it('Test Footer', () => {
      cy.get("footer").contains("Legal notice")
        .should('have.attr', 'href', '/LegalNotice')
    })
    */
  })