import { Router } from "express";
import authController from "../controllers/authController";
import verifyJwt from "../middlewares/verifyJwt";

const router: Router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);
router.get("/auth/whoami", verifyJwt, authController.whoami);

export default router;
