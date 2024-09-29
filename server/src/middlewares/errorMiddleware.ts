import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/error";
import { ApiResponse } from "@shared";
import { Prisma } from "../prisma";
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from "../constants/constant";

export function errorMiddleware(
  error: HttpException | Error,
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
) {
  let status = HTTP_RESPONSE_CODE.SERVER_ERROR;
  let message = APP_ERROR_MESSAGE.serverError;
  let details;

  // Handle custom HTTP exceptions
  if (error instanceof HttpException) {
    status = error.status;
    message = error.message;
    details = error.details;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    status = HTTP_RESPONSE_CODE.BAD_REQUEST; // Default status for user input errors

    switch (error.code) {
      case "P2002":
        // Unique constraint violation
        message = APP_ERROR_MESSAGE.uniqueConstraintViolation;
        details = {
          field: error.meta?.target,
          message: `The value for ${error.meta?.target} is already in use.`,
        };
        status = HTTP_RESPONSE_CODE.CONFLICT;
        break;

      case "P2025":
        // An operation failed because it depends on one or more records that were required but not found.
        message = APP_ERROR_MESSAGE.userDoesntExist;
        details = {
          field: error.meta?.target,
          message: error.message,
        };
        status = HTTP_RESPONSE_CODE.NOT_FOUND;
        break;

      default:
        message = "A database error occurred.";
        details = error.message;
        break;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // Handle validation errors
    status = 400;
    message = "Invalid input data.";
    details = error.message;
  }

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
