/// <reference types = "Cypress" />

describe('get api user tests', ()=>{

    let accessToken = '3e1ef56b03c9a0066902d766b23ee1c7986c42ba453fcd5ac01909165032bec3'

    it.only('get users', ()=>{

        cy.request({

            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users',
            headers : {
                'authorization' : "Bearer" + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))
        })

    })

    it('get user by ID', ()=>{

        cy.request({

            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users/4377266',
            headers : {
                'authorization' : "Bearer" + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq('Anilaabh Kaur')

        })

    })
})