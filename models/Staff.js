const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },  // Priest, Cleaner, Manager, etc
  contact: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', staffSchema);
