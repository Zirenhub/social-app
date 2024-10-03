import { Router } from "express";
import authController from "../controllers/authController";
import verifyJwt from "../middlewares/verifyJwt";

const authRouter: Router = Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.post("/logout", verifyJwt, authController.logout);
authRouter.get("/whoami", verifyJwt, authController.whoami);

export { authRouter };
