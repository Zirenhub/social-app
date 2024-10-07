import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
import { FriendRequestStatus, TAuthUserApi, TFriendshipStatus } from "@shared";
import client from "../prisma";

export const fetchProfileByUsername = async (username: string) => {
  return client.profile.findUniqueOrThrow({
    where: { username },
    omit: { userId: true }, // omit the related user id
  });
};

// already done on verifyJwt middleware, but typing is not consistent on the next controller
export const validateCurrentUserProfile = (user: TAuthUserApi | undefined) => {
  const currentUserProfileId = user?.profile.id;
  if (!currentUserProfileId) {
    throw new HttpException(
      HTTP_RESPONSE_CODE.BAD_REQUEST,
      "Invalid user session."
    );
  }
  return currentUserProfileId;
};

export const ensureNotSelfRequest = (
  currentUserProfileId: number,
  targetProfileId: number
) => {
  if (currentUserProfileId === targetProfileId) {
    throw new HttpException(
      HTTP_RESPONSE_CODE.BAD_REQUEST,
      "You can't perform this action on your own profile."
    );
  }
};

export const canSendFriendRequest = async (
  senderId: number,
  receiverId: number
) => {
  const existingRequest = await client.friendRequest.findFirst({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  return !existingRequest;
};

export const getFriendshipStatus = (
  receivedRequests: { id: number; status: FriendRequestStatus }[],
  sentRequests: { id: number; status: FriendRequestStatus }[]
): TFriendshipStatus => {
  const receivedRequest = receivedRequests[0];
  const sentRequest = sentRequests[0];

  if (receivedRequest?.status === "ACCEPTED") {
    return { status: "FRIENDS", requestId: receivedRequest.id };
  }

  if (sentRequest?.status === "ACCEPTED") {
    return { status: "FRIENDS", requestId: sentRequest.id };
  }

  if (receivedRequest?.status === "PENDING") {
    return { status: "RECEIVED_REQUEST", requestId: receivedRequest.id };
  }

  if (sentRequest?.status === "PENDING") {
    return { status: "SENT_REQUEST", requestId: sentRequest.id };
  }

  return { status: "NOT_FRIENDS", requestId: null };
};
