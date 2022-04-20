import { bannerRequestFactory, bannerTestFactory } from '@sdc-libs/factories';
import {
  isCorrectEdition,
  isWithinArticleCountSettings,
  selectTest,
} from './bannerSelection';

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

describe('isWithinArticleCountSettings', () => {
  it('matches if the article count is within the range', () => {
    const filter = isWithinArticleCountSettings(10);
    const test = bannerTestFactory.build({
      targeting: {
        articleCountSettings: {
          min: 5,
          max: 15,
        },
      },
    });

    expect(filter.match(test)).toBeTruthy();
  });

  it("doesn't match if the article count is less than the range", () => {
    const filter = isWithinArticleCountSettings(5);
    const test = bannerTestFactory.build({
      targeting: {
        articleCountSettings: {
          min: 10,
        },
      },
    });

    expect(filter.match(test)).toBeFalsy();
  });

  it("doesn't match if the article count is more than the range", () => {
    const filter = isWithinArticleCountSettings(15);
    const test = bannerTestFactory.build({
      targeting: {
        articleCountSettings: {
          max: 10,
        },
      },
    });

    expect(filter.match(test)).toBeFalsy();
  });
});
