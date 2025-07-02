const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String },
  pincode: { type: String },
  contact1: { type: String },
  contact2: { type: String },
  emergencyContact: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', staffSchema);
