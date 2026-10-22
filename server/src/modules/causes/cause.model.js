import mongoose from "mongoose";
import { CAUSE_STATUS, values } from "../../config/constants.js";
import { clientJson } from "../../core/clientJson.js";

const causeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    goalAmount: { type: Number, default: 0 },
    raisedAmount: { type: Number, default: 0 },
    status: { type: String, enum: values(CAUSE_STATUS), default: CAUSE_STATUS.ACTIVE },
  },
  { timestamps: true },
);

causeSchema.plugin(clientJson);

export const Cause = mongoose.model("Cause", causeSchema);
