import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

const validateParamsMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;

      const message = details.map((i) => i.message).join(',');

      res.status(422);
      res.json({ message });
    }
  };
};
export default validateParamsMiddleware;
