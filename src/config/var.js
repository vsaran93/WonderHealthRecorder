require('dotenv').config();

module.exports = {
  env: process.env.ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGODB_URL,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
  },
};
