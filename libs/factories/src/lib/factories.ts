import { BannerRequest, HeaderRequest } from '@sdc-libs/types';
import { Factory } from 'fishery';

export const headerRequestFactory = Factory.define<HeaderRequest>(() => ({
  edition: 'UK',
}));

export const bannerRequestFactory = Factory.define<BannerRequest>(() => ({
  articleCount: 0,
  edition: 'UK',
}));
