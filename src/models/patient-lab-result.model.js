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
  score: {
    type: String,
  },
}, {
  timestamps: false,
});

patientLabResultSchema.index(
  { patient_id: 1, blood_test_result: 1, swab_test_result: 1 },
  { unique: true },
);

const PatientLabResult = mongoose.model('PatientLabResult', patientLabResultSchema);

module.exports = PatientLabResult;
