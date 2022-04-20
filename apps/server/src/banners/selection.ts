import { BannerRequest, BannerTest, Edition } from '@sdc-libs/types';

interface Filter {
  match: (test: BannerTest) => boolean;
}

export const isCorrectEdition = (edition: Edition): Filter => ({
  match: (test) => test.targeting.edition === edition,
});

export const isWithinArticleCountSettings = (articleCount: number): Filter => ({
  match: (test) => {
    const { min, max } = test.targeting.articleCountSettings;

    if (max) {
      return min <= articleCount && articleCount <= max;
    }
    return min <= articleCount;
  },
});

export function selectTest(
  tests: BannerTest[],
  request: BannerRequest
): BannerTest | undefined {
  const filters = [
    isCorrectEdition(request.edition),
    isWithinArticleCountSettings(request.articleCount),
  ];

  return tests.find((t) => filters.every((f) => f.match(t)));
}
