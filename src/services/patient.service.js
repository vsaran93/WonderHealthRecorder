const httpStatus = require('http-status');
const Patient = require('../models/patient.model');
const ApiError = require('../utils/ApiError');

const createPatient = async (patientData) => {
    try {
        return Patient.create(patientData);
    } catch (error) {
        console.log('patientService.createPatient', error);
    }
}

const updatePatient = async (patientId, patientData) => {
    try {
        const patient = await getPatientById(patientId);
        if (!patient) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
        }
        return Patient.updateOne(
            { _id: patientId },
            patientData,
            { upsert: true }
        );
    } catch (error) {
        console.log('patientService.updatePatient', error);
    }
}

const deletePatient = async (patientId) => {
    try {
        return Patient.remove({ _id: patientId }, true);
    } catch (error) {
        console.log('patientService.deletePatient', error);
    }
};

const getAllPatients = async () => {
    try {
        return Patient.find();
    } catch (error) {
        console.log('patientService.getAllPatients', error);
    }
}

const getPatientById = async (patientId) => {
    try {
        return Patient.findById(patientId);
    } catch (error) {
        console.log('patientService.getPatientById', error);
    }
}

module.exports = {
    createPatient,
    updatePatient,
    deletePatient,
    getAllPatients,
    getPatientById
}