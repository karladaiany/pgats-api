const bcrypt = require('bcryptjs')

// Banco de dados em memória para usuários
const users = [
  { 
    username: 'Karla', 
    password: bcrypt.hashSync('123456', 8),
    isFavored: true 
  },
  { 
    username: 'Jeff', 
    password: bcrypt.hashSync('123456', 8),
    isFavored: false 
  }
];

module.exports = {
  users
};
