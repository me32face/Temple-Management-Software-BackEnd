const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/monthlyPoojaController');

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
