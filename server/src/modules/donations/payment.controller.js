import * as payments from "./payment.service.js";

export async function verify(req, res) {
  const { body } = req;
  const donation = await payments.confirmCheckout({
    orderId: body?.razorpay_order_id || body?.orderId,
    paymentId: body?.razorpay_payment_id || body?.paymentId,
    signature: body?.razorpay_signature || body?.signature,
  });
  res.json({ donation });
}

export async function webhook(req, res) {
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body ?? {}));
  await payments.handleWebhook(rawBody, {
    signature: req.get("x-razorpay-signature"),
    eventId: req.get("x-razorpay-event-id"),
  });
  res.json({ ok: true });
}

export async function demoConfirm(req, res) {
  res.json({ donation: await payments.confirmDemoPayment(req.body ?? {}) });
}

export async function demoFail(req, res) {
  res.json({ donation: await payments.failDemoPayment(req.body ?? {}) });
}
