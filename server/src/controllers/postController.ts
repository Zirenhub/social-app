import { Prisma, ZPost } from "@shared";
import { Request, Response, NextFunction } from "express";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";
import z from "zod";
import { validateCurrentUserProfile } from "../utils/profileUtils";

const postIdSchema = z
  .string()
  .regex(/^\d+$/, { message: "Post id must be a valid number" })
  .transform((val) => parseInt(val, 10))
  .refine((val) => val > 0, { message: "Post id must be a positive number" });

// Separate filters for unique and many queries
const getPostBaseInclude = () => ({
  profile: { omit: { userId: true } },
  likes: true,
  comments: true,
});

// For findMany queries
const getPostsFilter = (where?: Prisma.PostWhereInput) => {
  return {
    ...(where && { where }),
    include: getPostBaseInclude(),
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
  };
};

// For findUnique queries
const getUniquePostFilter = (where: Prisma.PostWhereUniqueInput) => {
  return {
    where,
    include: getPostBaseInclude(),
  };
};

// Types for the return values
type PostWithRelations = Prisma.PostGetPayload<
  ReturnType<typeof getPostsFilter>
>;

const hasLiked = (post: PostWithRelations, userProfileId: number) => ({
  ...post,
  hasLiked: post.likes.some((like) => like.profileId === userProfileId),
});

const togglePostLike = async (postId: number, userProfileId: number) => {
  // Use a transaction to ensure consistency
  return await client.$transaction(async (tx) => {
    // Find existing like
    const existingLike = await tx.like.findUnique({
      where: {
        profileId_postId: {
          profileId: userProfileId,
          postId,
        },
      },
    });

    // Toggle like status
    if (existingLike) {
      await tx.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await tx.like.create({
        data: {
          postId,
          profileId: userProfileId,
        },
      });
    }

    // Fetch and return updated post
    const updatedPost = await tx.post.findUniqueOrThrow({
      ...getUniquePostFilter({ id: postId }),
    });

    return hasLiked(updatedPost, userProfileId);
  });
};

const getPosts = async ({
  where,
  userProfileId,
}: {
  where?: Prisma.PostWhereInput;
  userProfileId: number;
}) => {
  const posts = await client.post.findMany(getPostsFilter(where));
  const postsWithHasLiked = posts.map((post) => hasLiked(post, userProfileId));
  return postsWithHasLiked;
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userProfile = validateCurrentUserProfile(req.user);
    const all = await getPosts({ userProfileId: userProfile.id });
    sendSuccessResponse(res, all);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = ZPost.parse(req.body);
    const profile = validateCurrentUserProfile(req.user);
    const newPost = await client.post.create({
      data: { ...validatedData, profileId: profile.id },
      include: {
        profile: { omit: { userId: true } },
        likes: true,
        comments: true,
      },
    });
    sendSuccessResponse(res, newPost);
  } catch (err) {
    next(err);
  }
};

const getProfilePosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const profile = await client.profile.findUniqueOrThrow({
      where: { username },
    });
    const userProfile = validateCurrentUserProfile(req.user);
    const all = await getPosts({
      where: { profileId: profile.id },
      userProfileId: userProfile.id,
    });

    sendSuccessResponse(res, all);
  } catch (err) {
    next(err);
  }
};

const getProfilePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const validatedPostId = await postIdSchema.parseAsync(postId);
    const userProfile = validateCurrentUserProfile(req.user);
    const post = await client.post.findUniqueOrThrow(
      getUniquePostFilter({ id: validatedPostId })
    );

    sendSuccessResponse(res, hasLiked(post, userProfile.id));
  } catch (err) {
    next(err);
  }
};

const postLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const profile = validateCurrentUserProfile(req.user);
    const validatedPostId = await postIdSchema.parseAsync(postId);
    const updatedPost = await togglePostLike(validatedPostId, profile.id);

    sendSuccessResponse(res, updatedPost);
  } catch (err) {
    next(err);
  }
};

const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
  } catch (err) {
    next(err);
  }
};

export default { create, getAll, getProfilePosts, getProfilePost, postLike };
