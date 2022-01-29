const mongoose = require('mongoose');
const { mongo } = require('./var');

const connect = async () => {
  try {
    await mongoose.connect(mongo.uri);
    console.log('db connected');
  } catch (e) {
    console.log('There is an issue in connecting db', e);
  }
};

module.exports = { connect };
