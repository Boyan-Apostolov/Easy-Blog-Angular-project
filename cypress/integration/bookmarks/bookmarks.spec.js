
describe('/blogs/saved - bookmarks tests', () => {
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
        cy.visit('http://localhost:4200/blogs/saved');
    })

    it('bookmarks load correctly', () => {
        cy.contains('Test Blog!').should('exist');
    })
    it('user can remove blog from bookmarks', () => {
        cy.get('.btn-danger').click();
        cy.get('h1').contains('There are currently no blogs to show!').should('exist');
        cy.visit('http://localhost:4200/blogs/blog/00N4kyNwfhZIQ9s4SpWD');
        cy.contains('Did you like this blog?').click();
    })
})
