const userService = require('../service/userService');
const transferService = require('../service/transferService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
    users: () => userService.getUsers(),
    transfers: () => transferService.getTransfers()
  },
  Mutation: {
    login: (_, { username, password }) => {
      try {
        const user = userService.loginUser(username, password);
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1h' });
        return { token, user };
      } catch (e) {
        throw new Error(e.message);
      }
    },
    registerUser: (_, { username, password, isFavored }) => {
      const hash = bcrypt.hashSync(password, 8);
      return userService.registerUser(username, hash, isFavored);
    },
    transferValue: (_, { from, to, amount }, { user }) => {
      if (!user) throw new Error('Autenticação obrigatória');
      return transferService.transferValue(from, to, amount);
    }
  }
};
