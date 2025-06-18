const Donation = require('../models/Donation');
const Counter = require('../models/Counter');


// Function to generate a unique receipt number
async function generateReceiptNumber() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'receipt' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return `RCPT-${counter.value}`;
}


exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
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
    const {
      donorName,
      donorAddress,
      amount,
      purpose,
      paymentMethod,
      paymentProof
    } = req.body;

    const receiptNumber = await generateReceiptNumber();

    const newDonation = new Donation({
      receiptNumber,
      donorName,
      donorAddress,
      amount,
      purpose,
      paymentMethod,
      paymentProof,
      createdBy: req.user ? req.user._id : null
    });

    const saved = await newDonation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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

exports.getNextReceiptNumber = async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: 'receipt' });
    const next = (counter?.value || 10000) + 1;
    res.json({ receiptNumber: `RCPT-${next}` });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to generate next receipt number' });
  }
};
