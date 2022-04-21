import { BannerRequest, BannerTest } from '@sdc-libs/types';
import { isCorrectEdition, isWithinArticleCountSettings } from '../filters';

export function selectTest(
  tests: BannerTest[],
  request: BannerRequest
): BannerTest | undefined {
  const filters = [
    isCorrectEdition<BannerTest>(request.edition, (t) => t.targeting.edition),
    isWithinArticleCountSettings<BannerTest>(
      request.articleCount,
      (t) => t.targeting.articleCountSettings
    ),
  ];

  return tests.find((t) => filters.every((f) => f.match(t)));
}
