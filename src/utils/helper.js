const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const roles = {
  Admin: 'admin',
  LabStaff: 'lab-staff',
  Physician: 'physician',
};

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
    role: roles.LabStaff,
  },
];

const getCredentials = (userRole) => {
  const user =  users.find(a => a.role === userRole);
  return {
    username: user.username,
    password: user.password
  }
};

module.exports = {
  upload,
  roles,
  users,
  getCredentials
};
