describe('Bloglist app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Francisco Castillo',
            username: 'panxito',
            password: 'fran1',
        }

        cy.request('POST', 'http://localhost:3003/api/users', user)

        const user2 = {
            name: 'Myke Towers',
            username: 'myke',
            password: 'elyk1',
        }

        cy.request('POST', 'http://localhost:3003/api/users', user2)

        cy.visit('http://localhost:3000')
    })

	it('Login form is shown', function() {
		cy.contains('Log in to Bloglist App')
        cy.contains('username')
        cy.contains('password')
        cy.contains('Log in')
	})

    describe('Login', function() {

        it('succeeds with correct credentials', function() {
            cy.get('#username').type('panxito')
            cy.get('#password').type('fran1')
            cy.get('#login-button').click()

            cy.contains('Francisco Castillo logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('panxito')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').contains('wrong username or password')

            cy.get('html').should('not.contain', 'Francisco Castillo logged in')
        })

        describe.only('when logged in', function() {

            beforeEach(function() {
                cy.login({ username: 'panxito', password: 'fran1' })
            })

            it('A blog can be created', function() {
                cy.get('#newBlog-button').click()
                cy.get('#blog-title').type('A blog created by cypress')
                cy.get('#blog-author').type('Mark Diaz')
                cy.get('#blog-url').type('www.facebook.com')
                cy.get('#createBlog-button').click()

                cy.contains('A blog created by cypress')
            })

            describe('and a Blog exists', function() {

                beforeEach(function() {
                    cy.createBlog({
                        title: 'A blog created by cypress',
                        author: 'Mark Diaz',
                        url: 'www.facebook.com',
                    })
                })

                it('it can be liked', function() {
                    cy.contains('A blog created by cypress Mark Diaz').parent().find('button').click()

                    cy.contains('likes 0')
                    cy.contains('Like').click()
                    cy.contains('likes 1')
                })

                it('it can be removed', function() {
                    cy.contains('A blog created by cypress Mark Diaz').parent().find('button').click()

                    cy.contains('Remove').click()

                    cy.get('html').should('not.contain', 'A blog created by cypress Mark Diaz')
                })

                it('it can not be removed by an unauthorized user', function() {
                    cy.contains('Log out').click()

                    cy.login({ username: 'myke', password: 'elyk1' })

                    cy.contains('A blog created by cypress Mark Diaz').parent().find('button').click()

                    cy.get('html').should('not.contain', 'Remove')
                })
            })

            describe('and several blogs exists', function() {

                beforeEach(function() {
                    cy.createBlog({
                        title: 'First Blog',
                        author: 'Matty God',
                        url: 'hola.com',
                        likes: 4,
                    })

                    cy.createBlog({
                        title: 'Second Blog',
                        author: 'Janet Gold',
                        url: 'chao.com',
                        likes: 5,
                    })
                })

                it('there are ordered by likes', function() {
                    cy.get(".blog").eq(0).should("contain", "Second Blog Janet Gold")
                    cy.get(".blog").eq(1).should("contain", "First Blog Matty God").as('blog1')

                    cy.get("@blog1").contains('View').click()
                    cy.get("@blog1").contains('Like').click()
                    cy.get("@blog1").contains('Like').click()
                    cy.get("@blog1").contains('Like').click()
                    cy.get("@blog1").contains('Like').click()

                    cy.get(".blog").eq(0).should("contain", "First Blog Matty God")
                    cy.get(".blog").eq(1).should("contain", "Second Blog Janet Gold")
                })
            })
        })
    })
})