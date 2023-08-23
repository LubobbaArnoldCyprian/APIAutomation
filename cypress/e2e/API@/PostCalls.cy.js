describe('Different ways of creating a post call', ()=>{

    it ('Hard coded values', ()=>{
        const requestBody={
            tourist_name  : 'Jackson',
            tourist_email : 'Jackson2@gmail.com',
            tourist_location : 'London'
        }

// You have to change the email address whenever you run

        cy.request({
            method: 'POST',
            url: 'http://adequateshop.com/api/tourist',
            body: requestBody

        })
        .then((Response) =>{
            // Assert with response code
            expect(Response.status).to.eq(201)

             // assert with data from response and request body
            expect(Response.body.tourist_email).to.eq('Jackson2@gmail.com')
            expect(Response.body.tourist_name).to.eq('Jackson')
            expect(Response.body.tourist_location).to.eq('London')
        })
    })

    it ('Approach 2 - Random generation of objects', ()=>{
        const requestBody={
            tourist_name  : Math.random().toString(5).substring(2),
            tourist_email : Math.random().toString(5).substring(2)+'@gmail.com',
            tourist_location : 'London'
        }
// A random name and email are created

        cy.request({
            method: 'POST',
            url: 'http://adequateshop.com/api/tourist',
            body: requestBody

        })
        .then((Response) =>{
            // assert with response code
            expect(Response.status).to.eq(201)

            // assert with data from response and request body
            expect(Response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(Response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(Response.body.tourist_location).to.eq(requestBody.tourist_location)
        })
    })

// You have to change the email address whenever you run
    it.only ('Approach 3 using fixtures', ()=>{

        // we use cy.fixture to fetch data from tourist.json file under fixtures
        cy.fixture('tourist').then( (data)=>{
            const requestBody=data

            cy.request({
                method: 'POST',
                url: 'http://adequateshop.com/api/tourist',
                body: requestBody
    
            })
            .then((Response) =>{
                //Assert with response code
                expect(Response.status).to.eq(201)

                // assert with data from response and request body
                expect(Response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(Response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(Response.body.tourist_location).to.eq(requestBody.tourist_location)

                // assert with properties from the body such as tourist_email, Id and tourist_name
                expect(Response.body).has.property('tourist_email',requestBody.tourist_email)
            })
        })
    })

})
