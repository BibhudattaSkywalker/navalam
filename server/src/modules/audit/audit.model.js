import mongoose from "mongoose";
import { clientJson } from "../../core/clientJson.js";

const auditLogSchema = new mongoose.Schema(
  {
    actorEmail: { type: String, default: "" },
    action: { type: String, required: true },
    entity: { type: String, default: "" },
    entityId: { type: String, default: "" },
    summary: { type: String, default: "" },
  },
  { timestamps: true },
);

auditLogSchema.plugin(clientJson);
auditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
