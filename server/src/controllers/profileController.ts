import { Request, Response, NextFunction } from "express";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.params.username;
    const profile = await client.profile.findUniqueOrThrow({
      where: { username },
      omit: { userId: true }, // omit the related user id, used to store email and pass
    });
    sendSuccessResponse(res, profile);
  } catch (err) {
    next(err);
  }
};

export default { get };
