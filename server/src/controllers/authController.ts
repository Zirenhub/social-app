import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
};

const signup = (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
};

export default { login, signup };
