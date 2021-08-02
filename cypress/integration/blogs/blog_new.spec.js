describe('/blogs/new logged in user tests', () => {
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
            isFrozen: "",
        }));
        cy.visit('http://localhost:4200/blogs/new');
    })


    it('page loads correctly', () => {
        cy.get('input[name=title]').should('exist');
        cy.get('input[name=image]').should('exist');
        cy.get('input[name=tags]').should('exist');
        cy.get('ckeditor').should('exist');
        // cy.get('.spinner').should('have.length', 1)
    })

    it('data validation shows error on empty fields', () => {

        cy.get('.save-btn').click();
        cy.get('.danger').should('exist');

        cy.get('input[name=title]').type('test');
        cy.get('.save-btn').click();
        cy.get('.danger').should('exist');

        const fixtureFile = 'photo.png';
        cy.get('input[name=image]').attachFile(fixtureFile);
        cy.get('.save-btn').click();
        cy.get('.danger').should('exist');

        cy.get('input[name=tags]').type('test');;
        cy.get('.save-btn').click();
        cy.get('.danger').should('exist');

        cy.window()
            .then(win => {
                win.CKEDITOR.instances["editor1"].setData("<p>HTML body</p>");
            });
        cy.get('.save-btn').click();
        cy.get('.danger').should('not.exist');


    })

    it('page works correctly on valid fields then deletes the blog', () => {
        cy.get('input[name=title]').type('test');

        const fixtureFile = 'photo.png';
        cy.get('input[name=image]').attachFile(fixtureFile);

        cy.get('input[name=tags]').type('testTemp');;

        cy.window()
            .then(win => {
                win.CKEDITOR.instances["editor1"].setData("<p>HTML body</p>");
            });

        cy.wait(2000);
        cy.get('.save-btn').click();

        cy.get('.spinner').should('have.length', 1);

        cy.wait(4000);
        cy.contains('Read More...').click();
        cy.visit('http://localhost:4200/blogs/byTag/testTemp');
        cy.contains('Read More...').click();
        cy.contains('Edit').click();
        cy.contains('Delete').click();
        cy.on('window:confirm', () => true);
    })

    it('successfully edit blog', () => {
        cy.get('input[name=title]').type('test');

        const fixtureFile = 'photo.png';
        cy.get('input[name=image]').attachFile(fixtureFile);

        cy.get('input[name=tags]').type('testTemp');;

        cy.window()
            .then(win => {
                win.CKEDITOR.instances["editor1"].setData("<p>HTML body</p>");
            });

        cy.wait(2000);
        cy.get('.save-btn').click();

        cy.get('.spinner').should('have.length', 1);

        cy.wait(4000);
        cy.contains('Read More...').click();
        cy.visit('http://localhost:4200/blogs/byTag/testTemp');
        cy.contains('Read More...').click();
        cy.contains('Edit').click();

        cy.get('input[name=title]').clear().type('test-title');
        cy.get('.save-btn').click();

        cy.get('h1').should('have.text', 'test-title')

        cy.contains('Edit').click();
        cy.contains('Delete').click();
        cy.on('window:confirm', () => true);
    })


    it('frozen users cannot write blogs', () => {
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
        cy.get('.frozen p').should('have.text', 'You have been frozen by the administrator and therefore cannot write blogs!');
    })

})
