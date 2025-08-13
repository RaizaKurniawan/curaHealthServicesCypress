// Login Test Cases for Cura Health Services

describe('Cura Health Services Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('i.fa-bars').click();
    cy.get('a[href="profile.php#login"]').click();
  });

    it('TCL-0001 - should show the login page', () => {
        cy.url().should('include', '/profile.php#login');
        cy.get('h2').should('contain', 'Login');

    });

    it('TCL-0002 - Login with valid credentials', () => {

        // Menggunakan invoke untuk mengambil nilai dari input yang sudah ada
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

    });
  
    it('TCL-0003 - Login with invalid credentials', () => {
        cy.get('input#txt-username').type(Cypress.env('invalidUsername'));
        cy.get('input#txt-password').type(Cypress.env('invalidPassword'));
        cy.get('button[type="submit"]').click();
        
        // Verifikasi bahwa pesan error muncul
        cy.get('p').should('contain', 'Login failed! Please ensure the username and password are valid.');
        
    });

    it('TCL-0004 - All fields are required', () => {
        cy.get('button[type="submit"]').click();
        
        // Verifikasi bahwa pesan error muncul
        cy.get('p').should('contain', 'Login failed! Please ensure the username and password are valid.');
    });

    it('TCL-0005 - Login with empty username', () => {
        cy.getTheUsername();
       
        cy.get('button[type="submit"]').click();
        
        // Verifikasi bahwa pesan error muncul
        cy.get('p').should('contain', 'Login failed! Please ensure the username and password are valid.');
    }); 

    it('TCL-0006 - Login with empty password', () => {
        cy.getThePassword();
        cy.get('button[type="submit"]').click();
        
        // Verifikasi bahwa pesan error muncul
        cy.get('p').should('contain', 'Login failed! Please ensure the username and password are valid.');
    });


});