import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";
import { HttpException } from "../exceptions/error";
import { UserSignUp } from "@shared";
import { HttpStatusCode } from "../constants/constant";

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
    const validatedData = UserSignUp.parse({
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
    });

    // delete the hashed password
    const { passwordHash, ...userResponse } = newUserWithProfile;
    sendSuccessResponse(res, userResponse);
  } catch (error) {
    next(error);
  }
};

export default { login, signup };
