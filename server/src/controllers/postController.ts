import { Prisma, Profile, ZPost } from "@shared";
import { Request, Response, NextFunction } from "express";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";
import z from "zod";

const postIdSchema = z
  .string()
  .regex(/^\d+$/, { message: "Post id must be a valid number" })
  .transform((val) => parseInt(val, 10))
  .refine((val) => val > 0, { message: "Post id must be a positive number" });

const getPosts = ({ profile }: { profile?: Profile }) => {
  const filter: Prisma.PostFindManyArgs = {
    include: {
      profile: { omit: { userId: true } },
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc", // newest first
    },
  };
  if (profile) {
    filter.where = { profileId: profile.id };
  }

  return client.post.findMany(filter);
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await getPosts({});
    sendSuccessResponse(res, all);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = ZPost.parse(req.body);
    const newPost = await client.post.create({
      data: { ...validatedData, profileId: req.user!.profile.id },
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
    const all = await getPosts({ profile });

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
    const post = await client.post.findUniqueOrThrow({
      where: { id: validatedPostId },
      include: {
        profile: { omit: { userId: true } },
        likes: true,
        comments: true,
      },
    });

    sendSuccessResponse(res, post);
  } catch (err) {
    next(err);
  }
};

export default { create, getAll, getProfilePosts, getProfilePost };
