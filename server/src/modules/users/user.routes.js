import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import * as controller from "./user.controller.js";

export const userRouter = Router();

userRouter.get("/", asyncHandler(controller.list));
userRouter.post("/", asyncHandler(controller.create));
