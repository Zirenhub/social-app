import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { HttpException } from "../exceptions/error";
import { TAuthUser } from "@shared";
import { HTTP_RESPONSE_CODE } from "../constants/constant";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new HttpException(
      HTTP_RESPONSE_CODE.UNAUTHORIZED,
      "No token provided"
    );
  }

  try {
    const user = jwt.verify(token, process.env.SECRET!) as TAuthUser; // Type the JWT payload
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");

    if (err instanceof jwt.JsonWebTokenError) {
      if (err.name === "TokenExpiredError") {
        throw new HttpException(
          HTTP_RESPONSE_CODE.UNAUTHORIZED,
          "Token expired"
        );
      } else {
        throw new HttpException(
          HTTP_RESPONSE_CODE.UNAUTHORIZED,
          "Invalid token"
        );
      }
    }

    // For any other unexpected errors
    throw new HttpException(
      HTTP_RESPONSE_CODE.SERVER_ERROR,
      "Failed to authenticate token"
    );
  }
};

export default verifyJwt;
