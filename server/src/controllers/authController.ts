import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import client from "../prisma";
import jwt from "jsonwebtoken";
import { sendSuccessResponse } from "../utils/responseHandler";
import { ZUserSignUp, ZUserLogIn } from "@shared";
import { HttpException } from "../exceptions/error";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE } from "../constants/constant";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = ZUserLogIn.parse(req.body);
    const user = await client.user.findUniqueOrThrow({
      where: { email },
      include: { profile: true },
    });
    const { passwordHash, ...userWithoutPassword } = user;

    const match = await bcrypt.compare(password, passwordHash);
    if (match) {
      const token = jwt.sign(userWithoutPassword, process.env.SECRET!, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      sendSuccessResponse(res, userWithoutPassword);
    } else {
      throw new HttpException(
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        APP_ERROR_MESSAGE.invalidCredentials
      );
    }
  } catch (err) {
    next(err);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = ZUserSignUp.parse({
      ...req.body,
      day: Number(req.body.day),
      month: Number(req.body.month),
      year: Number(req.body.year),
      username: req.body.username.toLowerCase(),
    });

    const { username, firstName, lastName, bio, gender, email, password } =
      validatedData;
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const dateOfBirth = new Date(
      validatedData.year,
      validatedData.month,
      validatedData.day
    );

    // Save the user in the database
    const newUserWithProfile = await client.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        profile: {
          create: {
            username,
            firstName,
            lastName,
            bio,
            gender,
            dateOfBirth,
          },
        },
      },
      include: {
        profile: true, // Include profile data in the response
      },
      omit: { passwordHash: true },
    });

    const token = jwt.sign(newUserWithProfile, process.env.SECRET!, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    sendSuccessResponse(res, newUserWithProfile);
  } catch (err) {
    next(err);
  }
};

const whoami = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      sendSuccessResponse(res, req.user);
    } else {
      throw new HttpException(
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        APP_ERROR_MESSAGE.serverError
      );
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    sendSuccessResponse(res, null);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default { login, signup, whoami, logout };
