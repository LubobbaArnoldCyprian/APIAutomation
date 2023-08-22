describe ('API TESTING', ()=>{



    it('Passing Query Parameters', ()=>{

        /*
        what are query parameters: API Query parameters can be defined as the optional key-value pairs that appear after the question mark in the URL.
        1. https://example.com/articles?sort=ASC&page=2
        In this URL, there are two query parameters, sort, and page, with ASC and 2 being their values, respectively.

        In the example below, instead of using------ https://reqres.in/api/users?page=2 ---- it was broken down. below with qs: { page 2}
        */

        const queryParam={ page: 2}
        
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            //qs: { page: 2}         OR 
            qs: queryParam
        })
        .then((Response) =>{
            expect(Response.status).to.eq(200)
            expect(Response.status).equal(200)
            expect(Response.body.page).equal(2)
            expect(Response.body.data).has.length(6)
            expect(Response.body.data[0]).has.property('id', 7)
            expect(Response.body.data[0]).has.property('first_name', 'Michael')




        })

    })
})