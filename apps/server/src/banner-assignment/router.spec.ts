import { bannerRequestFactory } from '@sdc-libs/factories';
import { getRouter } from './router';
import * as express from 'express';
import supertest = require('supertest');

describe('router', () => {
  const router = getRouter({ getBannerTests: () => Promise.resolve([]) });
  const app = express();
  app.use('/', router);
  const request = supertest(app);

  it('returns a 200 for a valid request', async () => {
    const bannerRequest = bannerRequestFactory.build();

    const response = await request.post('/').send(bannerRequest);

    expect(response.statusCode).toBe(200);
  });

  it('returns a 400 for an invalid payload', async () => {
    const bannerRequest = { foo: 'bar' };

    const response = await request.post('/').send(bannerRequest);

    expect(response.statusCode).toBe(400);
  });
});
