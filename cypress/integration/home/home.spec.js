describe('/Home tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
    })

    it('home loads correctly', () => {
        cy.get('h1').should('have.text', '...EASYBLOG...')
        cy.get('a.btn').first().should('have.text', 'START READING')
        cy.get('a.btn').last().should('have.text', 'START WRITING')
    })
})
