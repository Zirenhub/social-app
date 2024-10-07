import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt";
import profileController from "../controllers/profileController";

const profileRouter: Router = Router();

profileRouter.get("/:username", verifyJwt, profileController.get);
profileRouter.post(
  "/:username/friend-request",
  verifyJwt,
  profileController.friendRequest
);
profileRouter.delete(
  "/:username/friend-request",
  verifyJwt,
  profileController.deleteFriendRequest
);

export { profileRouter };
