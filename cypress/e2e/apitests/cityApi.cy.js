describe('City API', () =>{

    it('Cities', ()=>{
        cy.request({
            method: 'GET',
            url : 'http://universities.hipolabs.com/search?country',

        }).then((response)=>{
            const countryName = response.body[0].country
            return countryName
        }).then((countryName)=>{
            cy.request({
                method: 'GET',
                url: 'http://universities.hipolabs.com/search?'+countryName
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('country', countryName)
            })
        })
    })

    it.only('Cities', ()=>{
        cy.request({
            method: 'GET',
            url : 'http://universities.hipolabs.com/search?country',

        }).then((response)=>{
            const countryName2 = response.body[0].country
            return countryName2
        }).then((countryName2)=>{

            for( let i=0; i<countryName2.length; i++){
            cy.request({
                method: 'GET',
                url: 'http://universities.hipolabs.com/search?'+countryName2[i].country
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('country', countryName2[i].country)
            })

        }
        })
    })

})