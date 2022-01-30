const httpStatus = require('http-status');

const checkRole = (roles) => (req, res, next) => {
  const userRole = req.user.role;
  if (userRole) {
    if (roles.length && !roles.includes(userRole)) {
      res.status(httpStatus.UNAUTHORIZED).json({ msg: 'You dont have permission' });
    }
    next();
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ msg: 'Bad Request' });
  }
};

module.exports = checkRole;
