import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);

export default router;
