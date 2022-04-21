import { Edition } from '@sdc-libs/types';
import { isCorrectEdition, isWithinArticleCountSettings } from './filters';
import { select } from './selection';

describe('select', () => {
  it('selects a test if all the filters match', () => {
    const test = {
      edition: 'UK',
      articleCountSettings: {
        min: 5,
      },
    } as const;

    const filters = [
      isCorrectEdition<typeof test>('UK', (t) => t.edition),
      isWithinArticleCountSettings<typeof test>(
        10,
        (t) => t.articleCountSettings
      ),
    ];

    const result = select([test], filters);

    expect(result).toBe(test);
  });

  it('selects the first test where all the filters match', () => {
    const tests: { name: string; edition: Edition }[] = [
      {
        name: 'T1',
        edition: 'AU',
      },
      {
        name: 'T2',
        edition: 'UK',
      },
      {
        name: 'T3',
        edition: 'UK',
      },
    ];

    const filters = [
      isCorrectEdition<typeof tests[number]>('UK', (t) => t.edition),
    ];

    const result = select(tests, filters);

    expect(result?.name).toBe('T2');
  });

  it("doesn't select a test if the targeting doesn't match", () => {
    const test = {
      edition: 'AU',
    } as const;

    const filters = [isCorrectEdition<typeof test>('UK', (t) => t.edition)];

    const result = select([test], filters);

    expect(result).toBeUndefined();
  });
});
