const mongoose = require('mongoose');

const oldPendingPaymentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },  // user-selected date
    name: { type: String, required: true },
    details: { type: String },
    phone: { type: String },
    amount: { type: Number, required: true },
    paymentMode: { type: String },
    notes: { type: String },
    paymentPending: { type: Boolean, default: true },
  },
  { timestamps: true }  // includes createdAt and updatedAt
);

module.exports = mongoose.model('OldPendingPayment', oldPendingPaymentSchema);
