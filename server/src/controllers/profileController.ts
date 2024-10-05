import { Request, Response, NextFunction } from "express";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";
import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";

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

const friendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestUsername = req.params.username;
    const requestUser = await client.profile.findUniqueOrThrow({
      where: { username: requestUsername },
      omit: { userId: true },
    });
    const currentUserId = req.user?.id; // should never be undefined as we are checking it inside verifyJWT middleware
    if (!currentUserId) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        "Invalid username passed."
      );
    }
    const friendshipRequest = await client.friendRequest.create({
      data: {
        status: "PENDING",
        senderId: currentUserId,
        receiverId: requestUser.id,
      },
    });
    sendSuccessResponse(res, friendshipRequest);
  } catch (err) {
    next(err);
  }
};

export default { get, friendRequest };
