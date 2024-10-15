import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
import { TAuthUserApi, TFriendshipStatus, TProfileApi } from "@shared";
import client from "../prisma";
import { TGetProfile } from "../types/profile";

export const fetchProfileByUsername = async (
  username: string,
  currentUserProfileId: number
): Promise<TGetProfile> => {
  return client.profile.findUniqueOrThrow({
    where: { username },
    include: {
      friendsAdded: { where: { friendId: currentUserProfileId } },
      friendOf: { where: { profileId: currentUserProfileId } },
      sentRequests: { where: { receiverId: currentUserProfileId } },
      receivedRequests: { where: { senderId: currentUserProfileId } },
    },
    omit: { userId: true },
  });
};

// already done on verifyJwt middleware, but typing is not consistent on the next controller
export const validateCurrentUserProfile = (user: TAuthUserApi | undefined) => {
  if (!user?.profile) {
    throw new HttpException(
      HTTP_RESPONSE_CODE.UNAUTHORIZED,
      "Invalid user session."
    );
  }
  return user.profile;
};

export const ensureNotSelfRequest = (
  currentUserUsername: string,
  targetUsername: string
) => {
  if (currentUserUsername === targetUsername) {
    throw new HttpException(
      HTTP_RESPONSE_CODE.BAD_REQUEST,
      "You can't perform this action on your own profile."
    );
  }
};

export const getFriendshipStatus = (profile: TGetProfile): TProfileApi => {
  const {
    friendsAdded,
    friendOf,
    sentRequests,
    receivedRequests,
    ...profileData
  } = profile;
  const friendshipStatus: TFriendshipStatus = {
    status: "NOT_FRIENDS",
    requestId: null,
  };

  if (friendsAdded[0] || friendOf[0]) {
    friendshipStatus.status = "FRIENDS";
    friendshipStatus.requestId = (friendsAdded[0] || friendOf[0])?.id ?? null;
  } else if (receivedRequests[0]) {
    friendshipStatus.status = "REQUEST_SENT";
    friendshipStatus.requestId = receivedRequests[0].id;
  } else if (sentRequests[0]) {
    friendshipStatus.status = "RECEIVED_REQUEST";
    friendshipStatus.requestId = sentRequests[0].id;
  }

  return { ...profileData, friendshipStatus };
};
