import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/error";
import { ApiResponse } from "@shared";
import { Prisma } from "../prisma"; // Ensure the correct import for Prisma

export function errorMiddleware(
  error: HttpException | Error,
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
) {
  let status = 500;
  let message = "Internal server error.";
  let details;

  // Handle custom HTTP exceptions
  if (error instanceof HttpException) {
    status = error.status;
    message = error.message;
    details = error.details;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    status = 400; // Default status for user input errors
    if (error.code === "P2002") {
      // Unique constraint violation
      message = "A unique constraint violation occurred.";
      details = {
        field: error.meta?.target,
        message: `The value for ${error.meta?.target} is already in use.`,
      };
      status = 409; // Conflict
    } else {
      message = "A database error occurred.";
      details = error.message; // Or customize this further
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
