import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import { validateId } from "../../middleware/validateId.js";
import * as controller from "./cause.controller.js";

export const publicCauseRouter = Router();
publicCauseRouter.get("/", asyncHandler(controller.listPublic));
publicCauseRouter.get("/:slug", asyncHandler(controller.getBySlug));

export const adminCauseRouter = Router();
adminCauseRouter.get("/", asyncHandler(controller.listAdmin));
adminCauseRouter.post("/", asyncHandler(controller.create));
adminCauseRouter.get("/:id", validateId(), asyncHandler(controller.getById));
adminCauseRouter.put("/:id", validateId(), asyncHandler(controller.update));
adminCauseRouter.delete("/:id", validateId(), asyncHandler(controller.remove));
