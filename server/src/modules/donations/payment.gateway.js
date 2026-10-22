import Razorpay from "razorpay";
import { env } from "../../config/env.js";
import { badRequest, HttpError } from "../../core/errors.js";
import { safeEqual, signHmac } from "../../core/security.js";

let client = null;

function razorpay() {
  client ??= new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });
  return client;
}

export const gatewayEnabled = () => env.razorpay.enabled;

/** Amounts are stored in rupees; Razorpay works in paise. */
const toPaise = (rupees) => rupees * 100;

export async function createGatewayOrder(donation) {
  const order = await razorpay().orders.create({
    amount: toPaise(donation.amount),
    currency: "INR",
    receipt: donation.orderReference,
    notes: { donationId: String(donation._id) },
  });
  return { id: order.id, amount: order.amount, currency: order.currency };
}

export function refundGatewayPayment(paymentId, rupees) {
  return razorpay().payments.refund(paymentId, { amount: toPaise(rupees) });
}

export function assertCheckoutSignature({ orderId, paymentId, signature }) {
  if (!gatewayEnabled()) throw new HttpError(503, "Online payments are not configured.");
  if (!orderId || !paymentId || !signature) throw badRequest("Payment confirmation is incomplete.");
  const expected = signHmac(env.razorpay.keySecret, `${orderId}|${paymentId}`);
  if (!safeEqual(expected, signature)) throw badRequest("Payment signature could not be verified.");
}

export function assertWebhookSignature(rawBody, signature) {
  if (!env.razorpay.webhookSecret) throw new HttpError(503, "Webhook secret is not configured.");
  if (!signature) throw badRequest("Missing webhook signature.");
  if (!safeEqual(signHmac(env.razorpay.webhookSecret, rawBody), signature)) {
    throw badRequest("Webhook signature could not be verified.");
  }
}
