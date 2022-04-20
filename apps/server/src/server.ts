import { BannerRequest, HeaderRequest } from '@sdc-libs/types';
import { bannerRequestSchema, headerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { validate } from './validation';

export const app = express();

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
  (req, res) => {
    const body = req.body as BannerRequest;

    console.log({ body });

    res.json({
      banner: {
        props: {
          copy: { header: 'This is a banner', body: 'Give us lots of money' },
        },
      },
    });
  }
);
