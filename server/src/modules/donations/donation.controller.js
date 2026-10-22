import { toReceipt } from "./donation.serializer.js";
import * as donations from "./donation.service.js";
import { startCheckout } from "./payment.service.js";

/** Stores a pending gift and opens a checkout for it (POST /donations and /payments/create-order). */
export async function startDonation(req, res) {
  const { donation, cause } = await donations.createPendingDonation(req.body);
  res.status(201).json(await startCheckout(donation, cause));
}

export async function receipt(req, res) {
  res.json({ donation: toReceipt(await donations.getReceiptSource(req.params.id)) });
}

export async function list(req, res) {
  res.json(await donations.listDonations(req.query));
}

export async function getById(req, res) {
  res.json(await donations.getDonationDetail(req.params.id));
}

export async function changeStatus(req, res) {
  const donation = await donations.changeDonationStatus(req.params.id, String(req.body?.status || ""), req.user);
  res.json({ donation });
}
