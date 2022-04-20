import { getApp } from './server';
import * as supertest from 'supertest';
import { headerRequestFactory } from '@sdc-libs/factories';

const app = getApp({
  getBannerTests: () => Promise.resolve([]),
});

const request = supertest(app);

describe('/header', () => {
  it('returns a header for a valid payload', async () => {
    const headerRequest = headerRequestFactory.build();

    const response = await request.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(200);
  });

  it('returns a 400 for an invalid payload', async () => {
    const headerRequest = { foo: 'bar' };

    const response = await request.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(400);
  });
});
