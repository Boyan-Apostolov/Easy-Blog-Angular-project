describe('/Auth/Login tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    })

    it('login form loads correctly', () => {
        cy.contains('Login').click();

        cy.get('h2').should('have.length', 1)
        cy.get('input').should('have.length', 2)
        cy.get('button').should('have.length', 2)
    })

    it('login form shows error messages on required fields', () => {
        cy.contains('Login').click();

        cy.get('input[type=email]').click();
        cy.get('input[type=password]').click();
        cy.get('i').click();

        cy.get('div.validation-error').first()
            .should('have.text', 'Email is required! ');
        cy.get('div.validation-error').last()
            .should('have.text', 'Password is required! ');
    })

    it('login should login the user', () => {
        cy.contains('Login').click();

        cy.get('input[type=email]').type('test-email@gmail.com');
        cy.get('input[type=password]').type('123456');

        cy.contains('Log In').click();

        cy.contains('Start Writing').should('exist'); //Articles have loaded
        cy.contains('Open Discussion').should('exist'); //Articles have loaded
        cy.contains('Leaderboard').should('exist'); //Articles have loaded
        cy.contains('Bookmarks').should('exist'); //Articles have loaded


    })
})
