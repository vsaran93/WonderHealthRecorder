const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patient.controller');
const fileUploadController = require('../controllers/file-upload.controller');
const patientService = require('../services/patient.service');
const { upload, roles } = require('../utils/helper');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.get(
  '/',
  [auth, checkRole([roles.Admin, roles.Physician])],
  patientController.getPatients,
);

router.get(
  '/:id',
  [auth, checkRole([roles.Admin, roles.Physician])],
  patientController.getPatientById,
);

router.post(
  '/create',
  [auth, checkRole([roles.Physician])],
  patientController.createPatient,
);

router.put(
  '/update/:id',
  [auth, checkRole([roles.Admin, roles.Physician])],
  patientController.updatePatient,
);

router.delete(
  '/remove/:id',
  [auth, checkRole([roles.Admin])],
  patientController.deletePatient,
);

router.post(
  '/upload/lab-test-result',
  upload.single('document'),
  [auth, checkRole([roles.LabStaff])],
  (req, res) => {
    fileUploadController.uploadFile(req, res, patientService.savePatientLabTestResults);
  },
);

router.get(
  '/lab-test-results',
  [auth, checkRole([roles.Admin, roles.LabStaff])],
  patientController.viewLabTestResults,
);

module.exports = router;
