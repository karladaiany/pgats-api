const request = require('supertest')
const { expect } = require('chai')

describe('Testes de Transferência', () => {
    it.only('Validar que é possível transferir grana entre duas contas', async () => {
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `
                    mutation Login($username: String!, $password: String!) {
                        login(username: $username, password: $password) {
                            token
                        }
                    }`,
                variables: {
                    username: 'Karla',
                    password: '123456'
                }
            })

        const respostaTransferencia = await request('http://localhost:4000')
            .post('/graphql')
            .set('Authorization', `Bearer ${resposta.body.data.login.token}`)
            .send({
                query: `
                    mutation TransferValue($from: String!, $to: String!, $amount: Int!) {
                        transferValue(from: $from, to: $to, amount: $amount) {
                            from
                            to
                            amount
                            date
                        }
                    }`,
                variables: {
                    from: 'Karla',
                    to: 'Jeff',
                    amount: 100
                }
            })
        expect(respostaTransferencia.status).to.equal(200)
    })
})