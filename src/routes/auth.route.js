const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/authenticate', userController.authenticateUser);
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { roles } = require('../utils/helper');

router.get(
  '/physician/',
  [auth, checkRole([roles.Admin])],
  userController.getAllPhysicians,
);

router.post(
  '/update-physician/:id',
  [auth, checkRole([roles.Admin])],
  userController.updatePhysician,
);

router.delete(
  '/physician/:id',
  [auth, checkRole([roles.Admin])],
  userController.deletePhysician,
);

module.exports = router;
