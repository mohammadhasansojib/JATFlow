import express from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../middleware/zodValidation.js";
import { RegisterSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validateRequest(RegisterSchema), authController.register)
router.post("/login", authController.login)

// authenticated routes
router.post("/logout", authController.logout)

const authRouters = router;
export default authRouters;