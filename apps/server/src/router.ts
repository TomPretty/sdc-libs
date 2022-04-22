import { Request, Response } from 'express';

type ControllerAction<Req, Res> = (req: Req) => Promise<Res>;

type Extract<Req> = (req: Request) => Req;

export const makeJsonEndpoint =
  <Req, Res>(
    controllerAction: ControllerAction<Req, Res>,
    extract: Extract<Req>
  ) =>
  async (req: Request, res: Response) => {
    const json = await controllerAction(extract(req));
    res.json(json);
  };

export const makeSimpleJsonEndpoint = <Req, Res>(
  controllerAction: ControllerAction<Req, Res>
) => makeJsonEndpoint(controllerAction, (req) => req.body);
