// Configuração do ApolloServer e Express para GraphQL
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Middleware para autenticação JWT nas Mutations de Transfer
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      req.user = jwt.verify(auth.replace('Bearer ', ''), process.env.JWT_SECRET || 'segredo');
    } catch (e) {
      req.user = null;
    }
  }
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app });
}

startApollo();

module.exports = app;
