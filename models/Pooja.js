const mongoose = require('mongoose');

const poojaSchema = new mongoose.Schema({
  receiptNumber: String,
  manualReceiptNumber: String,
  poojaName: String,
  date: Date,
  amount: Number,
  paymentPending: {
    type: Boolean,
    default: false
  },
  paymentMethod: String,
  paymentProof: String, // stores URL or file name (optional)
  devotees: [
    {
      name: String,
      nakshathra: String
    }
  ],
  note: String
}, { timestamps: true }); // auto-manages createdAt and updatedAt

module.exports = mongoose.model('Pooja', poojaSchema);
