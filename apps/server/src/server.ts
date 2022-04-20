import { BannerRequest, BannerTest, HeaderRequest } from '@sdc-libs/types';
import { bannerRequestSchema, headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { validate } from './validation';

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
      const body = req.body as HeaderRequest;

      console.log({ body });

      res.json({ header: 'Thank you' });
    }
  );

  app.post(
    '/banner',
    express.json(),
    validate(bannerRequestSchema),
    async (req, res) => {
      const body = req.body as BannerRequest;

      console.log({ body });

      const tests = await getBannerTests();
      const test = tests[0];

      res.json({
        banner: {
          meta: {
            testName: test.name,
          },
          props: {
            copy: test.copy,
          },
        },
      });
    }
  );

  return app;
}
