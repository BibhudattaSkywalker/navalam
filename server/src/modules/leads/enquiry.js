import { badRequest } from "../../core/errors.js";
import { clean } from "../../core/text.js";

/**
 * Every public form posts its own field names (the volunteer form sends
 * "Full Name", the newsletter sends "name"). These lists say where to look
 * for each value inside `details`; a top level field always wins.
 */
const DETAIL_KEYS = {
  name: ["name", "Full Name", "Name", "Contact Name", "Organization Name", "Company Name"],
  email: ["email", "Email", "E-mail"],
  phone: ["phone", "Phone", "Mobile number"],
  message: ["message", "Message", "note", "Note"],
  subject: ["subject", "Subject", "category"],
  campaign: ["campaign", "utm_campaign"],
};

function field(body, details, key) {
  const fromBody = body[key];
  if (fromBody) return fromBody;
  return DETAIL_KEYS[key].map((name) => details[name]).find(Boolean) ?? "";
}

/** Normalises a public form submission into the fields stored on a lead. */
export function parseEnquiry(body) {
  const input = body && typeof body === "object" ? body : {};
  const details = input.details && typeof input.details === "object" ? input.details : {};

  const enquiry = {
    name: clean(field(input, details, "name"), 120),
    email: clean(field(input, details, "email"), 180),
    phone: clean(field(input, details, "phone"), 40),
    subject: clean(field(input, details, "subject"), 180),
    message: clean(field(input, details, "message"), 4000),
    campaign: clean(field(input, details, "campaign"), 120),
    source: clean(input.source || "website", 40),
    enquiryType: clean(input.enquiryType || input.source || "website", 40),
    details,
  };

  if (!enquiry.name && !enquiry.email && !enquiry.phone) {
    throw badRequest("Add a name, email, or phone number.");
  }
  return enquiry;
}
