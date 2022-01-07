import logger from "../logger";
import { Request, Response, NextFunction } from "express";

export default (error: any, _req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Server error" });
  logger.error(error.message);
  next(error);
};
