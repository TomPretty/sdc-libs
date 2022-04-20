import { app } from './server';
import * as supertest from 'supertest';
import {
  bannerRequestFactory,
  headerRequestFactory,
} from '@sdc-libs/factories';

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

describe('/banner', () => {
  it('returns a banner for a valid payload', async () => {
    const bannerRequest = bannerRequestFactory.build();

    const response = await request.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(200);
  });

  it('returns a 400 for an invalid payload', async () => {
    const bannerRequest = { foo: 'bar' };

    const response = await request.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(400);
  });
});
