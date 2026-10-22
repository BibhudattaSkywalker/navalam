import { DONATION_STATUS } from "../../config/constants.js";
import { env } from "../../config/env.js";
import { badRequest, forbidden, notFound } from "../../core/errors.js";
import { logger } from "../../core/logger.js";
import { Cause } from "../causes/cause.model.js";
import { Donation } from "./donation.model.js";
import { PaymentEvent } from "./paymentEvent.model.js";
import { toDonationView } from "./donation.serializer.js";
import {
  assertCheckoutSignature,
  assertWebhookSignature,
  createGatewayOrder,
  gatewayEnabled,
  refundGatewayPayment,
} from "./payment.gateway.js";

const DEMO_PREFIX = "demo_";
const SETTLEABLE = [DONATION_STATUS.PENDING, DONATION_STATUS.FAILED];

/** Notes that a gateway event was handled. Replays hit the unique index and are ignored. */
async function logEvent({ eventId, type, donationId }) {
  if (!eventId) return;
  try {
    await PaymentEvent.create({ eventId, type, donationId });
  } catch (error) {
    if (error?.code !== 11000) throw error;
  }
}

/**
 * Moves a gift to successful exactly once. The status check lives inside the
 * update itself, so two racing requests (webhook plus browser callback) can
 * never both win and credit the cause twice.
 */
export async function markSuccessful(donation, { paymentId = "", orderId = "", eventId, type }) {
  const settled = await Donation.findOneAndUpdate(
    { _id: donation._id, status: { $in: SETTLEABLE } },
    {
      status: DONATION_STATUS.SUCCESSFUL,
      paidAt: new Date(),
      razorpayPaymentId: paymentId || donation.razorpayPaymentId,
      razorpayOrderId: orderId || donation.razorpayOrderId,
      transactionId: paymentId || donation.orderReference,
    },
    { returnDocument: "after" },
  );

  if (settled?.causeId && !settled.appliedToCause) {
    await Cause.updateOne({ _id: settled.causeId }, { $inc: { raisedAmount: settled.amount } });
    await Donation.updateOne({ _id: settled._id }, { appliedToCause: true });
    settled.appliedToCause = true;
  }

  await logEvent({ eventId, type, donationId: donation._id });
  return settled ?? Donation.findById(donation._id);
}

export async function markFailed(donation, eventId) {
  const failed = await Donation.findOneAndUpdate(
    { _id: donation._id, status: DONATION_STATUS.PENDING },
    { status: DONATION_STATUS.FAILED },
    { returnDocument: "after" },
  );
  await logEvent({ eventId, type: "payment.failed", donationId: donation._id });
  return failed ?? donation;
}

/** Opens a checkout for a stored donation, or reports that the gateway is not configured. */
export async function startCheckout(donation, cause) {
  const view = toDonationView(donation, cause);
  if (!gatewayEnabled()) return { configured: false, donation: view };

  const order = await createGatewayOrder(donation);
  donation.razorpayOrderId = order.id;
  await donation.save();
  return { configured: true, keyId: env.razorpay.keyId, order, donation: toDonationView(donation, cause) };
}

/** Called by the browser after Razorpay's checkout closes with a payment. */
export async function confirmCheckout(payload) {
  assertCheckoutSignature(payload);
  const donation = await Donation.findOne({ razorpayOrderId: payload.orderId });
  if (!donation) throw notFound("Donation not found.");
  const settled = await markSuccessful(donation, {
    paymentId: payload.paymentId,
    orderId: payload.orderId,
    eventId: `verify:${payload.paymentId}`,
    type: "checkout.verify",
  });
  return toDonationView(settled);
}

/** Razorpay server-to-server notifications. */
export async function handleWebhook(rawBody, { signature, eventId }) {
  assertWebhookSignature(rawBody, signature);
  const event = JSON.parse(rawBody.toString("utf8"));
  const payment = event.payload?.payment?.entity;
  const id = eventId || `${event.event}:${payment?.id || event.created_at}`;
  const donation = payment?.order_id ? await Donation.findOne({ razorpayOrderId: payment.order_id }) : null;
  if (!donation) {
    logger.warn(`Webhook ${event.event} did not match a donation`);
    return;
  }

  if (event.event === "payment.captured" || event.event === "order.paid") {
    await markSuccessful(donation, { paymentId: payment.id, orderId: payment.order_id, eventId: id, type: event.event });
  } else if (event.event === "payment.failed") {
    await markFailed(donation, id);
  }
}

export async function refundDonation(donation) {
  if (donation.status !== DONATION_STATUS.SUCCESSFUL) throw badRequest("Only a successful gift can be refunded.");
  const paymentId = donation.razorpayPaymentId;
  if (!paymentId || paymentId.startsWith(DEMO_PREFIX) || !gatewayEnabled()) {
    throw badRequest("This gift has no verified Razorpay payment to refund.");
  }

  await refundGatewayPayment(paymentId, donation.amount);
  if (donation.appliedToCause && donation.causeId) {
    await Cause.updateOne({ _id: donation.causeId }, { $inc: { raisedAmount: -donation.amount } });
    donation.appliedToCause = false;
  }
  donation.status = DONATION_STATUS.REFUNDED;
  await donation.save();
}

/* Demo checkout: lets the site finish a payment without a live gateway. Off as soon as keys exist. */

async function demoTarget({ donationId, method }) {
  if (gatewayEnabled()) throw forbidden("The demo checkout is disabled while live payments are configured.");
  const donation = await Donation.findById(donationId);
  if (!donation) throw notFound("Donation not found.");
  if (method) donation.method = String(method).slice(0, 40);
  return donation;
}

export async function confirmDemoPayment(input) {
  const donation = await demoTarget(input);
  await donation.save();
  const settled = await markSuccessful(donation, {
    paymentId: `${DEMO_PREFIX}${donation.orderReference}`,
    eventId: `demo:${donation._id}`,
    type: "demo.confirm",
  });
  return toDonationView(settled);
}

export async function failDemoPayment(input) {
  const donation = await demoTarget(input);
  await donation.save();
  return toDonationView(await markFailed(donation, `demo-fail:${donation._id}`));
}
