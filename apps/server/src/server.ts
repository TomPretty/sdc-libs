import { BannerTest, HeaderTest } from '@sdc-libs/types';
import * as express from 'express';
import { getRouter as getBannerRouter } from './banner-assignment/router';
import { getRouter as getHeaderRouter } from './header-assignment/router';

interface AppOptions {
  getHeaderTests: () => Promise<HeaderTest[]>;
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getApp({ getHeaderTests, getBannerTests }: AppOptions) {
  const app = express();

  app.use('/header-assignment', getHeaderRouter({ getHeaderTests }));

  app.use('/banner-assignment', getBannerRouter({ getBannerTests }));

  return app;
}
