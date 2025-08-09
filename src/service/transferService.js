// transferService.js
const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

function transferValue(from, to, amount) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário não encontrado');
  if (from === to) throw new Error('Não é possível transferir para si mesmo');
  if (!recipient.isFavored && amount >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos');
  }
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

function getTransfers() {
  return transfers;
}

module.exports = {
  transferValue,
  getTransfers
};
