const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const roles = {
  Admin: 'admin',
  LabStaff: 'lab-staff',
  Physician: 'physician',
};

const users = [
  {
    username: 'admin',
    password: 'admin',
    role: roles.Admin,
  },
  {
    username: 'physician',
    password: 'physician',
    role: roles.Physician,
  },
  {
    username: 'physician1',
    password: 'physician1',
    role: roles.Physician,
  },
  {
    username: 'physician2',
    password: 'physician2',
    role: roles.Physician,
  },
  {
    username: 'lab_staff',
    password: 'lab_staff',
    role: roles.LabStaff,
  },
];

const getCredentials = (userRole) => {
  const user = users.find((a) => a.role === userRole);
  return {
    username: user.username,
    password: user.password,
  };
};

const findNewRecords = (oldItems, newItems, prop) => {
  const records = newItems.filter(
    (newItem) => !oldItems.some((oldItem) => oldItem[prop] === newItem[prop]),
  );
  return records;
};

module.exports = {
  upload,
  roles,
  users,
  getCredentials,
  findNewRecords,
};
