const express = require('express');
const router = express.Router();
const { 
  getDevotees, 
  getDevotee, 
  createDevotee, 
  updateDevotee, 
  deleteDevotee 
} = require('../controllers/devoteeController');
const protect = require('../middleware/auth');

router.get('/', protect, getDevotees);
router.get('/:id', protect, getDevotee);
router.post('/', protect, createDevotee);
router.put('/:id', protect, updateDevotee);
router.delete('/:id', protect, deleteDevotee);

module.exports = router;
