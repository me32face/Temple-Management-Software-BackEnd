const mongoose = require('mongoose');

const poojaSchema = new mongoose.Schema({
  receiptNumber: { type: String, required: true, unique: true }, // auto-generated
  manualReceiptNumber: { type: String }, // ✅ new optional manual entry
  poojaName: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
  paymentProof: { type: String },
  devotees: [
    {
      name: { type: String, required: true },
      nakshathra: { type: String, required: true }
    }
  ],
  scheduled: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Pooja', poojaSchema);
