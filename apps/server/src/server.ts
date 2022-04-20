import { BannerTest } from '@sdc-libs/types';
import { headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { validate } from './validation';
import { getRouter as getBannerRouter } from './banners/router';

interface AppOptions {
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getApp({ getBannerTests }: AppOptions) {
  const app = express();

  app.post(
    '/header',
    express.json(),
    validate(headerRequestSchema),
    (req, res) => {
      res.json({ header: 'Thank you' });
    }
  );

  app.use('/banner', getBannerRouter({ getBannerTests }));

  return app;
}
