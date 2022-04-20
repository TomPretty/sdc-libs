import { getApp } from './server';
import * as supertest from 'supertest';
import {
  bannerRequestFactory,
  bannerTestFactory,
  headerRequestFactory,
} from '@sdc-libs/factories';
import { BannerTest } from '@sdc-libs/types';

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

describe('/banner', () => {
  it('returns a banner if there is one that matches the targeting', async () => {
    const app = getApp({
      getBannerTests: getBannerTests(
        bannerTestFactory.build({
          name: 'EXAMPLE_TEST',
          targeting: { edition: 'UK' },
        })
      ),
    });
    const request = supertest(app);
    const bannerRequest = bannerRequestFactory.build({ edition: 'UK' });

    const response = await request.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.banner.meta.testName).toBe('EXAMPLE_TEST');
  });

  it("doesn't return a banner if there isn't one that matches the targeting", async () => {
    const app = getApp({
      getBannerTests: getBannerTests(
        bannerTestFactory.build({
          targeting: { edition: 'UK' },
        })
      ),
    });
    const request = supertest(app);
    const bannerRequest = bannerRequestFactory.build({ edition: 'AU' });

    const response = await request.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body.banner).toEqual({});
  });

  it('returns a 400 for an invalid payload', async () => {
    const bannerRequest = { foo: 'bar' };

    const response = await request.post('/banner').send(bannerRequest);

    expect(response.statusCode).toBe(400);
  });
});

// ---- Utils ---- //

const getBannerTests = (test: BannerTest) => () => Promise.resolve([test]);
