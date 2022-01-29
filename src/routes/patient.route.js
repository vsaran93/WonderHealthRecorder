const express = require('express');

const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.get('/', patientController.getPatients);

router.get('/:id', patientController.getPatientById);

router.post('/create', patientController.createPatient);

router.put('/update/:id', patientController.updatePatient);

router.delete('/remove/:id', patientController.deletePatient);

module.exports = router;
