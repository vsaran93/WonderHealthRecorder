const csv = require('csvtojson');

const getFileData = async (fileData) => {
  try {
    const csvRows = await csv().fromFile(fileData.path);
    return csvRows;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getFileData,
};
