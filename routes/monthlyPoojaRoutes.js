const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/monthlyPoojaController');

// ✅ Log to confirm route file is loaded (check Render logs)
console.log('✅ monthlyPoojaRoutes.js loaded');

// ✅ Test route to manually check if file is active
router.get('/test', (req, res) => {
  res.send('✅ Monthly Pooja Route File Loaded');
});

// Persons
router.get('/persons', ctrl.getAllPersons);
router.post('/persons', ctrl.createPerson);
router.get('/persons/:id', ctrl.getPersonById);
router.put('/persons/:id', ctrl.updatePerson);
router.delete('/persons/:id', ctrl.deletePerson);

// Records
router.get('/persons/:id/records', ctrl.getRecordsByPerson);
router.post('/records', ctrl.createRecord);
router.put('/records/:id', ctrl.updateRecord);

module.exports = router;
