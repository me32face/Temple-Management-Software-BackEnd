const express = require('express');
const router = express.Router();
const {
  getAllPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment
} = require('../controllers/oldPendingPaymentController');
const protect = require('../middleware/auth');

router.get('/', protect, getAllPayments);
router.get('/:id', protect, getPayment);
router.post('/', protect, createPayment);
router.put('/:id', protect, updatePayment);
router.delete('/:id', protect, deletePayment);

module.exports = router;
