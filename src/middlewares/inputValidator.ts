import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import { ObjectSchema, ValidationError } from "yup";

export default (
  bodySchema: ObjectSchema<any> | null,
  paramsSchema?: ObjectSchema<any> | null
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (bodySchema) {
        await bodySchema.validate(req.body, { abortEarly: false });
      }
      if (paramsSchema) {
        await paramsSchema.validate(req.params, { abortEarly: false });
      }
      next();
    } catch (error: any) {
      const err: any = {};
      error.inner.forEach((e: ValidationError) => {
        err[(e as any).path] = e.message;
      });
      logger.error(err);
      res.status(400).json(err);
    }
  };
};