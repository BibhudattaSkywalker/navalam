import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import { loginLimiter } from "../../middleware/rateLimit.js";
import * as controller from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", loginLimiter, asyncHandler(controller.signIn));
authRouter.post("/logout", asyncHandler(controller.signOut));
authRouter.get("/me", asyncHandler(controller.currentUser));
