// Bibliotecas
const request = require('supertest')
const { expect } = require('chai')

require('dotenv').config()

// Testes
describe('Transfer External', () => {
    describe('POST /transfer', () => {
        
        beforeEach(async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/login')
                .send({
                    username: 'Karla',
                    password: '123456'
                })
        
            token = respostaLogin.body.token
        })
        
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: 'Karla',
                    to: 'Samuel',
                    amount: 100
                })
            
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        })

        it('Usando Mocks: Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: 'Karla',
                    to: 'Samuel',
                    amount: 100
                })
            
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        })

        it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: 'Karla',
                    to: 'Jeff',
                    amount: 100
                })

            expect(resposta.status).to.equal(201)

            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json')
            delete resposta.body.date // Removo a data que é dinâmica
            delete respostaEsperada.date // Removo a data que é dinâmica
            expect(resposta.body).to.deep.equal(respostaEsperada);
        })
    })
})