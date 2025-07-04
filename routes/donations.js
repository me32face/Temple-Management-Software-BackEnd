const express = require('express');
const router = express.Router();
const {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
  getNextReceiptNumber 
} = require('../controllers/donationController');
const protect = require('../middleware/auth');

router.get('/', protect, getDonations);
router.get('/next-receipt', protect, getNextReceiptNumber);
router.get('/:id', protect, getDonation);
router.post('/', protect, createDonation);
router.put('/:id', protect, updateDonation);
router.delete('/:id', protect, deleteDonation);

module.exports = router;
