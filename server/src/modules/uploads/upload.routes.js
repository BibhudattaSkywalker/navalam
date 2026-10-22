import { Router } from "express";
import { asyncHandler } from "../../core/asyncHandler.js";
import * as controller from "./upload.controller.js";
import { imageUpload } from "./upload.middleware.js";

export const uploadRouter = Router();

uploadRouter.post("/", imageUpload, asyncHandler(controller.saveImage));
