import { Request, Response } from "express";

const home = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Welcome to the Express TypeScript API!" });
};

export default { home };
