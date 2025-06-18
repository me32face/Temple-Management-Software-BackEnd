const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  receiptNumber: { type: String, required: true, unique: true },
  donorName: { type: String, required: true },
  donorAddress: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  purpose: { type: String, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
  paymentProof: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Donation', donationSchema);
