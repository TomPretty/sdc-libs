import { headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { validate } from '../validation';

export const router = express.Router();

router.post('/', express.json(), validate(headerRequestSchema), (req, res) => {
  res.json({ header: 'Thank you' });
});
