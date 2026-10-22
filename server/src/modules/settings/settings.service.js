import { clean } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { SiteSetting } from "./settings.model.js";

const SITE_KEY = "site";
const EDITABLE_FIELDS = ["contactEmail", "phone", "address", "facebook", "instagram", "twitter", "youtube"];
const FIELD_LIMIT = 240;

/** Creates the document on first read; the upsert keeps that safe under concurrent requests. */
export function getSettings() {
  return SiteSetting.findOneAndUpdate(
    { key: SITE_KEY },
    { $setOnInsert: { key: SITE_KEY } },
    { upsert: true, returnDocument: "after" },
  );
}

export async function updateSettings(input = {}, actor) {
  const changes = {};
  for (const field of EDITABLE_FIELDS) {
    if (input[field] != null) changes[field] = clean(input[field], FIELD_LIMIT);
  }
  const settings = await SiteSetting.findOneAndUpdate(
    { key: SITE_KEY },
    { $set: changes, $setOnInsert: { key: SITE_KEY } },
    { upsert: true, returnDocument: "after" },
  );
  await recordAudit(actor, "update", "settings", settings._id, "Updated website settings");
  return settings;
}
