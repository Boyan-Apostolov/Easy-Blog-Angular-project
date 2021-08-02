describe('/leaderboard logged in user tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/leaderboard');
        cy.setLocalStorage('user_data', JSON.stringify({
            username: "Test-Username",
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/easy-blog-ec21f.appspot.com/o/ProfileImages%2FTest-Username?alt=media&token=9ca78ef5-d41f-4ddc-b82b-24b6b40a18be",
            id: "6p7t4ul0tIVkeL9yRqzV",
            bio: "This is just a test!",
            email: "test-email@gmail.com",
            visitations: [
            ],
            firebaseId: "qdtBoai9G8WLi06YUTDkmDq2jrp2",
        }));
    })

    it('spinner shows on loading', () => {
        cy.get('.spinner').should('have.length', 1)
    })

    it('leaderboards shows user', () => {
        cy.wait(3000);

        cy.get('h2').contains('User: Test-Username').should('exist'); //Loads user name
        cy.get('h2').contains('User: Test-Username').parent()
            .contains('Blogs written: 1').should('exist'); //loads user blogs count

        cy.get('h2').contains('User: Test-Username').parent().get('.img-holder img').should('have.attr', 'src').should('include', 'https://firebasestorage.googleapis.com/v0/b/easy-blog-ec21f.appspot.com/o/ProfileImages%2Fboian4934?alt=media&token=59d71b86-513e-4f35-be13-6a97523dfcbf'); //User img loads correct img

    })
})
