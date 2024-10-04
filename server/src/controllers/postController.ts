import { ZPost } from "@shared";
import { Request, Response, NextFunction } from "express";
import client from "../prisma";
import { sendSuccessResponse } from "../utils/responseHandler";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await client.post.findMany({
      include: { profile: { omit: { userId: true } } },
    });
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
        profile: true, // Include profile data in the response
      },
    });
    sendSuccessResponse(res, newPost);
  } catch (err) {
    next(err);
  }
};

export default { create, getAll };
