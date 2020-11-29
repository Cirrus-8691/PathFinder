describe('Test find path', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Set values 4 / 2 and go', () => {
        cy.get("input#from").invoke('attr', 'value', 4);
        cy.get("input#to").invoke('attr', 'value', 2);
        cy.get("button#go").click();
        // --- click change page
        cy.get("li#path").contains("4 => 1 => 3 => 2");
    });

    it('Set values 4 / 2 and go', () => {
        cy.get("input#from").invoke('attr', 'value', 4);
        cy.get("input#to").invoke('attr', 'value', 0);
        cy.get("input#by").invoke('attr', 'value', 'co');
        cy.get("button#go").click();
        // --- click change page
        cy.get("li#path").contains("4 => 1 => 3 => 0");
    });
  })