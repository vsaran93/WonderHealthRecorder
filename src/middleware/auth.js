const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config/var');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(httpStatus.RESET_CONTENT);
    res.json({ msg: 'Data missing' });
  } else {
    jwt.verify(token, tokenSecret, (error, decoded) => {
      if (error) {
        res.status(httpStatus.BAD_REQUEST);
        res.json({ msg: 'invalid token' });
      }
      req.user = decoded;
      next();
    });
  }
};

module.exports = auth;
