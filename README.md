# API de Transferências

Esta API permite realizar operações de registro, login, consulta de usuários e transferências de valores entre usuários. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:

```bash
npm install express swagger-ui-express
```

## Execução

Para iniciar o servidor:

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger

Acesse a documentação interativa em:

```
http://localhost:3000/api-docs
```

## Endpoints

- `POST /register`: Registra um novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `isFavored` (boolean).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários cadastrados.
- `POST /transfer`: Realiza transferência entre usuários. Campos obrigatórios: `from`, `to`, `amount`.
- `GET /transfers`: Lista todas as transferências realizadas.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.
- Transferências para favorecidos não têm limite de valor.


## Estrutura de Diretórios

- `src/controller/`: Lógica das rotas e respostas HTTP
- `src/service/`: Regras de negócio
- `src/model/`: Dados em memória
- `src/app.js`: Configuração das rotas e middlewares
- `src/server.js`: Inicialização do servidor
- `swagger.json`: Documentação da API

## Testes

Para testar a API, recomenda-se o uso do [Supertest](https://github.com/visionmedia/supertest) e [Jest](https://jestjs.io/).

---

API desenvolvida para fins educacionais.
