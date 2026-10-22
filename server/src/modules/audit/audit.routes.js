import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import * as controller from "./audit.controller.js";

export const auditRouter = Router();

auditRouter.get("/", asyncHandler(controller.list));
