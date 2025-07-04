const mongoose = require('mongoose');

const MonthlyPoojaPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  poojaName: { type: String },
  phone: { type: String },
  nakshatra: { type: String },
  address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MonthlyPoojaPerson', MonthlyPoojaPersonSchema);
