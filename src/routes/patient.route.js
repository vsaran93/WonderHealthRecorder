const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patient.controller');
const fileUploadController = require('../controllers/file-upload.controller');
const patientService = require('../services/patient.service');
const { upload } = require('../utils/helper');

router.get('/', patientController.getPatients);

router.get('/:id', patientController.getPatientById);

router.post('/create', patientController.createPatient);

router.put('/update/:id', patientController.updatePatient);

router.delete('/remove/:id', patientController.deletePatient);

router.post(
  '/upload/lab-test-result',
  upload.single('document'),
  (req, res) => {
    fileUploadController.uploadFile(req, res, patientService.savePatientLabTestResults);
  },
);
module.exports = router;
