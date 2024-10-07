import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../utils/responseHandler";
import {
  fetchProfileByUsername,
  validateCurrentUserProfile,
  ensureNotSelfRequest,
  canSendFriendRequest,
  getFriendshipStatus,
} from "../utils/profileUtils";
import client from "../prisma";
import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
import { TProfileApi } from "@shared";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.params.username;
    const currentUserProfileId = validateCurrentUserProfile(req.user);

    const profile = await client.profile.findUniqueOrThrow({
      where: { username },
      include: {
        receivedRequests: {
          where: {
            senderId: currentUserProfileId,
            status: "PENDING",
          },
          select: { id: true, status: true },
        },
        sentRequests: {
          where: {
            receiverId: currentUserProfileId,
            status: "PENDING",
          },
          select: { id: true, status: true },
        },
      },
      omit: { userId: true },
    });

    const { receivedRequests, sentRequests, ...profileData } = profile;

    const friendshipStatus = getFriendshipStatus(
      receivedRequests,
      sentRequests
    );

    sendSuccessResponse(res, { ...profileData, friendshipStatus });
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
    const requestProfile = await fetchProfileByUsername(requestUsername);
    const currentUserProfileId = validateCurrentUserProfile(req.user);

    ensureNotSelfRequest(currentUserProfileId, requestProfile.id);
    const canSend = await canSendFriendRequest(
      currentUserProfileId,
      requestProfile.id
    );

    if (!canSend) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        "A friend request already exists."
      );
    }

    const friendshipRequest = await client.friendRequest.create({
      data: {
        status: "PENDING",
        senderId: currentUserProfileId,
        receiverId: requestProfile.id,
      },
    });

    sendSuccessResponse(res, friendshipRequest);
  } catch (err) {
    next(err);
  }
};

const deleteFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestUsername = req.params.username;
    const requestProfile = await fetchProfileByUsername(requestUsername);
    const currentUserProfileId = validateCurrentUserProfile(req.user);

    ensureNotSelfRequest(currentUserProfileId, requestProfile.id);

    await client.friendRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: currentUserProfileId,
          receiverId: requestProfile.id,
        },
      },
    });

    sendSuccessResponse(res, null);
  } catch (err) {
    next(err);
  }
};

export default { get, friendRequest, deleteFriendRequest };
