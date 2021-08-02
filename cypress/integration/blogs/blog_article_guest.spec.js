describe('/blogs guest tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/blogs/all');
    })

    it('spinner shows on loading', () => {
        cy.get('.spinner').should('have.length', 1)
    })
    it('list page loads correctly', () => {
        cy.wait(3000);
        cy.get('button').should('exist'); //Sort button is shown
        cy.get('article').should('exist'); //Articles have loaded
        cy.get('a[href="/blogs/byTag/test"]').should('exist'); //Tags are loaded on the right side
    })

    it('search by tag page loads correctly', () => {
        cy.wait(3000);
        cy.get('a[href="/blogs/byTag/test"]').click();
        cy.get('h1').should('have.text', 'All blogs with tag \'test\'')
        cy.get('p').first().should('contain.text', 'This blog was created by the cypress test software!');
    })

    it('blog article page loads correctly', () => {
        cy.wait(3000);
        cy.get('a[href="/blogs/byTag/test"]').click();
        cy.contains('Read More...').click();

        cy.url().should('include', '00N4kyNwfhZIQ9s4SpWD')

        cy.get('h1').should('have.text', 'Test Blog!')
        cy.contains('This blog was created by the cypress test software!').should('exist'); //Content is present
        cy.contains(' 01/08/2021, 16:55:12').should('exist'); //Creation time is present
        cy.contains('Author: Test-Username').should('exist'); //Author is present
    })

    it('blog article page  comments load correctly', () => {
        cy.wait(3000);
        cy.get('a[href="/blogs/byTag/test"]').click();
        cy.contains('Read More...').click();

        cy.get('.comments-ul p.comment-user').last().should('have.text', 'Test-Username');
        cy.get('.comments-ul .comment-meta p').last().should('have.text', '8/1/2021, 5:20:50 PM');
        cy.get('.comments-ul p.comment-title').last().should('have.text', 'Awesome blog!');
    })

    it('blog article page when user is guest', () => {
        cy.wait(3000);
        cy.get('a[href="/blogs/byTag/test"]').click();
        cy.contains('Read More...').click();

        cy.contains(' Please login to save the blog!').should('exist');
        cy.contains(' Please login to like the blog!').should('exist');
        cy.contains('Please login to add a comment!').should('exist');
    })
})
