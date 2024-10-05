import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt";
import profileController from "../controllers/profileController";

const profileRouter: Router = Router();

profileRouter.get("/:username", verifyJwt, profileController.get);
profileRouter.post("/:username", verifyJwt, profileController.friendRequest);

export { profileRouter };
