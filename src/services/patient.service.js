const httpStatus = require('http-status');
const Patient = require('../models/patient.model');
const PatientLabResult = require('../models/patient-lab-result.model');
const KnowledgeBase = require('../models/knowledge-base.model');
const ApiError = require('../utils/ApiError');
const { findNewRecords } = require('../utils/helper');

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
    return Patient.remove({ _id: patientId });
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

const newRecordsWithScore = async (labResults) => {
  const newResults = [];
  const knowledgeBaseScores = await KnowledgeBase.find();
  labResults.forEach((labResult) => {
    const baseScore = knowledgeBaseScores.find(
      (knowledgeBaseScore) => (knowledgeBaseScore.blood_test_result === labResult.blood_test_result
      && knowledgeBaseScore.swab_test_result === labResult.swab_test_result),
    );
    newResults.push({
      ...labResult,
      score: baseScore ? baseScore.score : null,
    });
  });
  return newResults;
};

const savePatientLabTestResults = async (req, res, resultsData) => {
  try {
    if (resultsData && resultsData.length > 0) {
      const labResults = await PatientLabResult.find();
      const data = findNewRecords(labResults, resultsData, 'patient_id');
      const resultsWithScores = await newRecordsWithScore(data);
      await PatientLabResult.insertMany(resultsWithScores, { ordered: false });
    }
    res.status(httpStatus.OK).json({ msg: 'saved successfully' });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

const viewLabTestResults = async () => {
  try {
    return PatientLabResult.find();
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
  savePatientLabTestResults,
  viewLabTestResults,
};
