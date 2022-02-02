const express = require('express');

const router = express.Router();

const fileUploadController = require('../controllers/file-upload.controller');
const knowledgeBaseService = require('../services/knowledge-base.service');
const { upload, roles } = require('../utils/helper');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post(
  '/upload',
  upload.single('document'),
  [auth, checkRole([roles.Admin])],
  (req, res) => {
    fileUploadController.uploadFile(req, res, knowledgeBaseService.saveKnowledgeBaseResults);
  },
);

module.exports = router;
