import { LIMITS } from "../config/constants.js";

/** page >= 1, limit clamped to 1..max. Anything unparsable falls back to the defaults. */
export function pageParams(query = {}, { limit = LIMITS.PAGE_SIZE, max = LIMITS.MAX_PAGE_SIZE } = {}) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const size = Math.min(max, Math.max(1, parseInt(query.limit, 10) || limit));
  return { page, limit: size, skip: (page - 1) * size };
}

export function buildPagination({ page, limit, total }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 };
}

/**
 * Runs a find() for one page and counts the full result set in parallel.
 * Returns the documents together with the pagination block sent to clients.
 */
export async function paginate(model, filter, query, { sort = { createdAt: -1 }, populate, limit, max } = {}) {
  const params = pageParams(query, { limit, max });
  let cursor = model.find(filter).sort(sort).skip(params.skip).limit(params.limit);
  if (populate) cursor = cursor.populate(populate);
  const [docs, total] = await Promise.all([cursor, model.countDocuments(filter)]);
  return { docs, pagination: buildPagination({ page: params.page, limit: params.limit, total }) };
}
