import { BannerRequest, BannerTest, Edition } from '@sdc-libs/types';

interface Filter {
  match: (test: BannerTest) => boolean;
}

export const isCorrectEdition = (edition: Edition): Filter => ({
  match: (test) => test.targeting.edition === edition,
});

export function selectTest(
  tests: BannerTest[],
  request: BannerRequest
): BannerTest | undefined {
  const filters = [isCorrectEdition(request.edition)];

  return tests.find((t) => filters.every((f) => f.match(t)));
}
