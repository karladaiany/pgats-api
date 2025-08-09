// transferController.js
const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') return res.status(400).json({ error: 'Dados obrigatórios: de, para, valor' });
  try {
    const transfer = transferService.transferValue(from, to, amount);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getTransfers());
};
