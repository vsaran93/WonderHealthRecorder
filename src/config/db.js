const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mongo } = require('./var');

let mongoServer;

const connect = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    if (process.env.NODE_ENV === 'test') {
      await mongoose.disconnect();
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(mongoUri);
    } else {
      await mongoose.connect(mongo.uri);
      console.log('db connected');
    }
  } catch (e) {
    console.log('There is an issue in connecting db', e);
  }
};

const close = async () => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
  } catch (e) {
    console.log('There is an issue in disconnecting db', e);
  }
};

const clear = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports = { connect, close, clear };
