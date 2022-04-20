import { HeaderRequest } from '@sdc-libs/types';
import { Factory } from 'fishery';

export const headerRequestFactory = Factory.define<HeaderRequest>(() => ({
  articleCount: 0,
  edition: 'UK',
}));
