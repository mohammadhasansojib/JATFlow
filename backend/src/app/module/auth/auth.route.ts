import express from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../middleware/zodValidation.js";
import { LoginSchema, RegisterSchema } from "./auth.schema.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", validateRequest(RegisterSchema), authController.register)
router.post("/login", validateRequest(LoginSchema), authController.login)

// authenticated routes
router.post("/logout", auth(), authController.logout)

const authRouters = router;
export default authRouters;