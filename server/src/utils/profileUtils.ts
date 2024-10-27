import { HttpException } from "../exceptions/error";
import { HTTP_RESPONSE_CODE } from "../constants/constant";
import {
  Friendship,
  Profile,
  TAuthUserApi,
  TFriendshipStatus,
  TProfileApi,
  TProfileBase,
} from "@shared";
import client from "../prisma";
import { TProfileWithRelations } from "../types/profile";

export const fetchProfileByUsername = async (
  username: string,
  currentUserProfileId: number
): Promise<TProfileWithRelations> => {
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

export const getFriendshipStatus = (
  profile: TProfileWithRelations
): TProfileApi => {
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

type Friendships = {
  createdAt: Date;
  id: number;
  profile: TProfileWithRelations;
}[];

type ProfileWithFriendships = {
  friendsAdded: Array<{ friend: TProfileWithRelations } & Friendship>;
  friendOf: Array<{ profile: TProfileWithRelations } & Friendship>;
};

export const fetchProfileWithFriendships = (
  username: string,
  currentUserProfileId: number
) => {
  return client.profile.findUniqueOrThrow({
    where: { username },
    include: {
      friendOf: {
        include: {
          profile: {
            include: {
              friendsAdded: { where: { friendId: currentUserProfileId } },
              friendOf: { where: { profileId: currentUserProfileId } },
              sentRequests: { where: { receiverId: currentUserProfileId } },
              receivedRequests: { where: { senderId: currentUserProfileId } },
            },
            omit: { userId: true },
          },
        },
      },
      friendsAdded: {
        include: {
          friend: {
            include: {
              friendsAdded: { where: { friendId: currentUserProfileId } },
              friendOf: { where: { profileId: currentUserProfileId } },
              sentRequests: { where: { receiverId: currentUserProfileId } },
              receivedRequests: { where: { senderId: currentUserProfileId } },
            },
            omit: { userId: true },
          },
        },
      },
    },
  });
};

export const combineFriendships = (
  profile: ProfileWithFriendships
): Friendships => {
  const fromFriendsAdded = profile.friendsAdded.map(
    ({ createdAt, id, friend }) => ({
      createdAt,
      id,
      profile: friend,
    })
  );

  const fromFriendOf = profile.friendOf.map(({ createdAt, id, profile }) => ({
    createdAt,
    id,
    profile,
  }));

  return [...fromFriendsAdded, ...fromFriendOf];
};
