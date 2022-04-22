import { BannerTest } from '@sdc-libs/types';
import { bannerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { makeSimpleJsonEndpoint } from '../router';
import { validate } from '../validation';
import { getCreate } from './controller';

interface RouterOptions {
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getRouter({ getBannerTests }: RouterOptions) {
  const router = express.Router();

  router.post(
    '/',
    express.json(),
    validate(bannerRequestSchema),
    makeSimpleJsonEndpoint(getCreate(getBannerTests))
  );

  return router;
}
