const mongoose = require('mongoose');

const devoteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  place: { type: String },
  pincode: { type: String },
  whatsappNumber: { type: String },
  secondaryNumber: { type: String },
  roles: {
    trustMember: { type: Boolean, default: false },
    nonTrustMember: { type: Boolean, default: false },
    common: { type: Boolean, default: false },
    executiveCommittee: { type: Boolean, default: false },
    kudumbam: { type: Boolean, default: false },
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('Devotee', devoteeSchema);
