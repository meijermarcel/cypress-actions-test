

// before
// beforeEach
// afterEach
// after
//yo
describe('Make sure site loads', () => {
    beforeEach(() => {
        const moviesListUrl = 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=36260422e9e3ed103f3bcf59797280b4';

        const configUrl = 'https://api.themoviedb.org/3/configuration?api_key=36260422e9e3ed103f3bcf59797280b4'

        cy.intercept(moviesListUrl, {
            fixture: 'moviesList',
        })

        cy.intercept(configUrl, {
            fixture: 'config',
        })

        cy.visit('http://localhost:3000/')
        // cy.login()
    })

    it('Page Loads', () => {
        cy.contains('Filter')

        cy.findAllByTestId('movies-list-movie').first().then(($movie) => {
            const movieUrl = $movie.attr('href')
            cy.get('[data-testid=movies-list-movie]').first().click()
            cy.url().should('include', movieUrl)
        })

        expect(true).to.equal(true)
    })

    it('Correct number of movies', () => {
        cy.get('[data-testid=movies-list-movie]').should('have.length',20)
    })

    it('Understands chainers', () => {
        cy.get('[data-testid=movies-list-movie]').should('have.length',20)
        cy.get('[data-testid=movies-list-movie]').should('exist')
        cy.get('[data-testid=movies-loading-movie]').should('not.exist')
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > [data-testid="movies-list-movie"] > img').click();
        /* ==== End Cypress Studio ==== */

        cy.fixture('moviesList').then((jsonData) => {
            console.log('jsonData: ', jsonData.results[0].title);
            expect(jsonData.results[0].title).to.eq('The Batman')
        })

        
    })
})
