// Inicialização do servidor Express
const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor GraphQL rodando em http://localhost:${PORT}/graphql`);
});
