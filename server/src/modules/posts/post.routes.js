import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import { validateId } from "../../middleware/validateId.js";
import * as controller from "./post.controller.js";

export const publicPostRouter = Router();
publicPostRouter.get("/", asyncHandler(controller.listPublic));
publicPostRouter.get("/:slug", asyncHandler(controller.getBySlug));

export const adminPostRouter = Router();
adminPostRouter.get("/", asyncHandler(controller.listAdmin));
adminPostRouter.post("/", asyncHandler(controller.create));
adminPostRouter.get("/:id", validateId(), asyncHandler(controller.getById));
adminPostRouter.put("/:id", validateId(), asyncHandler(controller.update));
adminPostRouter.delete("/:id", validateId(), asyncHandler(controller.remove));
