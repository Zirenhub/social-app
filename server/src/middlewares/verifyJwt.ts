import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { HttpException } from "../exceptions/error";
import { Profile, User } from "@prisma/client";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new HttpException(401, "No token provided");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as User & {
      profile: Profile;
    }; // Type the JWT payload
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");

    if (err instanceof jwt.JsonWebTokenError) {
      if (err.name === "TokenExpiredError") {
        throw new HttpException(401, "Token expired");
      } else {
        throw new HttpException(401, "Invalid token");
      }
    }

    // For any other unexpected errors
    throw new HttpException(500, "Failed to authenticate token");
  }
};

export default verifyJwt;
