describe('/blogs logged in user tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/blogs/byTag/test');
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

    it('blog article page when user is logged in', () => {
        cy.wait(3000);
        cy.contains('Read More...').click();

        cy.contains(' Did you like this blog?').should('exist');
        cy.contains(' Want to save this blog?').should('exist');
        cy.contains('Add a comment').should('exist');

    })

    it('blog article comment validation', () => {
        cy.wait(3000);
        cy.contains('Read More...').click();

        cy.contains('Add a comment').click();
        cy.get('textarea[name=comment]').click();
        cy.get('p').first().click();

        cy.get('div.validation-error').first()
            .should('contain.text', 'You cannot post');


        cy.get('textarea[name=comment]').type('test');
        cy.get('p').first().click();

        cy.get('div.validation-error')
            .should('not.exist');

        cy.contains('Post').should('not.be.disabled')

    })

    it('frozen users cannot write comments', () => {
        cy.setLocalStorage('user_data', JSON.stringify({
            username: "Test-Username",
            imgUrl: "https://firebasestorage.googleapis.com/v0/b/easy-blog-ec21f.appspot.com/o/ProfileImages%2FTest-Username?alt=media&token=9ca78ef5-d41f-4ddc-b82b-24b6b40a18be",
            id: "6p7t4ul0tIVkeL9yRqzV",
            bio: "This is just a test!",
            email: "test-email@gmail.com",
            visitations: [
            ],
            firebaseId: "qdtBoai9G8WLi06YUTDkmDq2jrp2",
            isFrozen: "true",
        }));
        cy.wait(3000);
        cy.contains('Read More...').click();
        cy.get('.frozen p').should('have.text', 'You have been frozen by the administrator and therefore cannot write comments!');
    })

    it.only('user cannot add blog to bookmarks more than once', () => {
        cy.wait(3000);
        cy.contains('Read More...').click();

        cy.contains(' Want to save this blog?').click();
        cy.wait(1000)
        cy.contains(' Want to save this blog?').click();
        cy.get('div.alert')
            .should('exist');
    })
})
