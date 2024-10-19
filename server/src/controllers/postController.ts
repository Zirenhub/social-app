import { Prisma, Profile, ZPost } from "@shared";
import { Request, Response, NextFunction } from "express";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";

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

export default { create, getAll, getProfilePosts };
