import { BannerRequest, BannerTest } from '@sdc-libs/types';
import { bannerRequestSchema, headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { selectTest } from './bannerSelection';
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
      res.json({ header: 'Thank you' });
    }
  );

  app.post(
    '/banner',
    express.json(),
    validate(bannerRequestSchema),
    async (req, res) => {
      const body = req.body as BannerRequest;

      const tests = await getBannerTests();
      const test = selectTest(tests, body);

      if (!test) {
        return res.json({ banner: {} });
      }

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
