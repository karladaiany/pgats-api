// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//Aplicação
const app = require('../../app');

// Mock
const transferService = require('../../service/transferService');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
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

        it('Usando Mocks: Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            // Mocar apenas a função transferValue
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: 'Karla',
                    to: 'Samuel',
                    amount: 100
                })
            
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            // Reseto o Mock
            sinon.restore()
        })

        it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            // Mocar apenas a função transferValue
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.returns({
                from: 'Karla',
                to: 'Samuel',
                amount: 100,
                date: new Date().toISOString()
            });

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: 'Karla',
                    to: 'Samuel',
                    amount: 100
                })

            expect(resposta.status).to.equal(201)
            expect(resposta.body).to.have.property('from', 'Karla')
            expect(resposta.body).to.have.property('to', 'Samuel')
            expect(resposta.body).to.have.property('amount', 100)

            // Reseto o Mock
            sinon.restore()
            })
    })

    describe('GET /transfers', () => {
        // Its ficam aqui
    })
})