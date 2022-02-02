process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');

const agent = request.agent(app);

const loginUser = (auth, credentials) => (done) => {
  onResponse = (err, res) => {
    auth.token = res.body.data.token;
    done();
  };

  agent
    .post('/api/v1/user/authenticate')
    .set('Content-Type', 'application/json')
    .send(credentials)
    .end(onResponse);
};

module.exports = {
  loginUser,
};
