const mongoose = require('mongoose');

const MonthlyPoojaRecordSchema = new mongoose.Schema({
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'MonthlyPoojaPerson', required: true },
  year: { type: Number, required: true },
  month: { type: String, required: true },
  dates: [{ type: Number }],
  amount: { type: Number },
  isPaid: { type: Boolean, default: false },
  paymentMode: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MonthlyPoojaRecord', MonthlyPoojaRecordSchema);
