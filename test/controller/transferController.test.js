// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//Aplicação
const app = require('../../app');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: 'Karla',
                    to: 'Samuel',
                    amount: 100
                })
            
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        })
    })

    describe('GET /transfers', () => {
        // Its ficam aqui
    })
})