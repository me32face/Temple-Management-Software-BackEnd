const mongoose = require('mongoose');

const devoteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  place: { type: String },
  pincode: { type: String },
  whatsappNumber: { type: String },
  secondaryNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Devotee', devoteeSchema);
