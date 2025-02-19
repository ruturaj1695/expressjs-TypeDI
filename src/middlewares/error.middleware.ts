import { Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import { APIError } from "../utils/api.error";

@Service()
export class ErrorMiddleware {
  error(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    const status = err instanceof APIError ? err.status : 500;
    res.status(status).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}
