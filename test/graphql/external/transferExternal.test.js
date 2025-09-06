const request = require('supertest')
const { expect, use } = require('chai')

const chaiExclude = require('chai-exclude')
use(chaiExclude)

require('dotenv').config()

describe('Testes de Transferência', () => {
    
    before( async () => {
        const loginUser = require('../fixture/requests/login/loginUser.json')

        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .send(loginUser)
        
        token = resposta.body.data.login.token
    })

    beforeEach(() => {
        createTransfer = require('../fixture/requests/transfer/createTransfer.json')
    })

    it('Validar que é possível transferir grana entre duas contas', async () => {
        const respostaEsperada = require('../fixture/responses/transfer/validarQueEPossivelTransferirGranaEntreDuasContas.json')

        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransfer)
        
        expect(respostaTransferencia.status).to.equal(200)
        expect(respostaTransferencia.body.data.transferValue)
            .excluding('date')
            .to.deep.equal(respostaEsperada.data.transferValue)
    })

    it('Validar que não é possível transferir para si mesmo', async () => {
        createTransfer.variables.to = 'Karla'

        const respostaTransferencia = await request(process.env.BASE_URL_GRAPHQL)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send(createTransfer)

        expect(respostaTransferencia.status).to.equal(200)
        expect(respostaTransferencia.body.errors[0].message).to.equal('Não é possível transferir para si mesmo')
     })
})