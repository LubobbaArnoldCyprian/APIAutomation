describe("Parsing JSON Response", ()=>{

    it ('Parsing simple JSON response', ()=>{

        
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products'
        })
        .then((Response) =>{
            expect(Response.status).to.eq(200)
            expect(Response.body[0].id).to.eq(1)
            expect(Response.body[0].title).to.eq("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
            expect(Response.body[0].price).to.eq(109.95)
            expect(Response.body[0].rating.rate).to.eq(3.9)

            expect(Response.status).to.eq(200)
            expect(Response.body[19].id).to.eq(20)
            expect(Response.body[19].title).to.eq("DANVOUY Womens T Shirt Casual Cotton Short")
            expect(Response.body[19].price).to.eq(12.99)
            expect(Response.body[19].rating.rate).to.eq(3.6)
        })
    })


    /*

    In the second IT block, a limit of 5 responses is set.
    A loop is created to go through the price property of the five responses and get a total.
    Then we assert the total by confirming. 


    */

    it.only('Parsing complex JSON response', ()=>{

        let totalprice=0

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
            qs: {limit:5}
        })
        .then((Response) =>{
            expect(Response.status).to.eq(200)
            
            Response.body.forEach(element =>{
                totalprice = totalprice+element.price
            })
            expect(totalprice).to.equal(899.23)
 
        })
    })

})