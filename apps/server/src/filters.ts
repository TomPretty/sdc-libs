import { ArticleCountSettings, Edition } from '@sdc-libs/types';

export interface Filter<T> {
  match: (test: T) => boolean;
}

export const isCorrectEdition = <T>(
  edition: Edition,
  extract: (t: T) => Edition
): Filter<T> => ({
  match: (test) => extract(test) === edition,
});

export const isWithinArticleCountSettings = <T>(
  articleCount: number,
  extract: (t: T) => ArticleCountSettings
): Filter<T> => ({
  match: (test) => {
    const { min, max } = extract(test);

    if (max) {
      return min <= articleCount && articleCount <= max;
    }
    return min <= articleCount;
  },
});
