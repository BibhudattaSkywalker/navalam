import mongoose from "mongoose";
import { clientJson } from "../../core/clientJson.js";

/** A single document (key "site") holding the public contact details of the foundation. */
const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "site" },
    contactEmail: { type: String, default: "nalvalaminfo@ngo.com" },
    phone: { type: String, default: "" },
    address: { type: String, default: "Nalvalam Foundation supports communities across India." },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true },
);

settingsSchema.plugin(clientJson);

export const SiteSetting = mongoose.model("SiteSetting", settingsSchema);
