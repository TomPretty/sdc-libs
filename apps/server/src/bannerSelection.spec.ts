import { bannerRequestFactory, bannerTestFactory } from '@sdc-libs/factories';
import { isCorrectEdition, selectTest } from './bannerSelection';

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

  it("doesn't selects a test if the targeting doesn't matche", () => {
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

describe('isCorrectEdition', () => {
  it('matches if the editions are the same', () => {
    const filter = isCorrectEdition('UK');
    const test = bannerTestFactory.build({ targeting: { edition: 'UK' } });

    expect(filter.match(test)).toBeTruthy();
  });

  it("doesn't matches if the editions aren't the same", () => {
    const filter = isCorrectEdition('UK');
    const test = bannerTestFactory.build({ targeting: { edition: 'US' } });

    expect(filter.match(test)).toBeFalsy();
  });
});
