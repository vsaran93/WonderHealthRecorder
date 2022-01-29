const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientLabResultSchema = new Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true,
  },
  blood_test_result: {
    type: String,
    required: true,
  },
  swab_test_result: {
    type: String,
    required: true,
  },
}, {
  timestamps: false,
});

const PatientLabResult = mongoose.model('PatientLabResult', patientLabResultSchema);

module.exports = PatientLabResult;
