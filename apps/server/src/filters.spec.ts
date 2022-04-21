import { ArticleCountSettings, Edition } from '@sdc-libs/types';
import { isCorrectEdition, isWithinArticleCountSettings } from './filters';

describe('isCorrectEdition', () => {
  it('matches if the editions are the same', () => {
    const filter = isCorrectEdition<Edition>('UK', id);
    const test = 'UK';

    expect(filter.match(test)).toBeTruthy();
  });

  it("doesn't matches if the editions aren't the same", () => {
    const filter = isCorrectEdition<Edition>('UK', id);
    const test = 'US' as const;

    expect(filter.match(test)).toBeFalsy();
  });
});

describe('isWithinArticleCountSettings', () => {
  it('matches if the article count is within the range', () => {
    const filter = isWithinArticleCountSettings<ArticleCountSettings>(10, id);
    const test = {
      min: 5,
      max: 15,
    };

    expect(filter.match(test)).toBeTruthy();
  });

  it("doesn't match if the article count is less than the range", () => {
    const filter = isWithinArticleCountSettings<ArticleCountSettings>(5, id);
    const test = {
      min: 10,
    };

    expect(filter.match(test)).toBeFalsy();
  });

  it("doesn't match if the article count is more than the range", () => {
    const filter = isWithinArticleCountSettings<ArticleCountSettings>(15, id);
    const test = {
      min: 0,
      max: 10,
    };

    expect(filter.match(test)).toBeFalsy();
  });
});

// ---- Utils ---- //

const id = <T>(t: T) => t;
