describe('/logout tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/');
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


    it('logout should clear the localStorage', () => {
        cy.contains('Logout').click();
        cy.wait(1000);
        cy.getLocalStorage('user_data').should('not.exist');
    })
})

