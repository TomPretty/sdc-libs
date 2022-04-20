import { BannerRequest, BannerTest, HeaderRequest } from '@sdc-libs/types';
import { Factory } from 'fishery';

export const headerRequestFactory = Factory.define<HeaderRequest>(() => ({
  edition: 'UK',
}));

export const bannerRequestFactory = Factory.define<BannerRequest>(() => ({
  articleCount: 0,
  edition: 'UK',
}));

export const bannerTestFactory = Factory.define<BannerTest>(() => ({
  name: 'EXAMPLE_TEST',
  copy: {
    header: 'This is a banner',
    body: 'Give us lots of money',
  },
}));
