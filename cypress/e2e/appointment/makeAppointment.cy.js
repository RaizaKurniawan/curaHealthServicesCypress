// Appointment Test Suite   

describe('Cura Health Services Appointment Tests', () => {
    beforeEach(() => {
        cy.login(); // Menggunakan custom command untuk login
    });

    // Perbaikan menggunakan environment variable untuk menghindari hardcoding
    const facility = Cypress.env('facility');
    const healthProgram = Cypress.env('healthProgram');

    facility.forEach((facility) => {
        healthProgram.forEach((healthProgram) => {
            it(`MKA-0001 - Make an appointment at ${facility} with ${healthProgram}`, () => {
                cy.get('select#combo_facility').select(facility);
                cy.get('input#chk_hospotal_readmission').check();
                cy.get(`input#radio_program_${healthProgram}`).check();
                cy.get('input#txt_visit_date').type('2023-10-01').click();
                cy.get('textarea#txt_comment').click({force:true}).type('This is a test appointment.');
                cy.get('button[type="submit"]').click();

                // Verifikasi untuk appointment confirmation
                cy.contains('h2', 'Appointment Confirmation').should('contain', 'Appointment Confirmation');
            });

            it('MKA-0002 - Logout after making an appointment', () => {

                cy.get('select#combo_facility').select('Hongkong CURA Healthcare Center');
                cy.get('input#chk_hospotal_readmission').check();
                cy.get('input#radio_program_medicare').check();
                cy.get('input#txt_visit_date').type('2023-10-01').click();
                cy.get('textarea#txt_comment').click({force:true}).type('This is a test appointment.');
                cy.get('button[type="submit"]').click();

                cy.contains('h2', 'Appointment Confirmation').should('contain', 'Appointment Confirmation');

                cy.get('i.fa-bars').click();
                cy.get('a[href="authenticate.php?logout"]').click();
                cy.get('h1').should('contain', 'CURA Healthcare Service');
            });

        });
    });
});

    
    // it('MKA-0001 - Succesully make an appointment', () => {
    //     //cy.get('select#combo_facility').select('Hongkong CURA Healthcare Center');
    //     cy.get('select#combo_facility').select(Cypress.env(1)); // Use environment variable or default to first option');
    //     cy.get('input#chk_hospotal_readmission').check();
    //     cy.get('input#radio_program_medicare').check();
    //     cy.get('input#txt_visit_date').type('2023-10-01').click();
    //     cy.get('textarea#txt_comment').click({force:true}).type('This is a test appointment.');
    //     cy.get('button[type="submit"]').click();

    //     // Verify the appointment confirmation
    //      cy.contains('h2', 'Appointment Confirmation').should('contain', 'Appointment Confirmation');
       

    // });

