import { Router } from "express";
import { authRouter } from "./auth";
import { postRouter } from "./post";
import { profileRouter } from "./profile";

const apiRouter = Router()
  .use("/auth", authRouter)
  .use("/posts", postRouter)
  .use("/profile", profileRouter);

export default apiRouter;
