import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);

export default router;
