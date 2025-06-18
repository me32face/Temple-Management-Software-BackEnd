const express = require('express');
const router = express.Router();
const { 
  getStaff, 
  getOneStaff, 
  createStaff, 
  updateStaff, 
  deleteStaff 
} = require('../controllers/staffController');
const protect = require('../middleware/auth');

router.get('/', protect, getStaff);
router.get('/:id', protect, getOneStaff);
router.post('/', protect, createStaff);
router.put('/:id', protect, updateStaff);
router.delete('/:id', protect, deleteStaff);

module.exports = router;
