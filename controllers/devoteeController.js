const Devotee = require('../models/Devotee');

exports.getDevotees = async (req, res) => {
  try {
    const devotees = await Devotee.find().sort({ createdAt: -1 });
    res.json(devotees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findById(req.params.id);
    if (!devotee) return res.status(404).json({ msg: 'Devotee not found' });
    res.json(devotee);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createDevotee = async (req, res) => {
  try {
    const devotee = new Devotee(req.body);
    await devotee.save();
    res.status(201).json(devotee);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.updateDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!devotee) return res.status(404).json({ msg: 'Devotee not found' });
    res.json(devotee);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.deleteDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findByIdAndDelete(req.params.id);
    if (!devotee) return res.status(404).json({ msg: 'Devotee not found' });
    res.json({ msg: 'Devotee deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
