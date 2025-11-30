import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/profile", authenticate, authController.getProfile);

export default router;

