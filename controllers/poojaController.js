const Pooja = require('../models/Pooja');

const generateReceiptNumber = async () => {
  const latest = await Pooja.findOne().sort({ _id: -1 });
  let newNumber = 1;
  if (latest && latest.receiptNumber) {
    const numPart = parseInt(latest.receiptNumber.replace(/[^\d]/g, ''), 10);
    newNumber = numPart + 1;
  }
  return `R${String(newNumber).padStart(4, '0')}`;
};

exports.getPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find();
    res.json(poojas);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPooja = async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id);
    if (!pooja) return res.status(404).json({ msg: 'Pooja not found' });
    res.json(pooja);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createPooja = async (req, res) => {
  try {
    const receiptNumber = await generateReceiptNumber(); // keep auto-generation
    const pooja = new Pooja({
      ...req.body,
      receiptNumber // system one
      // manualReceiptNumber is part of req.body if provided
    });

    await pooja.save();
    res.status(201).json(pooja);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};


exports.updatePooja = async (req, res) => {
  try {
    const pooja = await Pooja.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pooja) return res.status(404).json({ msg: 'Pooja not found' });
    res.json(pooja);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.deletePooja = async (req, res) => {
  try {
    const pooja = await Pooja.findByIdAndDelete(req.params.id);
    if (!pooja) return res.status(404).json({ msg: 'Pooja not found' });
    res.json({ msg: 'Pooja deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
