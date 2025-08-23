// app.js
const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authenticateJWT = require('./middleware/authenticateJWT');

const app = express();
app.use(express.json());

// Rotas de usuário
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.getUsers);

// Rotas de transferência
app.post('/transfer', authenticateJWT, transferController.transfer);
app.get('/transfers', authenticateJWT, transferController.getTransfers);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
