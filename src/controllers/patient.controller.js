const httpStatus = require('http-status');
const patientService = require('../services/patient.service');

const createPatient = async (req, res) => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.status(httpStatus.CREATED).json({ data: patient });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    res.status(httpStatus.OK).json({ data: patient });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.status(httpStatus.OK).json({ data: patient });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.status(httpStatus.OK).json({ data: patients });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const deletePatient = async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.status(httpStatus.NO_CONTENT).json({ msg: 'Patient deleted' });
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

module.exports = {
  createPatient,
  updatePatient,
  getPatientById,
  getPatients,
  deletePatient,
};
