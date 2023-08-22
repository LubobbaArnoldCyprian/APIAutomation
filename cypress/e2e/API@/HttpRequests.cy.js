describe('HTTP REQUESTS', ()=>{

    it('GET CALL', ()=>{
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .its('status').should('equal', 200)

    })

    it('Post Call', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts/',
            body: {
                title: 'TEST',
                body: 'This is a post call',
                userId: 1

            }
        })
        .its('status').should('equal', 201)

    })

    it ('PUT Call', ()=>{
        cy.request({
            method: 'PUT',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: {
                
                    "userId": 1,
                    "id": 1,
                    "title": " PUT CALL",
                    "body": " This is an updated post call updated"
            }
        })

        .its('status').should('equal', 200)
    })

    it ('DELETE CALL', ()=>{
        cy.request({
            method: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/posts/1'
        })

        .its('status').should('equal', 200)
    })
    
    

})