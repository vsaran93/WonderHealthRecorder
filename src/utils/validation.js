const Joi = require('joi');

const validateCreatePatient = (patient) => {
  const patientSchema = Joi.object().keys({
    name: Joi.string().required(),
    birthDate: Joi.date().required(),
  });
  return patientSchema.validate(patient);
};

const validateUpdatePatient = (patient) => {
  const patientSchema = Joi.object().keys({
    name: Joi.string(),
    birthDate: Joi.date(),
  });
  return patientSchema.validate(patient);
};

const validateUser = (user) => {
  const userSchema = Joi.object().keys({
    username: Joi.string,
    password: Joi.string,
  });
  return userSchema.validate(user);
};

module.exports = {
  validateCreatePatient,
  validateUpdatePatient,
  validateUser,
};
