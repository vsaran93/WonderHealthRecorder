const mongoose = require('../config/db');
const User = require('../models/user.model');
const { users } = require('../utils/helper');

mongoose.connect();

const getCurrentUsers = async () => User.find();

const removeCurrentUsers = async () => {
  await User.remove({});
};

getCurrentUsers().then(async (currentUsers) => {
  if (currentUsers && currentUsers.length) {
    await removeCurrentUsers();
  }
  users.map(async (defaultUser, index) => {
    await User.create(defaultUser);
    if (index === users.length - 1) {
      console.log('Users inserted successfully');
      mongoose.close();
      process.exit(1);
    }
  });
}).catch((e) => {
  console.log('There is an error', e);
  process.exit(1);
});
