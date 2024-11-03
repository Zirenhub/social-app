import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../utils/responseHandler";
import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
import client from "../prisma";
import {
  combineFriendships,
  ensureNotSelfRequest,
  fetchProfileByUsername,
  fetchProfileWithFriendships,
  getFriendshipStatus,
  validateCurrentUserProfile,
} from "../utils/profileUtils";
import { TAuthUserApi, ZUpdate } from "@shared";
import signCookie from "../utils/signCookie";

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
    const { id } = validateCurrentUserProfile(req.user);

    const requestProfile = await fetchProfileWithFriendships(
      requestUsername,
      id
    );

    const requestProfileFriendships = combineFriendships(requestProfile);
    const friendshipRelationsToCurrentUser = requestProfileFriendships.map(
      (friend) => getFriendshipStatus(friend.profile)
    );

    sendSuccessResponse(res, friendshipRelationsToCurrentUser);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new HttpException(
        HTTP_RESPONSE_CODE.UNAUTHORIZED,
        "Invalid user session."
      );
    }
    const userProfile = validateCurrentUserProfile(req.user);
    const validatedData = ZUpdate.parse(req.body);
    const updatedProfile = await client.profile.update({
      where: { id_userId: { id: userProfile.id, userId: userProfile.userId } },
      data: { ...validatedData },
    });
    req.user.profile = updatedProfile;
    sendSuccessResponse(res, updatedProfile);
  } catch (err) {
    console.log(err);
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
  updateProfile,
};
