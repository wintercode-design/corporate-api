import { Request, Response } from "express";
import config from "../config/config";

export class CustomError extends Error {
  statusCode?: number;
  stack?: string | undefined;
  constructor(message: string, statusCode?: number, err?: Error) {
    super(message);
    this.stack = err?.stack;
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    error: config.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
