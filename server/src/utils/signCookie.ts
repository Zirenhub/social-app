import { TAuthUserApi } from "@shared";
import { Response } from "express";
import jwt from "jsonwebtoken";

const signCookie = (res: Response, user: TAuthUserApi) => {
  res.clearCookie("token");
  const token = jwt.sign(user, process.env.SECRET!);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export default signCookie;
