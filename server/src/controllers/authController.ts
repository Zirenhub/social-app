import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";
import { HttpException } from "../exceptions/error";
import { UserSignUp } from "@shared";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    next(err);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = UserSignUp.parse(req.body);
    const {
      username,
      firstName,
      lastName,
      bio,
      gender,
      day,
      month,
      year,
      email,
      password,
    } = validatedData;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const dateOfBirth = new Date(year, month, day);

    // Save the user in the database
    const newUserWithProfile = await prisma.user.create({
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
    });

    // delete the hashed password
    const { passwordHash, ...userResponse } = newUserWithProfile;

    sendSuccessResponse(res, userResponse);
  } catch (error) {
    next(error);
  }
};

export default { login, signup };
