import { headerRequestFactory } from '@sdc-libs/factories';
import { getRouter } from './router';
import * as express from 'express';
import supertest = require('supertest');

describe('/header', () => {
  const router = getRouter({ getHeaderTests: () => Promise.resolve([]) });
  const app = express();
  app.use('/', router);
  const request = supertest(app);

  it('returns a 200 for a valid request', async () => {
    const headerRequest = headerRequestFactory.build();

    const response = await request.post('/').send(headerRequest);

    expect(response.statusCode).toBe(200);
  });

  it('returns a 400 for an invalid payload', async () => {
    const headerRequest = { foo: 'bar' };

    const response = await request.post('/').send(headerRequest);

    expect(response.statusCode).toBe(400);
  });
});
