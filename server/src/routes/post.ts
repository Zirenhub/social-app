import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt";
import postController from "../controllers/postController";

const postRouter: Router = Router();

postRouter.post("/", verifyJwt, postController.create);

export { postRouter };
