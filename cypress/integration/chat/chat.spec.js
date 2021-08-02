
describe('/chat tests', () => {
    beforeEach(() => {
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
        cy.visit('http://localhost:4200/chat');
    })

    it('guest users dont\'t have access to the chat', () => {
        window.localStorage.removeItem('user_data');
        cy.visit('http://localhost:4200/chat');
        cy.get('.not-logged h1').should('have.text', 'You must be logged in to access the chat!');
    })

    it('logged users have access to the chat', () => {
        cy.get('.not-logged h1').should('not.exist');
    })

    it('message sending works', () => {
        cy.get('textarea').type('test-message');
        cy.get('.btn').click();

        cy.get('.post-title').first().should('have.text', 'test-message');
        cy.get('.comment-user-username').first().should('have.text', 'Test-Username');
    })

    it('user cannot send empty message', () => {
        cy.get('.btn').click();
        cy.get('.danger').should('exist');
    })
})
