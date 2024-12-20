import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt";
import postController from "../controllers/postController";

const postRouter: Router = Router();

postRouter.get("/", verifyJwt, postController.getAll);
postRouter.post("/", verifyJwt, postController.create);
postRouter.post("/like/:postId", verifyJwt, postController.postLike);
// postRouter.post("/comment/:postId");
postRouter.get("/:username", verifyJwt, postController.getProfilePosts);
postRouter.get("/:username/likes", verifyJwt, postController.getProfileLikes);
postRouter.get("/:username/:postId", verifyJwt, postController.getProfilePost);

export { postRouter };
