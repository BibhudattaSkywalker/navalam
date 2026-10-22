import { createHmac } from "node:crypto";
import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { startApi } from "./helpers.js";

const WEBHOOK_SECRET = "whsec_test_secret";

let api;
let admin;
let anon;

before(async () => {
  api = await startApi({ RAZORPAY_WEBHOOK_SECRET: WEBHOOK_SECRET });
  anon = api.client();
  admin = api.client();
  await admin.login();
});

after(async () => {
  await api?.stop();
});

describe("request handling", () => {
  it("answers unknown ids with 404 instead of leaking cast errors", async () => {
    for (const path of ["/api/admin/posts/not-an-id", "/api/admin/causes/123", "/api/admin/leads/zzz", "/api/donations/xyz/receipt"]) {
      const res = await admin.get(path);
      assert.equal(res.status, 404, path);
      assert.equal(res.json.error, "Not found.");
    }
  });

  it("rejects malformed json with a 400", async () => {
    const bad = await fetch(`${api.base}/api/leads`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{not json" });
    assert.equal(bad.status, 400);
    assert.match((await bad.json()).error, /json/i);
  });

  it("reports a missing document as 404 with a readable message", async () => {
    const res = await admin.get("/api/admin/posts/64b7f0a2c3d4e5f60718293a");
    assert.equal(res.status, 404);
    assert.equal(res.json.error, "Post not found.");
  });

  it("reports database state on the health check", async () => {
    const res = await anon.get("/api/health");
    assert.equal(res.json.database, "up");
  });
});

describe("accounts", () => {
  it("does not reveal whether an email exists", async () => {
    const unknown = await api.client().login("nobody@example.com", "whatever123");
    const wrong = await api.client().login("admin@nalvalam.local", "whatever123");
    assert.equal(unknown.status, 401);
    assert.equal(wrong.status, 401);
    assert.equal(unknown.json.error, wrong.json.error);
  });

  it("answers a duplicate email with 409", async () => {
    const body = { name: "Dup", email: "dup@example.com", password: "Password123" };
    assert.equal((await admin.post("/api/admin/users", body)).status, 201);
    assert.equal((await admin.post("/api/admin/users", body)).status, 409);
  });

  it("sets an http-only session cookie", async () => {
    const res = await api.client().login();
    const cookie = res.headers.get("set-cookie");
    assert.match(cookie, /nvf_session=/);
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /SameSite=Lax/i);
  });
});

describe("leads export", () => {
  it("neutralises spreadsheet formulas", async () => {
    await anon.post("/api/leads", { name: "=HYPERLINK(\"http://evil.test\")", email: "csv@example.com" });
    const csv = (await admin.get("/api/admin/leads/export")).text;
    assert.ok(csv.includes("\"'=HYPERLINK("), "formula cells must be prefixed with a quote");
  });
});

describe("payments", () => {
  it("credits a cause once even when confirmations race", async () => {
    const cause = (await admin.post("/api/admin/causes", { title: "Race Test", goalAmount: 1000 })).json.cause;
    const { donation } = (await anon.post("/api/donations", { donorName: "R", email: "r@example.com", amount: 300, causeId: cause.id })).json;
    await Promise.all(Array.from({ length: 5 }, () => anon.post("/api/payments/demo-confirm", { donationId: donation.id })));
    const after = (await admin.get(`/api/admin/causes/${cause.id}`)).json.cause;
    assert.equal(after.raisedAmount, 300);
  });

  it("keeps a successful gift successful when a late failure arrives", async () => {
    const { donation } = (await anon.post("/api/donations", { donorName: "S", email: "s@example.com", amount: 50 })).json;
    await anon.post("/api/payments/demo-confirm", { donationId: donation.id });
    const res = await anon.post("/api/payments/demo-fail", { donationId: donation.id });
    assert.equal(res.json.donation.status, "successful");
  });

  it("answers checkout verification with 503 while the gateway is not configured", async () => {
    const res = await anon.post("/api/payments/verify", { razorpay_order_id: "o", razorpay_payment_id: "p", razorpay_signature: "s" });
    assert.equal(res.status, 503);
  });

  it("refuses to refund a demo payment", async () => {
    const { donation } = (await anon.post("/api/donations", { donorName: "T", email: "t@example.com", amount: 80 })).json;
    await anon.post("/api/payments/demo-confirm", { donationId: donation.id });
    const res = await admin.patch(`/api/admin/donations/${donation.id}`, { status: "refunded" });
    assert.equal(res.status, 400);
  });

  describe("webhook", () => {
    const sign = (raw) => createHmac("sha256", WEBHOOK_SECRET).update(raw).digest("hex");
    const send = (event, { signature, eventId } = {}) => {
      const raw = JSON.stringify(event);
      return fetch(`${api.base}/api/payments/webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-razorpay-signature": signature ?? sign(raw),
          ...(eventId ? { "x-razorpay-event-id": eventId } : {}),
        },
        body: raw,
      });
    };

    async function pendingDonationWithOrder(orderId) {
      const { donation } = (await anon.post("/api/donations", { donorName: "W", email: "w@example.com", amount: 120 })).json;
      const { default: mongoose } = await import("mongoose");
      await mongoose.connection.collection("donations").updateOne({ orderReference: donation.orderReference }, { $set: { razorpayOrderId: orderId } });
      return donation;
    }

    it("rejects a bad signature", async () => {
      const res = await send({ event: "payment.captured" }, { signature: "deadbeef" });
      assert.equal(res.status, 400);
    });

    it("settles the gift on payment.captured and ignores a replay", async () => {
      const donation = await pendingDonationWithOrder("order_abc");
      const event = { event: "payment.captured", payload: { payment: { entity: { id: "pay_abc", order_id: "order_abc" } } } };
      assert.equal((await send(event, { eventId: "evt_1" })).status, 200);
      assert.equal((await send(event, { eventId: "evt_1" })).status, 200);

      const detail = await admin.get(`/api/admin/donations/${donation.id}`);
      assert.equal(detail.json.donation.status, "successful");
      assert.equal(detail.json.donation.razorpayPaymentId, "pay_abc");
    });

    it("marks the gift failed on payment.failed", async () => {
      const donation = await pendingDonationWithOrder("order_fail");
      const event = { event: "payment.failed", payload: { payment: { entity: { id: "pay_f", order_id: "order_fail" } } } };
      await send(event, { eventId: "evt_2" });
      assert.equal((await admin.get(`/api/admin/donations/${donation.id}`)).json.donation.status, "failed");
    });

    it("acknowledges events for unknown orders", async () => {
      const event = { event: "payment.captured", payload: { payment: { entity: { id: "pay_x", order_id: "order_missing" } } } };
      assert.equal((await send(event, { eventId: "evt_3" })).status, 200);
    });
  });
});
