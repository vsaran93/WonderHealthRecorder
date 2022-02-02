const httpStatus = require('http-status');
const KnowledgeBase = require('../models/knowledge-base.model');
const { findNewRecords } = require('../utils/helper');

const saveKnowledgeBaseResults = async (req, res, resultsData) => {
  try {
    if (resultsData && resultsData.length > 0) {
      const knowledgeResults = await KnowledgeBase.find();
      const data = findNewRecords(knowledgeResults, resultsData, 'kb_code');
      await KnowledgeBase.insertMany(data, { ordered: false });
    }
    res.status(httpStatus.OK).json({ msg: 'saved successfully' });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

module.exports = {
  saveKnowledgeBaseResults,
};
