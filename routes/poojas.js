const express = require('express');
const router = express.Router();
const { 
  getPoojas, 
  getPooja, 
  createPooja, 
  updatePooja, 
  deletePooja 
} = require('../controllers/poojaController');
const protect = require('../middleware/auth');

router.get('/', protect, getPoojas);
router.get('/:id', protect, getPooja);
router.post('/', protect, createPooja);
router.put('/:id', protect, updatePooja);
router.delete('/:id', protect, deletePooja);

module.exports = router;
