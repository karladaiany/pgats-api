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
        
        beforeEach(async () => {
            const resposta = await request(app)
                .post('/login')
                .send({
                    username: 'Karla',
                    password: '123456'
                })

            token = resposta.body.token
        })
        
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(app)
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
            // Mocar apenas a função transferValue
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
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
                to: 'Jeff',
                amount: 100,
                date: new Date().toISOString()
            });

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: 'Karla',
                    to: 'Samuel',
                    amount: 100
                })

            expect(resposta.status).to.equal(201)

            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json')
            delete resposta.body.date // Removo a data que é dinâmica
            delete respostaEsperada.date // Removo a data que é dinâmica
            expect(resposta.body).to.deep.equal(respostaEsperada);

            // expect que é sinônimo do to.deep.equal
            // expect(resposta.body).to.eql(respostaEsperada);

            // Validação com expect para comparar a Resposta.body com a String contida no arquivo
            // expect(resposta.body).to.have.property('from', 'Karla')
            // expect(resposta.body).to.have.property('to', 'Samuel')
            // expect(resposta.body).to.have.property('amount', 100)

            // Reseto o Mock
            sinon.restore()
        })
    })

    describe('GET /transfers', () => {
        // Its ficam aqui
    })
})