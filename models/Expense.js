const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  category: { type: String },  // e.g. Maintenance, Salary
  paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
  proof: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Expense', expenseSchema);
