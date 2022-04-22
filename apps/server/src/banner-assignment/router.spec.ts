import { bannerRequestFactory, bannerTestFactory } from '@sdc-libs/factories';
import { BannerTest } from '@sdc-libs/types';
import { getRouter } from './router';
import * as express from 'express';
import supertest = require('supertest');

describe('/banner', () => {
  it('returns a banner if there is one that matches the targeting', async () => {
    const st = getSuperTest(
      getRouter({
        getBannerTests: getBannerTests(
          bannerTestFactory.build({
            name: 'EXAMPLE_TEST',
            targeting: { edition: 'UK' },
          })
        ),
      })
    );
    const bannerRequest = bannerRequestFactory.build({ edition: 'UK' });

    const response = await st.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.assigned).toBeTruthy();
  });

  it("doesn't return a banner if there isn't one that matches the targeting", async () => {
    const st = getSuperTest(
      getRouter({
        getBannerTests: getBannerTests(
          bannerTestFactory.build({
            name: 'EXAMPLE_TEST',
            targeting: { edition: 'UK' },
          })
        ),
      })
    );
    const bannerRequest = bannerRequestFactory.build({ edition: 'AU' });

    const response = await st.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.assigned).toBeFalsy();
  });

  it('returns a 400 for an invalid payload', async () => {
    const st = getSuperTest(
      getRouter({
        getBannerTests: getBannerTests(bannerTestFactory.build()),
      })
    );
    const bannerRequest = { foo: 'bar' };

    const response = await st.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(400);
  });
});

// ---- Utils ---- //

const getSuperTest = (router: express.Router) => {
  const app = express();
  app.use('/banner', router);
  return supertest(app);
};

const getBannerTests = (test: BannerTest) => () => Promise.resolve([test]);
