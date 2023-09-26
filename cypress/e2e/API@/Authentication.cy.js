describe("",()=>{

    it("Basic Authentication",()=>{
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth:{
                    user: 'postman',
                    pass: 'password'
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })

    })

    it("Digest Authentication",()=>{
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth:{
                    username: 'postman',
                    password: 'password',
                    method:'digest'
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })

    })


    const token='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'
    it("Bearer token Auth",()=>{
        cy.request(
            {
                method: 'GET',
                url: 'https://api.github.com/user/repos',
                headers:{
                    Authorization:'Bearer '+token
                }
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
            })
    })

    it.skip("API key Auth", ()=>{

        cy.request({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=London',
            qs:{
                appid:''   // API KEY AND VALUE
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
        })

    })


})