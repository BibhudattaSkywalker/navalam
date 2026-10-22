import { SESSION } from "../../config/constants.js";
import { env } from "../../config/env.js";
import { unauthorized } from "../../core/errors.js";
import { toPublicUser } from "../users/user.service.js";
import { login, logout } from "./auth.service.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.cookieSecure,
  path: "/",
};

export async function signIn(req, res) {
  const { user, token } = await login(req.body ?? {});
  res.cookie(SESSION.COOKIE, token, { ...cookieOptions, maxAge: SESSION.TTL_MS });
  res.json({ user: toPublicUser(user) });
}

export async function signOut(req, res) {
  await logout(req.cookies?.[SESSION.COOKIE]);
  res.clearCookie(SESSION.COOKIE, cookieOptions);
  res.json({ ok: true });
}

export function currentUser(req, res) {
  if (!req.user) throw unauthorized();
  res.json({ user: toPublicUser(req.user) });
}
