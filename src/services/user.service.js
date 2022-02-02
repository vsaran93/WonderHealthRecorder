/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { tokenSecret } = require('../config/var');
const User = require('../models/user.model');
const { roles } = require('../utils/helper');
const ApiError = require('../utils/ApiError');

const userWithoutPassword = (user) => {
  const newUser = { ...user };
  if (user && user.password) {
    delete newUser.password;
    return newUser;
  }
  return user;
};

const authenticateUser = async (userData) => {
  try {
    const user = await User.findOne({ username: userData.username, password: userData.password });
    if (user) {
      const authToken = jwt.sign({ id: user._id, role: user.role }, tokenSecret);
      return {
        user: userWithoutPassword(user),
        token: authToken,
      };
    }
    return false;
  } catch (e) {
    console.log('there is an error', e);
    return false;
  }
};

const getAllPhysicians = async () => {
  try {
    return User.find({ role: roles.Physician });
  } catch (e) {
    console.log('there is an error', e);
    return false;
  }
};

const updatePhysician = async (userId, userData) => {
  try {
    const physician = await User.findById(userId);
    if (!physician) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Physician not found');
    }
    return User.updateOne(
      { _id: userId },
      userData,
    );
  } catch (e) {
    console.log('there is an error', e);
    return false;
  }
};

const deletePhysician = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user && user.role === roles.Physician) {
      return User.remove({ _id: userId }, true);
    }
    throw new ApiError(httpStatus.NOT_FOUND, 'Physician not found');
  } catch (e) {
    console.log('there is an error', e);
    return false;
  }
};

module.exports = {
  authenticateUser,
  getAllPhysicians,
  updatePhysician,
  deletePhysician,
};
