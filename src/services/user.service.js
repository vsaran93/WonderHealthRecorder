const jwt = require('jsonwebtoken');
const { token } = require('../config/var');
const { roles } = require('../utils/helper');

const users = [
  {
    _id: 1,
    username: 'admin',
    password: 'admin',
    role: roles.Admin,
  },
  {
    _id: 2,
    username: 'physician',
    password: 'physician',
    role: roles.Physician,
  },
  {
    _id: 3,
    username: 'lab_staff',
    password: 'lab_staff',
    role: roles.Physician,
  },
];

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
      const authToken = jwt.sign({}, token.secret);
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
