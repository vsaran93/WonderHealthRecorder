const httpStatus = require('http-status');
const Patient = require('../models/patient.model');
const ApiError = require('../utils/ApiError');

const getPatientById = async (patientId) => {
  try {
    return Patient.findById(patientId);
  } catch (error) {
    throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wring');
  }
};

const createPatient = async (patientData) => {
  try {
    return Patient.create(patientData);
  } catch (error) {
    throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wring');
  }
};

const updatePatient = async (patientId, patientData) => {
  try {
    const patient = await getPatientById(patientId);
    if (!patient) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
    }
    return Patient.updateOne(
      { _id: patientId },
      patientData,
      { upsert: true },
    );
  } catch (error) {
    throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wring');
  }
};

const deletePatient = async (patientId) => {
  try {
    return Patient.remove({ _id: patientId }, true);
  } catch (error) {
    throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wring');
  }
};

const getAllPatients = async () => {
  try {
    return Patient.find();
  } catch (error) {
    throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wring');
  }
};

module.exports = {
  createPatient,
  updatePatient,
  deletePatient,
  getAllPatients,
  getPatientById,
};
