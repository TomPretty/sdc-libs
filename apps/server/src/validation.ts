import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// This is an express middleware (generator) for adding validation to
// an endpoint. It ensures that an endpoint function will only run if
// it has been provided with a valid request body. If an invalid body
// was provided, it will 'short circuit' and just return a 400 to the
// client.
export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      // We overwrite the body with the result of the call to `safeParse`.
      // This has the effect of filtering out any additional, unwanted
      // fields e.g if the user posts a valid body with an additional
      // `admin=true` field it won't be present in `result.data`.
      req.body = result.data;
      next();
    } else {
      res.sendStatus(400);
    }
  };
