const fileUploadService = require('../services/file-upload.service');

const uploadFile = async (req, res, next) => {
  try {
    const data = await fileUploadService.getFileData(req.file);
    next(req, res, data);
  } catch (e) {
    res.status(500).json({ msg: 'There is an error in uploading file' });
  }
};

module.exports = {
  uploadFile,
};
