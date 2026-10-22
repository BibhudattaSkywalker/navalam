import { Router } from "express";
import { ROLES } from "../../config/constants.js";
import { asyncHandler } from "../../core/asyncHandler.js";
import { requireRole } from "../../middleware/authenticate.js";
import { publicWriteLimiter } from "../../middleware/rateLimit.js";
import { validateId } from "../../middleware/validateId.js";
import * as donationController from "./donation.controller.js";
import * as paymentController from "./payment.controller.js";

/** Mounted at /api/donations */
export const publicDonationRouter = Router();
publicDonationRouter.post("/", publicWriteLimiter, asyncHandler(donationController.startDonation));
publicDonationRouter.get("/:id/receipt", validateId(), asyncHandler(donationController.receipt));

/** Mounted at /api/payments. The webhook is registered in app.js because it needs the raw body. */
export const paymentRouter = Router();
paymentRouter.post("/create-order", publicWriteLimiter, asyncHandler(donationController.startDonation));
paymentRouter.post("/verify", asyncHandler(paymentController.verify));
paymentRouter.post("/demo-confirm", publicWriteLimiter, asyncHandler(paymentController.demoConfirm));
paymentRouter.post("/demo-fail", publicWriteLimiter, asyncHandler(paymentController.demoFail));

/** Mounted at /api/admin/donations */
export const adminDonationRouter = Router();
adminDonationRouter.get("/", asyncHandler(donationController.list));
adminDonationRouter.get("/:id", validateId(), asyncHandler(donationController.getById));
adminDonationRouter.patch(
  "/:id",
  validateId(),
  requireRole(ROLES.SUPER_ADMIN),
  asyncHandler(donationController.changeStatus),
);
