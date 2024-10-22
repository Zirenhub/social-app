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
    const like = await client.like.create({
      data: { postId: validatedPostId, profileId: profile.id },
    });

    sendSuccessResponse(res, like);
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
