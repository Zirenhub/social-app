import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/error";
import { ApiResponse } from "@shared/index";

export function errorMiddleware(
  error: HttpException | Error,
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
) {
  const status = error instanceof HttpException ? error.status : 500;
  const message =
    error instanceof HttpException ? error.message : "Internal Server Error";
  const details = error instanceof HttpException ? error.details : undefined;

  const errorResponse: ApiResponse<null> = {
    success: false,
    data: null,
    error: {
      message,
      ...(details && { details }),
    },
  };

  res.status(status).json(errorResponse);
}

export default errorMiddleware;
