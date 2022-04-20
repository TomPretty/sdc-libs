import { BannerTest } from '@sdc-libs/types';
import { headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { validate } from './validation';
import { getRouter as getBannerRouter } from './banners/router';
import { router as headerRouter } from './headers/router';

interface AppOptions {
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getApp({ getBannerTests }: AppOptions) {
  const app = express();

  app.use('/header', headerRouter);

  app.use('/banner', getBannerRouter({ getBannerTests }));

  return app;
}
