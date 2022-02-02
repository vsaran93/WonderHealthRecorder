process.env.NODE_ENV = 'test';

const request = require('supertest');
const path = require('path');

const app = require('../src/app');

const agent = request.agent(app);
const conn = require('../src/config/db');
const { roles, getCredentials } = require('../src/utils/helper');

const physicanCredentials = getCredentials(roles.Physician);
const adminCredentials = getCredentials(roles.Admin);
const labStaffCredentials = getCredentials(roles.LabStaff);
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

describe('Patient Controller with Lab staff', () => {
  beforeAll(loginUser(auth, labStaffCredentials));

  test('Lab staff does not have permission to create patient', (done) => {
    agent
        .post('/api/v1/patient/create')
        .set('Content-Type', 'application/json')
        .set('auth-token', auth.token)
        .send({ name: 'patient c', birthDate: '1990-07-07' })
        .expect(401)
        .then((res) => {
            done();
        })
        .catch((err) => {
            done(err);
        })
    });

    test('Lab staff does not have permission to view Patients information', (done) => {
      agent
        .get('/api/v1/patient')
        .set('auth-token', auth.token)
        .expect(401)
        .then((res) => {
          done();
        })
        .catch((err) => {
          done(err);
        })
    });

    test('Lab staff can upload lab test result', (done) => {
      agent
        .post('/api/v1/patient/upload/lab-test-result')
        .set('Content-Type', 'multipart/form-data')
        .set('auth-token', auth.token)
        .attach('document', path.resolve('./assets/patient_lab_result.csv'))
        .expect(200)
        .then((res) => {
            done();
        })
        .catch((err) => {
            done(err);
        })
    });
})

describe('Patient Controller with Admin', () => {
  beforeAll(loginUser(auth, adminCredentials));

  test('Admin does not have permission to create patient', (done) => {
    agent
        .post('/api/v1/patient/create')
        .set('Content-Type', 'application/json')
        .set('auth-token', auth.token)
        .send({ name: 'patient c', birthDate: '1990-07-07' })
        .expect(401)
        .then((res) => {
            done();
        })
        .catch((err) => {
            done(err);
        })
    });

    test('Admin can view Patients information', (done) => {
      agent
        .get('/api/v1/patient')
        .set('auth-token', auth.token)
        .expect(200)
        .then((res) => {
          expect(res.body.data.length).toBe(0);
          done();
        })
        .catch((err) => {
          done(err);
        })
    });

    test('Admin cannot upload lab results', (done) => {
      agent
        .post('/api/v1/patient/upload/lab-test-result')
        .set('Content-Type', 'multipart/form-data')
        .set('auth-token', auth.token)
        .attach('document', path.resolve('./assets/patient_lab_result.csv'))
        .expect(401)
        .then((res) => {
            done();
        })
        .catch((err) => {
            done(err);
        })
    });
})

describe('Patient Controller with Physican', () => {

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
        })
        .catch((err) => {
            done(err);
        })
    });

    test('it validate the name property of create patient request body', (done) => {
      agent
          .post('/api/v1/patient/create')
          .set('Content-Type', 'application/json')
          .set('auth-token', auth.token)
          .send({ birthDate: '1990-07-07' })
          .expect(400)
          .then((res) => {
              expect(JSON.parse(res.error.text).msg).toEqual("\"name\" is required")
              done();
          })
          .catch((err) => {
              done(err);
          })
      });

  test('Get All Patients', (done) => {
    agent
      .get('/api/v1/patient')
      .set('auth-token', auth.token)
      .expect(200)
      .then((res) => {
        expect(res.body.data.length).toBe(0);
        done();
      })
      .catch((err) => {
        done(err);
      })
  });

  test('physician cannot upload lab results', (done) => {
    agent
      .post('/api/v1/patient/upload/lab-test-result')
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', auth.token)
      .attach('document', path.resolve('./assets/patient_lab_result.csv'))
      .expect(401)
      .then((res) => {
          done();
      })
      .catch((err) => {
          done(err);
      })
  });
});

