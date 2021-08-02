
describe('/profile tests', () => {
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
        cy.visit('http://localhost:4200');
        cy.get('img.profile-pic').parent().click();
    })

    it.only('user profile loads correctly', () => {
        cy.get('h1').should('have.text', 'Test-Username');
        cy.get('.bio-holder p').should('have.text', 'This is just a test!');
        cy.get('.achievements-holder li .achievment-content').should('have.text', ' 1 blog written! ');
        cy.get('.blog-cards h2').should('have.text', 'Test Blog!');
    });

    it('Visitation history button shows profile visitations', () => {
        cy.get('.btn-success').click();
        cy.contains('Latest 10 visits of your profile').should('exist');
    })

    it('frozen user has an alert in their profile', () => {
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
        cy.get('img.profile-pic').parent().click();
        cy.get('.frozen').should('have.text', 'USER IS FROZEN BY ADMIN');
    })
})
