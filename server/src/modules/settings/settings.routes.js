import { Router } from "express";
import { ROLES } from "../../config/constants.js";
import { asyncHandler } from "../../core/asyncHandler.js";
import { requireRole } from "../../middleware/authenticate.js";
import * as controller from "./settings.controller.js";

export const publicSettingsRouter = Router();
publicSettingsRouter.get("/", asyncHandler(controller.get));

export const adminSettingsRouter = Router();
adminSettingsRouter.get("/", asyncHandler(controller.get));
adminSettingsRouter.put("/", requireRole(ROLES.SUPER_ADMIN), asyncHandler(controller.update));
