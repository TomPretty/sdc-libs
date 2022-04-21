import { headerRequestFactory, headerTestFactory } from '@sdc-libs/factories';
import { getRouter } from './router';
import * as express from 'express';
import supertest = require('supertest');
import { HeaderTest } from '@sdc-libs/types';

const getHeaderTests = (test: HeaderTest) => () => Promise.resolve([test]);

const app = express();
app.use(
  '/header',
  getRouter({
    getHeaderTests: getHeaderTests(headerTestFactory.build()),
  })
);

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

// ---- Utils ---- //

// const getSuperTest = (router: express.Router) => {
//   const app = express();
//   app.use('/banner', router);
//   return supertest(app);
// };
