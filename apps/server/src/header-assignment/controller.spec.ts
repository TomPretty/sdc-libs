import { headerRequestFactory, headerTestFactory } from '@sdc-libs/factories';
import { HeaderTest } from '@sdc-libs/types';
import { getCreate } from './controller';

describe('create', () => {
  it('returns a header if there is one that matches the targeting', async () => {
    const test = headerTestFactory.build({
      targeting: { edition: 'UK' },
    });
    const request = headerRequestFactory.build({ edition: 'UK' });

    const create = getCreate(getHeaderTests(test));

    const result = await create(request);

    expect(result.assigned).toBeTruthy();
  });

  it("doesn't return a banner if there isn't one that matches the targeting", async () => {
    const test = headerTestFactory.build({
      targeting: { edition: 'UK' },
    });
    const request = headerRequestFactory.build({ edition: 'US' });

    const create = getCreate(getHeaderTests(test));

    const result = await create(request);

    expect(result.assigned).toBeFalsy();
  });
});

// ---- Utils ---- //

const getHeaderTests = (test: HeaderTest) => () => Promise.resolve([test]);
