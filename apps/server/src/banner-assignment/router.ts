import { BannerTest } from '@sdc-libs/types';
import { bannerRequestSchema } from '@sdc-libs/validation';
import * as express from 'express';
import { Request, Response } from 'express';
import { validate } from '../validation';
import { getCreate } from './controller';

interface RouterOptions {
  getBannerTests: () => Promise<BannerTest[]>;
}

export function getRouter({ getBannerTests }: RouterOptions) {
  const router = express.Router();

  router.post(
    '/',
    express.json(),
    validate(bannerRequestSchema),
    makeJsonEndpoint(getCreate(getBannerTests))
  );

  return router;
}

// ---- Utils ---- //

const makeJsonEndpoint =
  <Req, Res>(controllerAction: (req: Req) => Promise<Res>) =>
  async (req: Request, res: Response) => {
    const json = await controllerAction(req.body as Req);
    res.json(json);
  };
