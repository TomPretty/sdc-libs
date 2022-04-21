import {
  BannerRequest,
  BannerTest,
  HeaderRequest,
  HeaderTest,
} from '@sdc-libs/types';
import { Factory } from 'fishery';

export const headerRequestFactory = Factory.define<HeaderRequest>(() => ({
  edition: 'UK',
}));

export const headerTestFactory = Factory.define<HeaderTest>(() => ({
  name: 'EXAMPLE_TEST',
  targeting: {
    edition: 'UK',
  },
  copy: 'This is a header',
}));

export const bannerRequestFactory = Factory.define<BannerRequest>(() => ({
  articleCount: 0,
  edition: 'UK',
}));

export const bannerTestFactory = Factory.define<BannerTest>(() => ({
  name: 'EXAMPLE_TEST',
  targeting: {
    edition: 'UK',
    articleCountSettings: {
      min: 0,
    },
  },
  copy: {
    header: 'This is a banner',
    body: 'Give us lots of money',
  },
}));
