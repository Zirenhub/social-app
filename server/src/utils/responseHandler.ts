import { Response } from "express";
import { ApiResponse } from "@shared/index";

export function sendSuccessResponse<T>(
  res: Response,
  data: T,
  status: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    error: null,
  };
  res.status(status).json(response);
}
