import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import { publicWriteLimiter } from "../../middleware/rateLimit.js";
import { validateId } from "../../middleware/validateId.js";
import * as controller from "./lead.controller.js";

export const publicLeadRouter = Router();
publicLeadRouter.post("/", publicWriteLimiter, asyncHandler(controller.submit));

export const adminLeadRouter = Router();
adminLeadRouter.get("/", asyncHandler(controller.list));
adminLeadRouter.get("/export", asyncHandler(controller.exportCsv));
adminLeadRouter.get("/:id", validateId(), asyncHandler(controller.getById));
adminLeadRouter.patch("/:id", validateId(), asyncHandler(controller.update));
adminLeadRouter.delete("/:id", validateId(), asyncHandler(controller.remove));
