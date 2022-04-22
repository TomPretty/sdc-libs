import { HeaderTest } from '@sdc-libs/types';
import { headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { makeSimpleJsonEndpoint } from '../router';
import { validate } from '../validation';
import { getCreate } from './controller';

interface RouterOptions {
  getHeaderTests: () => Promise<HeaderTest[]>;
}

export function getRouter({ getHeaderTests }: RouterOptions) {
  const router = express.Router();

  router.post(
    '/',
    express.json(),
    validate(headerRequestSchema),
    makeSimpleJsonEndpoint(getCreate(getHeaderTests))
  );

  return router;
}
