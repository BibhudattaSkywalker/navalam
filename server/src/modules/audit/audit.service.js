import { AuditLog } from "./audit.model.js";
import { paginate } from "../../core/pagination.js";
import { logger } from "../../core/logger.js";

const SUMMARY_LIMIT = 240;

/**
 * Appends an entry to the audit trail. A failure here is logged but never
 * allowed to undo or block the change that is being recorded.
 */
export async function recordAudit(actor, action, entity, entityId, summary) {
  try {
    await AuditLog.create({
      actorEmail: actor?.email || "",
      action,
      entity,
      entityId: entityId ? String(entityId) : "",
      summary: String(summary || "").slice(0, SUMMARY_LIMIT),
    });
  } catch (error) {
    logger.error("Could not write the audit log", error);
  }
}

export async function listAudit(query) {
  const { docs, pagination } = await paginate(AuditLog, {}, query, { limit: 20 });
  return { logs: docs, pagination };
}
