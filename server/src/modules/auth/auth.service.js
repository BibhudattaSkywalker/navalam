import { SESSION } from "../../config/constants.js";
import { unauthorized } from "../../core/errors.js";
import { hashPassword, hashToken, newToken, verifyPassword } from "../../core/security.js";
import { clean } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { User } from "../users/user.model.js";
import { Session } from "./session.model.js";

// Verified against when the email is unknown, so response time does not reveal which emails exist.
const DECOY_HASH = hashPassword(newToken());

export async function login({ email, password }) {
  const user = await User.findOne({ email: clean(email, 180).toLowerCase() });
  const passwordOk = verifyPassword(String(password ?? ""), user?.passwordHash ?? DECOY_HASH);
  if (!user || !passwordOk) throw unauthorized("Email or password is incorrect.");

  const token = newToken();
  await Session.create({
    tokenHash: hashToken(token),
    userId: user._id,
    expiresAt: new Date(Date.now() + SESSION.TTL_MS),
  });
  await recordAudit(user, "login", "user", user._id, "Signed in");
  return { user, token };
}

export async function logout(token) {
  if (token) await Session.deleteMany({ tokenHash: hashToken(token) });
}

export async function findUserBySessionToken(token) {
  if (!token) return null;
  const session = await Session.findOne({ tokenHash: hashToken(token), expiresAt: { $gt: new Date() } });
  return session ? User.findById(session.userId) : null;
}
