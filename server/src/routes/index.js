import { Router } from "express";
import { ROLES } from "../config/constants.js";
import { isDatabaseUp } from "../config/database.js";
import { attachUser, requireAuth, requireRole } from "../middleware/authenticate.js";
import { adminCauseRouter, publicCauseRouter } from "../modules/causes/cause.routes.js";
import { auditRouter } from "../modules/audit/audit.routes.js";
import { authRouter } from "../modules/auth/auth.routes.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.routes.js";
import { adminDonationRouter, paymentRouter, publicDonationRouter } from "../modules/donations/donation.routes.js";
import { adminLeadRouter, publicLeadRouter } from "../modules/leads/lead.routes.js";
import { adminPostRouter, publicPostRouter } from "../modules/posts/post.routes.js";
import { adminSettingsRouter, publicSettingsRouter } from "../modules/settings/settings.routes.js";
import { uploadRouter } from "../modules/uploads/upload.routes.js";
import { userRouter } from "../modules/users/user.routes.js";

const { SUPER_ADMIN } = ROLES;

/** Routes for the signed-in admin area, mounted under /api/admin. */
function buildAdminRouter() {
  const admin = Router();
  admin.use(requireAuth);

  admin.use("/dashboard", dashboardRouter);
  admin.use("/summary", dashboardRouter);
  admin.use("/uploads", uploadRouter);
  admin.use("/posts", adminPostRouter);
  admin.use("/causes", adminCauseRouter);
  admin.use("/leads", adminLeadRouter);
  admin.use("/donations", adminDonationRouter);
  admin.use("/settings", adminSettingsRouter);

  admin.use("/audit", requireRole(SUPER_ADMIN), auditRouter);
  admin.use("/users", requireRole(SUPER_ADMIN), userRouter);
  return admin;
}

/** Everything under /api. Public endpoints first, then the admin area. */
export function buildApiRouter() {
  const api = Router();
  api.use(attachUser);

  api.get("/health", (_req, res) => {
    res.json({ ok: true, database: isDatabaseUp() ? "up" : "down", uptime: Math.round(process.uptime()) });
  });

  api.use("/auth", authRouter);
  api.use("/posts", publicPostRouter);
  api.use("/causes", publicCauseRouter);
  api.use("/leads", publicLeadRouter);
  api.use("/donations", publicDonationRouter);
  api.use("/payments", paymentRouter);
  api.use("/settings", publicSettingsRouter);

  api.use("/admin", buildAdminRouter());
  return api;
}
