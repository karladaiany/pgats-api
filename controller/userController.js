// userController.js
const userService = require('../service/userService');

exports.register = (req, res) => {
  const { username, password, isFavored } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  try {
    const user = userService.registerUser(username, password, isFavored);
    res.status(201).json(user);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  try {
    const user = userService.loginUser(username, password);
    // Gera o token JWT
    const jwt = require('jsonwebtoken');
    const SECRET = process.env.JWT_SECRET || 'secretdemo';
    const token = jwt.sign(
      { username: user.username, isFavored: user.isFavored }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};
