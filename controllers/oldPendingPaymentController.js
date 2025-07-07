const OldPendingPayment = require('../models/OldPendingPayment');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await OldPendingPayment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await OldPendingPayment.findById(req.params.id);
    if (!payment) return res.status(404).json({ msg: 'Record not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const payment = new OldPendingPayment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const payment = await OldPendingPayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!payment) return res.status(404).json({ msg: 'Record not found' });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await OldPendingPayment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ msg: 'Record not found' });
    res.json({ msg: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
