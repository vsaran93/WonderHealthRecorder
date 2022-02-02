const httpStatus = require('http-status');
const userService = require('../services/user.service');

const authenticateUser = async (req, res) => {
  try {
    const user = await userService.authenticateUser(req.body);
    if (!user) {
      res.status(httpStatus.BAD_REQUEST).json({ msg: 'invalid username or password' });
    }
    res.status(httpStatus.OK).json({ data: user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const getAllPhysicians = async (req, res) => {
  try {
    const physicians = await userService.getAllPhysicians();
    res.status(httpStatus.OK).json({ data: physicians });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const updatePhysician = async (req, res) => {
  try {
    const user = await userService.updatePhysician(req.params.id, req.body);
    res.status(httpStatus.OK).json({ data: user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

const deletePhysician = async (req, res) => {
  try {
    const user = await userService.deletePhysician(req.params.id);
    res.status(httpStatus.OK).json({ data: user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'server error' });
  }
};

module.exports = {
  authenticateUser,
  getAllPhysicians,
  updatePhysician,
  deletePhysician,
};
