import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;
const request = supertest(app);

describe('Sessions API', () => {
  let testUser;

  before(() => {
    // Generar los datos una sola vez
    const uniqueEmail = `testuser${Date.now()}@mail.com`;
    testUser = {
      first_name: 'Test',
      last_name: 'User',
      email: uniqueEmail,
      password: '123456'
    };
  });

  it('POST /api/sessions/register - debe registrar un usuario', async () => {
    const res = await request.post('/api/sessions/register').send(testUser);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.exist;
  });

  it('POST /api/sessions/login - debe loguear al usuario', async () => {
    const res = await request.post('/api/sessions/login').send({
      email: testUser.email,
      password: testUser.password
    });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Logged in');
  });
});