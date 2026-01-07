
const request = require('supertest');
const app = require('../src/app');

describe('greet-app', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET / returns greeting', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Hello from greet-app/);
  });
});

