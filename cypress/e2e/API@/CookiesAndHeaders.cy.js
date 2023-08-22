describe('Cookies & headers', ()=>{

    let authToken = null;

    before('creating access token',()=>{
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                 'Content-Type': 'application/json'
                    },
            body: {
                clientName: 'ABC',
                clientEmail: Math.random().toString(5).substring(2)+'@gmail.com'

            }
        }). then((Response) =>{
            authToken=Response.body.accessToken;
            cy.log(authToken)

        })

    })

    before('New order',()=>{
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+authToken
                    },
            body: {
                "bookId": 1 ,
                "customerName": "xyzabc"

            }
        }). then((Response) =>{
            expect(Response.status).equal(201)
            expect(Response.body.created).to.eq(true)

        })

    })

    it('Fetching order details',()=>{
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders/',
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+authToken
                    },
            Cookies: {
                "cookieName": 'mycookie'
                
            }
        }). then((Response) =>{
            expect(Response.status).equal(200)
            expect(Response.body).has.length(1)

        })

    })

    /*

we have 2 before blocks:

1. Block one we create an access token with random email since we can't use the access token twice with one email,
    we had to generate a random email. one we POST the body, a token is given as a response.
    we pick the response and use it

2. Block two we created a new order 
    we added auth to headers and changed the body to suite the order based on the API

3. IT BLOCK, we created 

    we fetch the data that is created in block 2 using the same access token (authToken) added cookies. 

*/

})