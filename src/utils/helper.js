const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const roles = {
  Admin: 'admin',
  LabStaff: 'lab-staff',
  Physician: 'physician',
};

module.exports = {
  upload,
  roles,
};
