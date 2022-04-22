import { bannerRequestFactory, bannerTestFactory } from '@sdc-libs/factories';
import { BannerTest } from '@sdc-libs/types';
import { getCreate } from './controller';

describe('create', () => {
  it('returns a banner if there is one that matches the targeting', async () => {
    const test = bannerTestFactory.build({
      targeting: { edition: 'UK' },
    });
    const request = bannerRequestFactory.build({ edition: 'UK' });

    const create = getCreate(getBannerTests(test));

    const result = await create(request);

    expect(result.assigned).toBeTruthy();
  });

  it("doesn't return a banner if there isn't one that matches the targeting", async () => {
    const test = bannerTestFactory.build({
      targeting: { edition: 'UK' },
    });
    const request = bannerRequestFactory.build({ edition: 'US' });

    const create = getCreate(getBannerTests(test));

    const result = await create(request);

    expect(result.assigned).toBeFalsy();
  });
});

// ---- Utils ---- //

const getBannerTests = (test: BannerTest) => () => Promise.resolve([test]);
