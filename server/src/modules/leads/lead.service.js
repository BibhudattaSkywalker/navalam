import { LEAD_STATUS, values } from "../../config/constants.js";
import { notFound } from "../../core/errors.js";
import { paginate } from "../../core/pagination.js";
import { anyFieldMatches, clean, csvCell } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { parseEnquiry } from "./enquiry.js";
import { Lead } from "./lead.model.js";

const SEARCH_FIELDS = ["name", "email", "phone", "subject"];
const CSV_COLUMNS = ["name", "email", "phone", "source", "status", "subject", "assignee", "createdAt"];

export async function createLead(body) {
  return Lead.create({ ...parseEnquiry(body), status: LEAD_STATUS.NEW });
}

export async function listLeads(query) {
  const filter = {};
  if (query.status) filter.status = String(query.status);
  if (query.source) filter.source = String(query.source);
  if (query.q) filter.$or = anyFieldMatches(SEARCH_FIELDS, query.q);

  const [{ docs, pagination }, sources] = await Promise.all([
    paginate(Lead, filter, query),
    Lead.distinct("source"),
  ]);
  return { leads: docs, pagination, sources };
}

export async function findLeadById(id) {
  const lead = await Lead.findById(id);
  if (!lead) throw notFound("Lead not found.");
  return lead;
}

export async function updateLead(id, input = {}, actor) {
  const lead = await findLeadById(id);
  if (values(LEAD_STATUS).includes(input.status)) lead.status = input.status;
  if (input.assignee != null) lead.assignee = clean(input.assignee, 80);
  if (input.notes != null) lead.notes = clean(input.notes, 2000);
  await lead.save();
  await recordAudit(actor, "update", "lead", lead._id, `${lead.name || lead.email} · ${lead.status}`);
  return lead;
}

export async function deleteLead(id, actor) {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw notFound("Lead not found.");
  await recordAudit(actor, "delete", "lead", lead._id, lead.name || lead.email);
}

export async function exportLeadsCsv() {
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  const rows = leads.map((lead) => CSV_COLUMNS.map((column) => csvCell(lead[column])).join(","));
  return [CSV_COLUMNS.join(","), ...rows].join("\n");
}
