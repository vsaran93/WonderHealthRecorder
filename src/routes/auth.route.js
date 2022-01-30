const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/authenticate', userController.authenticateUser);

module.exports = router;
