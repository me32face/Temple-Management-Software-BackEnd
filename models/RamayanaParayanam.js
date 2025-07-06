const mongoose = require('mongoose');

const ramayanaSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  nakshathra: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMode: { type: String, enum: ['Cash', 'UPI'], required: true },
  notes: { type: String },
  paymentPending: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('RamayanaParayanam', ramayanaSchema);
