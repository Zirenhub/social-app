import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt";
import profileController from "../controllers/profileController";

const profileRouter: Router = Router();

// Get all friend requests for the authenticated user
profileRouter.get(
  "/friend-requests",
  verifyJwt,
  profileController.getAllFriendRequests
);

// Get a specific user's profile by username
profileRouter.get("/:username", verifyJwt, profileController.getProfile);

// Send a friend request to a specific user
profileRouter.post(
  "/:username/friend-requests",
  verifyJwt,
  profileController.sendFriendRequest
);

// Accept a friend request from a specific user
profileRouter.put(
  "/:username/friend-requests",
  verifyJwt,
  profileController.acceptFriendRequest
);

// Delete a friend request sent to a specific user
profileRouter.delete(
  "/:username/friend-requests",
  verifyJwt,
  profileController.deleteFriendRequest
);

// Delete a friendship from a specific user
profileRouter.delete(
  "/:username/friendship",
  verifyJwt,
  profileController.deleteFriendship
);

profileRouter.get(
  "/:username/friendship",
  verifyJwt,
  profileController.getProfileFriendships
);

export { profileRouter };
