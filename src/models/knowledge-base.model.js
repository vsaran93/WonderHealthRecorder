const mongoose = require('mongoose');

const { Schema } = mongoose;

const knowledgeBaseSchema = new Schema({
  kb_code: {
    type: String,
    required: true,
    unique: true,
  },
  blood_test_result: {
    type: String,
    required: true,
  },
  swab_test_result: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
}, {
  timestamps: false,
});

const KnowledgeBase = mongoose.model('KnowledgeBase', knowledgeBaseSchema);

module.exports = KnowledgeBase;
