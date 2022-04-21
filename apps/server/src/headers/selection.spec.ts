import { headerRequestFactory, headerTestFactory } from '@sdc-libs/factories';
import { selectTest } from './selection';

describe('selectHeader', () => {
  it('selects a test if the targeting matches', () => {
    const tests = [
      headerTestFactory.build({
        name: 'EXAMPLE_TEST',
        targeting: { edition: 'UK' },
      }),
    ];

    const request = headerRequestFactory.build({
      edition: 'UK',
    });

    const result = selectTest(tests, request);

    expect(result?.name).toBe('EXAMPLE_TEST');
  });

  it("doesn't selects a test if the targeting doesn't match", () => {
    const tests = [
      headerTestFactory.build({
        name: 'EXAMPLE_TEST',
        targeting: { edition: 'UK' },
      }),
    ];

    const request = headerRequestFactory.build({
      edition: 'US',
    });

    const result = selectTest(tests, request);

    expect(result).toBeUndefined();
  });
});
