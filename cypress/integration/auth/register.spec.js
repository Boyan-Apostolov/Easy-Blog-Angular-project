describe('/Auth/Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    })

    it('register form loads correctly', () => {
        cy.contains('Register').click();

        cy.get('h2').should('have.length', 1)
        cy.get('input').should('have.length', 5)
        cy.get('button').should('have.length', 1)
    })

    it('register form shows error messages on required fields', () => {
        cy.contains('Register').click();

        cy.get('input[type=text]').click();
        cy.get('input[type=email]').click();
        cy.get('input[type=password]').first().click();
        cy.get('input[type=password]').last().click();
        cy.get('textarea').click();

        cy.get('i').click();

        cy.contains('Username is required! ').should('have.class', 'validation-error');
        cy.contains('Email is required! ').should('have.class', 'validation-error');
        cy.contains('Password is required! ').should('have.class', 'validation-error');
        cy.contains('Confirm Password is required! ').should('have.class', 'validation-error');
        cy.contains('Bio is required! ').should('have.class', 'validation-error');

        cy.get('input[type=email]').type('test');
        cy.contains('Email is invalid!').should('have.class', 'validation-error');

        cy.get('input[type=password]').first().type('12345');
        cy.contains('Password needs to be at least 6 characters!').should('have.class', 'validation-error');

        cy.get('input[type=password]').last().type('12345');
        cy.contains('Confirm Password needs to be at least 6 characters!').should('have.class', 'validation-error');

        cy.get('input[type=password]').first().type('123456');
        cy.get('input[type=password]').last().type('654321');
        cy.contains('Passwords do not match!').should('have.class', 'validation-error');


        cy.get('button').should('be.disabled')
    })

    it('register sends correct data', () => {
        cy.contains('Register').click();

        cy.get('input[type=text]').type('Test-Username');
        cy.get('input[type=email]').type('test-email@gmail.com');
        cy.get('input[type=password]').first().type('123456');
        cy.get('input[type=password]').last().type('123456');
        cy.get('textarea').type('This is just a test!');

        const fixtureFile = 'photo.png';
        cy.get('input[type=file]').attachFile(fixtureFile);

        cy.contains('Username is required! ').should('not.exist');
        cy.contains('Email is required! ').should('not.exist');
        cy.contains('Password is required! ').should('not.exist');
        cy.contains('Confirm Password is required! ').should('not.exist');
        cy.contains('Bio is required! ').should('not.exist');

        cy.get('button').should('not.be.disabled')
    })
})
