import { HeaderRequest, HeaderTest } from '@sdc-libs/types';
import { headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { assigned, notAssigned } from '../assignment';
import { validate } from '../validation';
import { selectTest } from './selection';

interface RouterOptions {
  getHeaderTests: () => Promise<HeaderTest[]>;
}

export function getRouter({ getHeaderTests }: RouterOptions) {
  const router = express.Router();

  router.post(
    '/',
    express.json(),
    validate(headerRequestSchema),
    async (req, res) => {
      const body = req.body as HeaderRequest;

      const tests = await getHeaderTests();
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
