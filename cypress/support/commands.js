// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',()=>{
    cy.visit('/');
    cy.get('i.fa-bars').click();
    cy.get('a[href="profile.php#login"]').click();

    cy.get('input[value="John Doe"]')
        .invoke('val')
        .then((value) => {
            const username = value;
            cy.get('input#txt-username').type(username);
        });
    cy.get('input[value="ThisIsNotAPassword"]')
        .invoke('val')
        .then((value)=> {
            const password = value;
            cy.get('input#txt-password').type(password);

        });
    
    cy.get('button[type="submit"]').click();
    cy.get('h2').should('contain', 'Make Appointment');

})