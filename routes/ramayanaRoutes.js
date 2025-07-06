const express = require('express');
const router = express.Router();
const controller = require('../controllers/ramayanaController');
const protect = require('../middleware/auth');

router.get('/', protect, controller.getAll);
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.update);
router.delete('/:id', protect, controller.remove);

module.exports = router;