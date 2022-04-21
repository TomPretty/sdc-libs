import { headerRequestFactory, headerTestFactory } from '@sdc-libs/factories';
import { getRouter } from './router';
import * as express from 'express';
import supertest = require('supertest');
import { HeaderTest } from '@sdc-libs/types';

describe('/header', () => {
  it('returns a header if there is one that matches the targeting', async () => {
    const st = getSuperTest(
      getRouter({
        getHeaderTests: getHeaderTests(
          headerTestFactory.build({
            name: 'EXAMPLE_TEST',
            targeting: { edition: 'UK' },
          })
        ),
      })
    );
    const headerRequest = headerRequestFactory.build({ edition: 'UK' });

    const response = await st.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.header.meta.testName).toBe('EXAMPLE_TEST');
  });

  it("doesn't return a header if there isn't one that matches the targeting", async () => {
    const st = getSuperTest(
      getRouter({
        getHeaderTests: getHeaderTests(
          headerTestFactory.build({
            targeting: { edition: 'AU' },
          })
        ),
      })
    );
    const headerRequest = headerRequestFactory.build({ edition: 'UK' });

    const response = await st.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.header).toEqual({});
  });

  it('returns a 400 for an invalid payload', async () => {
    const st = getSuperTest(
      getRouter({
        getHeaderTests: getHeaderTests(headerTestFactory.build()),
      })
    );
    const headerRequest = { foo: 'bar' };

    const response = await st.post('/header').send(headerRequest);

    expect(response.statusCode).toBe(400);
  });
});

// ---- Utils ---- //

const getSuperTest = (router: express.Router) => {
  const app = express();
  app.use('/header', router);
  return supertest(app);
};

const getHeaderTests = (test: HeaderTest) => () => Promise.resolve([test]);
