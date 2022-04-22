import { BannerRequest, BannerTest } from '@sdc-libs/types';
import { bannerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { assigned, notAssigned } from '../assignment';
import { validate } from '../validation';
import { selectTest } from './selection';

interface RouterOptions {
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getRouter({ getBannerTests }: RouterOptions) {
  const router = express.Router();

  router.post(
    '/',
    express.json(),
    validate(bannerRequestSchema),
    async (req, res) => {
      const body = req.body as BannerRequest;

      const tests = await getBannerTests();
      const test = selectTest(tests, body);

      if (!test) {
        return res.json(notAssigned());
      }

      res.json(
        assigned({
          meta: {
            testName: test.name,
          },
          props: {
            copy: test.copy,
          },
        })
      );
    }
  );

  return router;
}
