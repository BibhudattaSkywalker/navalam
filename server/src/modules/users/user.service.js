import { LIMITS, ROLES } from "../../config/constants.js";
import { badRequest } from "../../core/errors.js";
import { paginate } from "../../core/pagination.js";
import { hashPassword } from "../../core/security.js";
import { clean, isEmail } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { User } from "./user.model.js";

/** The only user fields that ever leave the server. */
export function toPublicUser(user) {
  return { id: String(user._id), email: user.email, name: user.name, role: user.role };
}

export async function listUsers(query) {
  const { docs, pagination } = await paginate(User, {}, query);
  return { users: docs.map(toPublicUser), pagination };
}

export async function createUser(input, actor) {
  const email = clean(input?.email, 180).toLowerCase();
  const name = clean(input?.name, 80);
  const password = String(input?.password ?? "");
  const role = input?.role === ROLES.SUPER_ADMIN ? ROLES.SUPER_ADMIN : ROLES.CONTENT_MANAGER;

  if (!name || !isEmail(email) || password.length < LIMITS.MIN_PASSWORD) {
    throw badRequest(`Add a name, email, and a password of at least ${LIMITS.MIN_PASSWORD} characters.`);
  }

  const user = await User.create({ email, name, role, passwordHash: hashPassword(password) });
  await recordAudit(actor, "create", "user", user._id, `Added ${email} as ${role}`);
  return toPublicUser(user);
}
