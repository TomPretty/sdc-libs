import { HeaderRequest, HeaderTest } from '@sdc-libs/types';
import { headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { validate } from '../validation';

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
      const test = selectHeader(tests, body);

      if (!test) {
        return res.json({ header: {} });
      }

      res.json({
        header: {
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

  return router;
}

function selectHeader(tests: HeaderTest[], request: HeaderRequest) {
  const test = tests[0];

  return test;
}
