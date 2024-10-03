import { Router } from "express";
import { authRouter } from "./auth";
import { postRouter } from "./post";

const apiRouter = Router().use("/auth", authRouter).use("/post", postRouter);

export default apiRouter;
