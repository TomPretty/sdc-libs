import { bannerRequestFactory, bannerTestFactory } from '@sdc-libs/factories';
import { selectTest } from './selection';

describe('selectTest', () => {
  it('selects a test if the targeting matches', () => {
    const tests = [
      bannerTestFactory.build({
        name: 'EXAMPLE_TEST',
        targeting: { edition: 'UK' },
      }),
    ];

    const request = bannerRequestFactory.build({
      edition: 'UK',
    });

    const result = selectTest(tests, request);

    expect(result?.name).toBe('EXAMPLE_TEST');
  });

  it("doesn't selects a test if the targeting doesn't match", () => {
    const tests = [
      bannerTestFactory.build({
        name: 'EXAMPLE_TEST',
        targeting: { edition: 'UK' },
      }),
    ];

    const request = bannerRequestFactory.build({
      edition: 'US',
    });

    const result = selectTest(tests, request);

    expect(result).toBeUndefined();
  });
});
