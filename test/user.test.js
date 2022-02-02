process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../src/app');

const agent = request.agent(app);
const conn = require('../src/config/db');
const User = require('../src/models/user.model');
const { roles, getCredentials, users } = require('../src/utils/helper');
const { loginUser } = require('../src/utils/auth.test.helper');

const adminCredentials = getCredentials(roles.Admin);

const auth = {};

beforeAll(async () => await conn.connect());
beforeEach(async () => await conn.clear());
afterAll(async () => await conn.close());

let physician = {};
describe('check admin has the accessbility to perform physician related actions', () => {
  beforeAll(async () => {
    await User.deleteMany();
    await User.create(users);
    physician = await User.findOne({ role: roles.Physician });
  });

  beforeEach(loginUser(auth, adminCredentials));
  test('can view all physicians informations', (done) => {
    agent
      .get('/api/v1/user/physician')
      .set('auth-token', auth.token)
      .expect(200)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('can update a physician information', (done) => {
    const patientId = physician._id.toString();
    agent
      // eslint-disable-next-line no-underscore-dangle
      .put(`/api/v1/user/update-physician/${patientId}`)
      .set('content-type', 'application/json')
      .set('auth-token', auth.token)
      .send({ username: 'test' })
      .expect(200)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('can delete a physician', (done) => {
    const patientId = physician._id.toString();
    agent
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/api/v1/user/physician/${patientId}`)
      .set('auth-token', auth.token)
      .expect(200)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
