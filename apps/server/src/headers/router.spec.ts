import { headerRequestFactory } from '@sdc-libs/factories';
import { router } from './router';
import * as express from 'express';
import supertest = require('supertest');

const app = express();
app.use('/header', router);

const st = supertest(app);

describe('/header', () => {
  it('returns a header for a valid payload', async () => {
    const headerRequest = headerRequestFactory.build();

    const response = await st.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(200);
  });

  it('returns a 400 for an invalid payload', async () => {
    const headerRequest = { foo: 'bar' };

    const response = await st.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(400);
  });
});
