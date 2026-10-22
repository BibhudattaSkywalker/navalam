import mongoose from "mongoose";
import { DONATION_STATUS, DONATION_TYPE, LIMITS } from "../../config/constants.js";
import { badRequest, notFound } from "../../core/errors.js";
import { paginate } from "../../core/pagination.js";
import { orderReference } from "../../core/security.js";
import { anyFieldMatches, clean, isEmail } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { Cause } from "../causes/cause.model.js";
import { Donation } from "./donation.model.js";
import { refundDonation } from "./payment.service.js";
import { toAdminDonation } from "./donation.serializer.js";

const SEARCH_FIELDS = ["donorName", "email", "transactionId", "orderReference"];

async function resolveCause({ causeId, causeSlug }) {
  if (!causeId && !causeSlug) return null;
  const valid = causeId ? mongoose.isValidObjectId(causeId) : true;
  const cause = valid ? await Cause.findOne(causeId ? { _id: causeId } : { slug: String(causeSlug) }) : null;
  if (!cause) throw badRequest("Choose a valid cause.");
  return cause;
}

/** Validates the donor's details and stores a pending gift, ready for checkout. */
export async function createPendingDonation(body = {}) {
  const amount = Number(body.amount);
  const donorName = clean(body.donorName, 120);
  const email = clean(body.email, 180);
  if (!donorName || !isEmail(email) || !Number.isInteger(amount) || amount < 1 || amount > LIMITS.MAX_DONATION) {
    throw badRequest("Enter a name, email, and a valid amount.");
  }

  const cause = await resolveCause(body);
  const donation = await Donation.create({
    donorName,
    email,
    phone: clean(body.phone, 40),
    amount,
    type: body.type === DONATION_TYPE.MONTHLY ? DONATION_TYPE.MONTHLY : DONATION_TYPE.ONE_TIME,
    method: clean(body.method || "UPI", 40),
    status: DONATION_STATUS.PENDING,
    orderReference: orderReference(),
    causeId: cause?._id ?? null,
  });
  return { donation, cause };
}

export async function listDonations(query) {
  const filter = {};
  if (query.status) filter.status = String(query.status);
  if (query.type) filter.type = String(query.type);
  if (query.q) filter.$or = anyFieldMatches(SEARCH_FIELDS, query.q);

  // The verified total follows the filters, so a "failed" view never reports money.
  const countsTowardTotal = !filter.status || filter.status === DONATION_STATUS.SUCCESSFUL;
  const [{ docs, pagination }, totals] = await Promise.all([
    paginate(Donation, filter, query, { populate: "causeId" }),
    countsTowardTotal
      ? Donation.aggregate([
        { $match: { ...filter, status: DONATION_STATUS.SUCCESSFUL } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      : [],
  ]);

  return { donations: docs.map(toAdminDonation), pagination, raised: totals[0]?.total ?? 0 };
}

export async function getDonationDetail(id) {
  const donation = await Donation.findById(id).populate("causeId");
  if (!donation) throw notFound("Donation not found.");
  const history = await Donation.find({ email: donation.email }).sort({ createdAt: -1 }).limit(50);
  return { donation: toAdminDonation(donation), history };
}

export async function getReceiptSource(id) {
  const donation = await Donation.findById(id).populate("causeId");
  if (!donation) throw notFound("Donation not found.");
  return donation;
}

/** Admin override. A gift only becomes successful through a verified payment, never by hand. */
export async function changeDonationStatus(id, status, actor) {
  const donation = await Donation.findById(id);
  if (!donation) throw notFound("Donation not found.");

  if (status === DONATION_STATUS.SUCCESSFUL || status === "paid") {
    throw badRequest("A gift becomes successful only after the payment is verified.");
  }
  if (status === DONATION_STATUS.REFUNDED) {
    await refundDonation(donation);
  } else if (status === DONATION_STATUS.FAILED && donation.status === DONATION_STATUS.PENDING) {
    donation.status = DONATION_STATUS.FAILED;
    await donation.save();
  } else if (status !== donation.status) {
    throw badRequest("Choose failed or refunded.");
  }

  await recordAudit(actor, "update", "donation", donation._id, `${donation.orderReference} · ${donation.status}`);
  return donation;
}
