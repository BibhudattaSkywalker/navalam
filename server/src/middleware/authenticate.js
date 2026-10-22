import { SESSION } from "../config/constants.js";
import { findUserBySessionToken } from "../modules/auth/auth.service.js";
import { asyncHandler } from "../core/asyncHandler.js";
import { forbidden, unauthorized } from "../core/errors.js";

/** Resolves the signed-in user (if any) for every request. Never rejects on its own. */
export const attachUser = asyncHandler(async (req, _res, next) => {
  req.user = await findUserBySessionToken(req.cookies?.[SESSION.COOKIE]);
  next();
});

export function requireAuth(req, _res, next) {
  next(req.user ? undefined : unauthorized());
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role)) return next(forbidden());
    next();
  };
}
