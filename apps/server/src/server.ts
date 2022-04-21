import { BannerTest, HeaderTest } from '@sdc-libs/types';
import * as express from 'express';
import { getRouter as getBannerRouter } from './banners/router';
import { getRouter as getHeaderRouter } from './headers/router';

interface AppOptions {
  getHeaderTests: () => Promise<HeaderTest[]>;
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getApp({ getHeaderTests, getBannerTests }: AppOptions) {
  const app = express();

  app.use('/header', getHeaderRouter({ getHeaderTests }));

  app.use('/banner', getBannerRouter({ getBannerTests }));

  return app;
}
