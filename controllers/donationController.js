const Donation = require('../models/Donation');

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ msg: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) return res.status(404).json({ msg: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ msg: 'Donation not found' });
    res.json({ msg: 'Donation deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
