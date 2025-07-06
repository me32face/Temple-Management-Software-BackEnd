const Ramayana = require('../models/RamayanaParayanam');

exports.getAll = async (req, res) => {
  try {
    const data = await Ramayana.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const newEntry = new Ramayana(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Ramayana.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: 'Error updating', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Ramayana.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting' });
  }
};