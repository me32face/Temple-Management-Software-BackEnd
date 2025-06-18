const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 10000 } // start from 10000
});

module.exports = mongoose.model('Counter', counterSchema);
