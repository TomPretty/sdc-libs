import { Filter } from './filters';

export function select<T>(tests: T[], filters: Filter<T>[]) {
  return tests.find((t) => filters.every((f) => f.match(t)));
}
