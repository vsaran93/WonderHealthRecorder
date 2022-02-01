process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../src/app');

const agent = request.agent(app);
const conn = require('../src/config/db');
const { roles, getCredentials } = require('../src/utils/helper');

const physicanCredentials = getCredentials(roles.Physician);
let auth = {};

beforeAll(async () => await conn.connect());
beforeEach(async () => await conn.clear());
afterAll(async () => await conn.close());


const loginUser = (auth, credentials) => {
    return (done) => {
        onResponse = (err, res) => {
            auth.token = res.body.data.token;
            done();
        }

        agent
            .post('/api/v1/user/authenticate')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .end(onResponse);
    }
}

describe('Patient Controller', () => {

  beforeAll(loginUser(auth, physicanCredentials));

  test('Create a Patient', (done) => {
    agent
        .post('/api/v1/patient/create')
        .set('Content-Type', 'application/json')
        .set('auth-token', auth.token)
        .send({ name: 'patient1', birthDate: '1990-07-07' })
        .expect(200)
        .then((res) => {
            expect(res.body.data).toHaveProperty('_id');
            expect(res.body.data).toHaveProperty('name');
            expect(res.body.data).toHaveProperty('birthDate');
            expect(res.body.data.name).toEqual('patient1');
            done();
        });
    });

  test('Get All Patients', (done) => {
    agent
      .get('/api/v1/patient')
      .set('auth-token', auth.token)
      .expect(200)
      .then((res) => {
        expect(res.body.data.length).toBe(0);
        done();
      });
  });
});

