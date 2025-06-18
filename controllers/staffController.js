const Staff = require('../models/Staff');

exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getOneStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ msg: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) return res.status(404).json({ msg: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ msg: 'Staff not found' });
    res.json({ msg: 'Staff deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
