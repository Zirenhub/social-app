import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../utils/responseHandler";
import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
import client from "../prisma";
import {
  ensureNotSelfRequest,
  fetchProfileByUsername,
  getFriendshipStatus,
  validateCurrentUserProfile,
} from "../utils/profileUtils";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const currentUserProfile = validateCurrentUserProfile(req.user);
    const profile = await fetchProfileByUsername(
      username,
      currentUserProfile.id
    );
    sendSuccessResponse(res, getFriendshipStatus(profile));
  } catch (err) {
    next(err);
  }
};

const sendFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserProfile = validateCurrentUserProfile(req.user);
    const { username: requestUsername } = req.params;
    ensureNotSelfRequest(currentUserProfile.username, requestUsername);

    const requestProfile = await fetchProfileByUsername(
      requestUsername,
      currentUserProfile.id
    );
    const profileWithFriendship = getFriendshipStatus(requestProfile);

    if (profileWithFriendship.friendshipStatus.status !== "NOT_FRIENDS") {
      throw new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        "A relationship already exists."
      );
    }

    const sentRequest = await client.friendRequest.create({
      data: { senderId: currentUserProfile.id, receiverId: requestProfile.id },
    });

    profileWithFriendship.friendshipStatus = {
      status: "REQUEST_SENT",
      requestId: sentRequest.id,
    };
    sendSuccessResponse(res, profileWithFriendship);
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
    const currentUserProfile = validateCurrentUserProfile(req.user);
    const { username: requestUsername } = req.params;
    ensureNotSelfRequest(currentUserProfile.username, requestUsername);

    const requestProfile = await fetchProfileByUsername(
      requestUsername,
      currentUserProfile.id
    );
    const profileWithFriendship = getFriendshipStatus(requestProfile);

    if (
      !profileWithFriendship.friendshipStatus.requestId ||
      !["RECEIVED_REQUEST", "REQUEST_SENT"].includes(
        profileWithFriendship.friendshipStatus.status
      )
    ) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND,
        "Friend request not found."
      );
    }

    await client.friendRequest.delete({
      where: { id: profileWithFriendship.friendshipStatus.requestId },
    });

    profileWithFriendship.friendshipStatus = {
      status: "NOT_FRIENDS",
      requestId: null,
    };
    sendSuccessResponse(res, profileWithFriendship);
  } catch (err) {
    next(err);
  }
};

const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserProfile = validateCurrentUserProfile(req.user);
    const { username: requestUsername } = req.params;
    ensureNotSelfRequest(currentUserProfile.username, requestUsername);

    const requestProfile = await fetchProfileByUsername(
      requestUsername,
      currentUserProfile.id
    );
    const profileWithFriendship = getFriendshipStatus(requestProfile);

    if (
      !profileWithFriendship.friendshipStatus.requestId ||
      profileWithFriendship.friendshipStatus.status !== "RECEIVED_REQUEST"
    ) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND,
        "Friend request not found."
      );
    }

    const { requestId } = profileWithFriendship.friendshipStatus;

    const newFriendship = await client.$transaction(async (tx) => {
      await tx.friendRequest.delete({ where: { id: requestId } });
      return tx.friendship.create({
        data: { profileId: currentUserProfile.id, friendId: requestProfile.id },
      });
    });

    profileWithFriendship.friendshipStatus = {
      status: "FRIENDS",
      requestId: newFriendship.id,
    };
    sendSuccessResponse(res, profileWithFriendship);
  } catch (err) {
    next(err);
  }
};

const deleteFriendship = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserProfile = validateCurrentUserProfile(req.user);
    const { username: requestUsername } = req.params;
    ensureNotSelfRequest(currentUserProfile.username, requestUsername);

    const requestProfile = await fetchProfileByUsername(
      requestUsername,
      currentUserProfile.id
    );
    const profileWithFriendship = getFriendshipStatus(requestProfile);

    if (
      !profileWithFriendship.friendshipStatus.requestId ||
      profileWithFriendship.friendshipStatus.status !== "FRIENDS"
    ) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.NOT_FOUND,
        "Friendship not found."
      );
    }

    await client.friendship.delete({
      where: { id: profileWithFriendship.friendshipStatus.requestId },
    });

    profileWithFriendship.friendshipStatus = {
      status: "NOT_FRIENDS",
      requestId: null,
    };
    sendSuccessResponse(res, profileWithFriendship);
  } catch (err) {
    next(err);
  }
};

const getAllFriendRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserProfile = validateCurrentUserProfile(req.user);
    const allFriendRequests = await client.friendRequest.findMany({
      where: { receiverId: currentUserProfile.id },
      include: { sender: { omit: { userId: true } } },
    });

    sendSuccessResponse(res, allFriendRequests);
  } catch (err) {
    next(err);
  }
};

const getProfileFriendships = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username: requestUsername } = req.params;
    const profile = await client.profile.findUniqueOrThrow({
      where: { username: requestUsername },
      include: {
        friendOf: { include: { profile: { omit: { userId: true } } } },
        friendsAdded: { include: { friend: { omit: { userId: true } } } },
      },
    });

    const { friendsAdded, friendOf } = profile;
    const friendships = [
      ...friendsAdded.map((friend) => {
        const { createdAt, id, friend: profile } = friend;
        return { createdAt, id, profile };
      }),
      ...friendOf.map((friend) => {
        const { createdAt, id, profile } = friend;
        return { createdAt, id, profile };
      }),
    ];

    sendSuccessResponse(res, friendships);
  } catch (err) {
    next(err);
  }
};

export default {
  getProfile,
  sendFriendRequest,
  deleteFriendRequest,
  getAllFriendRequests,
  acceptFriendRequest,
  deleteFriendship,
  getProfileFriendships,
};
