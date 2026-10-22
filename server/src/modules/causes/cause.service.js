import { CAUSE_STATUS, LIMITS, values } from "../../config/constants.js";
import { badRequest, notFound } from "../../core/errors.js";
import { paginate } from "../../core/pagination.js";
import { clean, oneOf, searchPattern, slugify } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { Donation } from "../donations/donation.model.js";
import { Cause } from "./cause.model.js";

const amount = (value, fallback = 0) => Math.max(0, Number(value ?? fallback) || 0);

function buildCauseData(input = {}, existing = null) {
  const title = clean(input.title || existing?.title, 200);
  if (!title) throw badRequest("Add a title.");

  const gallery = Array.isArray(input.gallery)
    ? input.gallery.map(String).slice(0, LIMITS.MAX_GALLERY_IMAGES)
    : existing?.gallery || [];

  return {
    title,
    slug: slugify(input.slug || existing?.slug || title) || `cause-${Date.now()}`,
    summary: String(input.summary ?? existing?.summary ?? ""),
    description: String(input.description ?? existing?.description ?? ""),
    image: String(input.image ?? existing?.image ?? ""),
    gallery,
    goalAmount: amount(input.goalAmount, existing?.goalAmount),
    raisedAmount: amount(input.raisedAmount, existing?.raisedAmount),
    status: oneOf(input.status, values(CAUSE_STATUS), existing?.status || CAUSE_STATUS.ACTIVE),
  };
}

async function listCauses(filter, query) {
  if (query.q) filter.title = searchPattern(query.q);
  const { docs, pagination } = await paginate(Cause, filter, query, { sort: { createdAt: 1 } });
  return { causes: docs, pagination };
}

export const listPublicCauses = (query) => listCauses({ status: { $ne: CAUSE_STATUS.ARCHIVED } }, query);

export function listAdminCauses(query) {
  const filter = query.status ? { status: String(query.status) } : {};
  return listCauses(filter, query);
}

export async function findPublicCauseBySlug(slug) {
  const cause = await Cause.findOne({ slug, status: { $ne: CAUSE_STATUS.ARCHIVED } });
  if (!cause) throw notFound("Cause not found.");
  return cause;
}

export async function findCauseById(id) {
  const cause = await Cause.findById(id);
  if (!cause) throw notFound("Cause not found.");
  return cause;
}

export async function createCause(input, actor) {
  const cause = await Cause.create(buildCauseData(input));
  await recordAudit(actor, "create", "cause", cause._id, cause.title);
  return cause;
}

export async function updateCause(id, input, actor) {
  const existing = await findCauseById(id);
  const cause = await Cause.findByIdAndUpdate(id, buildCauseData(input, existing), { returnDocument: "after" });
  await recordAudit(actor, "update", "cause", cause._id, cause.title);
  return cause;
}

/** Donations keep their record; they just stop pointing at the removed cause. */
export async function deleteCause(id, actor) {
  const cause = await Cause.findByIdAndDelete(id);
  if (!cause) throw notFound("Cause not found.");
  await Donation.updateMany({ causeId: cause._id }, { causeId: null });
  await recordAudit(actor, "delete", "cause", cause._id, cause.title);
}
