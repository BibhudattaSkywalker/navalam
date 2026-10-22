import mongoose from "mongoose";
import { LEAD_STATUS, values } from "../../config/constants.js";
import { clientJson } from "../../core/clientJson.js";

const leadSchema = new mongoose.Schema(
  {
    source: { type: String, default: "website" },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    status: { type: String, enum: values(LEAD_STATUS), default: LEAD_STATUS.NEW },
    subject: { type: String, default: "" },
    message: { type: String, default: "" },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    enquiryType: { type: String, default: "" },
    assignee: { type: String, default: "" },
    notes: { type: String, default: "" },
    campaign: { type: String, default: "" },
  },
  { timestamps: true },
);

leadSchema.plugin(clientJson);
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ source: 1 });

export const Lead = mongoose.model("Lead", leadSchema);
