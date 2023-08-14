/// <reference types = "Cypress" />

const dataJSON = require('../../fixtures/createuser.json')

describe('post user request', ()=>{

   let accessToken = '3e1ef56b03c9a0066902d766b23ee1c7986c42ba453fcd5ac01909165032bec3'

  let randomText = ''
  let textEmail = ''
  let randomUserName = ''
  let userName = ''
    
    it('create user test', ()=>{

        var pattern = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvvwxyz"
        var pattern2 = "1234567890"

        //random generation of text

        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length))
        randomUserName+=pattern2.charAt(Math.floor(Math.random() * pattern2.length))

        textEmail = randomText + '@hell.com'
        userName = 'test' +  randomUserName + randomText

        
            cy.request({
                method : 'POST',
                url : 'https://gorest.co.in/public/v2/users',
                headers : {
                    'authorization' : "Bearer " + accessToken
                },
                body : {
                        "name": userName,
                        "email": textEmail,
                        "gender": dataJSON.gender,
                        "status": dataJSON.status
                }
            }).then((res)=>{
                expect(res.status).to.eq(201)
                expect(res.body).has.property('name', userName)
                expect(res.body).has.property('email', textEmail)
                expect(res.body).has.property('status', dataJSON.status)

//Request chaining
            }).then((res)=>{
                   cy.log(JSON.stringify(res))
                   expect(res.body).has.property('id')
                      
                    const userId = JSON.stringify(res.body.id)
                    cy.log("The user id is: " + userId)
                    cy.wait(1000)

// Get user (GET)
    
                cy.request({

                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users/'+userId,
                    headers: {
                        'authorization' : "Bearer " + accessToken
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('id', parseInt(userId))
                         
                })
            })
    })
})