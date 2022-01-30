/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config/var');
const { users } = require('../utils/helper');

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
    const user = users.find(
      (a) => a.username === userData.username && a.password === userData.password,
    );
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

module.exports = {
  authenticateUser,
};
