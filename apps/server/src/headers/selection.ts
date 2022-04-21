import { HeaderRequest, HeaderTest } from '@sdc-libs/types';
import { isCorrectEdition } from '../filters';
import { select } from '../selection';

export function selectTest(tests: HeaderTest[], request: HeaderRequest) {
  const filters = [
    isCorrectEdition<HeaderTest>(request.edition, (t) => t.targeting.edition),
  ];

  return select(tests, filters);
}
