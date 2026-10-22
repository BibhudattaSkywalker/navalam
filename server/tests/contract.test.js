import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { startApi } from "./helpers.js";

let api;
let admin;
let anon;

before(async () => {
  api = await startApi();
  anon = api.client();
  admin = api.client();
  const login = await admin.login();
  assert.equal(login.status, 200);
});

after(async () => {
  await api?.stop();
});

describe("health and routing", () => {
  it("answers the health check", async () => {
    const res = await anon.get("/api/health");
    assert.equal(res.status, 200);
    assert.equal(res.json.ok, true);
  });

  it("returns a JSON 404 for unknown api routes", async () => {
    const res = await anon.get("/api/nope");
    assert.equal(res.status, 404);
    assert.ok(res.json.error);
  });
});

describe("auth", () => {
  it("rejects wrong credentials", async () => {
    const res = await api.client().login("admin@nalvalam.local", "wrong-password");
    assert.equal(res.status, 401);
    assert.ok(res.json.error);
  });

  it("signs in, reports the session and signs out", async () => {
    const session = api.client();
    const login = await session.login();
    assert.equal(login.status, 200);
    assert.equal(login.json.user.email, "admin@nalvalam.local");
    assert.equal(login.json.user.role, "super_admin");
    assert.equal(login.json.user.passwordHash, undefined);

    const me = await session.get("/api/auth/me");
    assert.equal(me.status, 200);
    assert.equal(me.json.user.name, "Nalvalam Admin");

    await session.post("/api/auth/logout");
    const after = await session.get("/api/auth/me");
    assert.equal(after.status, 401);
  });

  it("blocks admin routes without a session", async () => {
    for (const path of ["/api/admin/dashboard", "/api/admin/posts", "/api/admin/leads", "/api/admin/donations"]) {
      const res = await anon.get(path);
      assert.equal(res.status, 401, path);
    }
  });
});

describe("posts", () => {
  const ids = {};

  it("creates posts as admin and derives a slug", async () => {
    const res = await admin.post("/api/admin/posts", { title: "Winter Blanket Drive", status: "published", excerpt: "Warmth for all" });
    assert.equal(res.status, 201);
    assert.equal(res.json.post.slug, "winter-blanket-drive");
    assert.equal(res.json.post.status, "published");
    ids.published = res.json.post.id;

    const draft = await admin.post("/api/admin/posts", { title: "Hidden Draft", status: "draft" });
    assert.equal(draft.status, 201);
    ids.draft = draft.json.id || draft.json.post.id;

    const future = await admin.post("/api/admin/posts", {
      title: "Scheduled Story",
      status: "scheduled",
      publishedAt: new Date(Date.now() + 86400000).toISOString(),
    });
    assert.equal(future.status, 201);
  });

  it("requires a title", async () => {
    const res = await admin.post("/api/admin/posts", { title: "  " });
    assert.equal(res.status, 400);
  });

  it("only lists published posts publicly, with pagination metadata", async () => {
    const res = await anon.get("/api/posts?limit=50");
    assert.equal(res.status, 200);
    const titles = res.json.posts.map((post) => post.title);
    assert.ok(titles.includes("Winter Blanket Drive"));
    assert.ok(!titles.includes("Hidden Draft"));
    assert.ok(!titles.includes("Scheduled Story"));
    assert.ok(res.json.posts.length >= 7, "seeded stories should be present");
    assert.equal(res.json.pagination.page, 1);
    assert.equal(res.json.pagination.limit, 50);
  });

  it("paginates and clamps the limit", async () => {
    const first = await anon.get("/api/posts?limit=3&page=1");
    const second = await anon.get("/api/posts?limit=3&page=2");
    assert.equal(first.json.posts.length, 3);
    assert.equal(first.json.pagination.hasNext, true);
    assert.equal(second.json.pagination.hasPrev, true);
    assert.notEqual(first.json.posts[0].id, second.json.posts[0].id);
    const clamped = await anon.get("/api/posts?limit=9999");
    assert.equal(clamped.json.pagination.limit, 100);
  });

  it("serves a post by slug, hiding drafts from the public", async () => {
    assert.equal((await anon.get("/api/posts/winter-blanket-drive")).status, 200);
    assert.equal((await anon.get("/api/posts/hidden-draft")).status, 404);
    assert.equal((await admin.get("/api/posts/hidden-draft")).status, 200);
  });

  it("keeps the all=1 listing behind a session and supports search and status filters", async () => {
    assert.equal((await anon.get("/api/posts?all=1")).status, 401);
    const drafts = await admin.get("/api/admin/posts?status=draft");
    assert.deepEqual(drafts.json.posts.map((post) => post.title), ["Hidden Draft"]);
    const search = await admin.get("/api/admin/posts?q=blanket");
    assert.equal(search.json.posts.length, 1);
  });

  it("updates, fetches by id and deletes", async () => {
    const updated = await admin.put(`/api/admin/posts/${ids.published}`, { title: "Winter Blanket Drive 2026" });
    assert.equal(updated.status, 200);
    assert.equal(updated.json.post.title, "Winter Blanket Drive 2026");
    assert.equal(updated.json.post.slug, "winter-blanket-drive");

    const found = await admin.get(`/api/admin/posts/${ids.published}`);
    assert.equal(found.json.post.id, ids.published);

    const removed = await admin.del(`/api/admin/posts/${ids.published}`);
    assert.equal(removed.status, 200);
    assert.equal((await admin.get(`/api/admin/posts/${ids.published}`)).status, 404);
  });
});

describe("causes", () => {
  it("lists seeded causes publicly and hides archived ones", async () => {
    const created = await admin.post("/api/admin/causes", { title: "Old Campaign", status: "archived", goalAmount: 1000 });
    assert.equal(created.status, 201);
    const res = await anon.get("/api/causes?limit=50");
    assert.equal(res.status, 200);
    assert.ok(res.json.causes.length >= 6);
    assert.ok(!res.json.causes.some((cause) => cause.title === "Old Campaign"));
    assert.equal((await anon.get("/api/causes/old-campaign")).status, 404);
    const adminView = await admin.get("/api/admin/causes?status=archived");
    assert.equal(adminView.json.causes.length, 1);
  });

  it("clamps negative amounts and supports search", async () => {
    const res = await admin.post("/api/admin/causes", { title: "Clean Water", goalAmount: -50, raisedAmount: "abc" });
    assert.equal(res.json.cause.goalAmount, 0);
    assert.equal(res.json.cause.raisedAmount, 0);
    const found = await admin.get("/api/admin/causes?q=clean");
    assert.equal(found.json.causes.length, 1);
    const byId = await admin.get(`/api/admin/causes/${res.json.cause.id}`);
    assert.equal(byId.json.cause.title, "Clean Water");
  });
});

describe("leads", () => {
  it("captures a public enquiry and maps form-style detail keys", async () => {
    const res = await anon.post("/api/leads", {
      source: "volunteer",
      details: { "Full Name": "Asha Rao", Email: "asha@example.com", Phone: "9876543210", City: "Pune" },
    });
    assert.equal(res.status, 201);
    assert.ok(res.json.lead.id);

    const list = await admin.get("/api/admin/leads?q=asha");
    assert.equal(list.json.leads.length, 1);
    const lead = list.json.leads[0];
    assert.equal(lead.name, "Asha Rao");
    assert.equal(lead.email, "asha@example.com");
    assert.equal(lead.phone, "9876543210");
    assert.equal(lead.source, "volunteer");
    assert.equal(lead.status, "new");
    assert.equal(lead.details.City, "Pune");
  });

  it("rejects an empty enquiry", async () => {
    const res = await anon.post("/api/leads", { source: "contact", message: "hello" });
    assert.equal(res.status, 400);
  });

  it("filters by status and source, and reports the known sources", async () => {
    await anon.post("/api/leads", { source: "newsletter", name: "N", email: "n@example.com" });
    const bySource = await admin.get("/api/admin/leads?source=newsletter");
    assert.equal(bySource.json.leads.length, 1);
    assert.deepEqual([...bySource.json.sources].sort(), ["newsletter", "volunteer"]);
    const byStatus = await admin.get("/api/admin/leads?status=closed");
    assert.equal(byStatus.json.leads.length, 0);
    assert.equal(byStatus.json.pagination.total, 0);
  });

  it("updates status, assignee and notes, then deletes", async () => {
    const list = await admin.get("/api/admin/leads?source=newsletter");
    const id = list.json.leads[0].id;
    const patched = await admin.patch(`/api/admin/leads/${id}`, { status: "contacted", assignee: "Meera", notes: "Called back" });
    assert.equal(patched.json.lead.status, "contacted");
    assert.equal(patched.json.lead.assignee, "Meera");
    const ignored = await admin.patch(`/api/admin/leads/${id}`, { status: "bogus" });
    assert.equal(ignored.json.lead.status, "contacted");
    assert.equal((await admin.del(`/api/admin/leads/${id}`)).status, 200);
    assert.equal((await admin.get(`/api/admin/leads/${id}`)).status, 404);
  });

  it("exports a csv", async () => {
    const res = await admin.get("/api/admin/leads/export");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type"), /text\/csv/);
    assert.match(res.text.split("\n")[0], /^name,email,phone,source/);
    assert.ok(res.text.includes("Asha Rao"));
  });
});

describe("donations and payments", () => {
  let cause;

  it("records a pending donation without gateway keys", async () => {
    cause = (await admin.post("/api/admin/causes", { title: "School Kits", goalAmount: 5000 })).json.cause;
    const res = await anon.post("/api/donations", {
      donorName: "Ravi Kumar",
      email: "ravi@example.com",
      amount: 500,
      type: "monthly",
      method: "Card",
      causeId: cause.id,
    });
    assert.equal(res.status, 201);
    assert.equal(res.json.configured, false);
    assert.equal(res.json.donation.status, "pending");
    assert.equal(res.json.donation.type, "monthly");
    assert.match(res.json.donation.orderReference, /^NVF/);
    assert.equal(res.json.donation.cause.title, "School Kits");
  });

  it("validates the donation payload", async () => {
    for (const body of [{ email: "a@b.co", amount: 10 }, { donorName: "A", amount: 10 }, { donorName: "A", email: "a@b.co", amount: 0 }, { donorName: "A", email: "a@b.co", amount: 1.5 }]) {
      assert.equal((await anon.post("/api/donations", body)).status, 400, JSON.stringify(body));
    }
    const bad = await anon.post("/api/donations", { donorName: "A", email: "a@b.co", amount: 10, causeId: "64b7f0a2c3d4e5f60718293a" });
    assert.equal(bad.status, 400);
  });

  it("confirms a demo payment once and credits the cause", async () => {
    const list = await admin.get("/api/admin/donations?q=ravi");
    const donation = list.json.donations[0];
    const first = await anon.post("/api/payments/demo-confirm", { donationId: donation.id, method: "UPI" });
    assert.equal(first.status, 200);
    assert.equal(first.json.donation.status, "successful");
    assert.equal(first.json.donation.method, "UPI");
    assert.ok(first.json.donation.paidAt);

    await anon.post("/api/payments/demo-confirm", { donationId: donation.id });
    const after = await admin.get(`/api/admin/causes/${cause.id}`);
    assert.equal(after.json.cause.raisedAmount, 500, "a repeated confirmation must not double count");
  });

  it("records a failed attempt", async () => {
    const created = await anon.post("/api/donations", { donorName: "Sana", email: "sana@example.com", amount: 250 });
    const res = await anon.post("/api/payments/demo-fail", { donationId: created.json.donation.id, method: "UPI" });
    assert.equal(res.json.donation.status, "failed");
  });

  it("lists donations with filters, pagination and the verified total", async () => {
    const all = await admin.get("/api/admin/donations");
    assert.equal(all.json.pagination.total, 2);
    assert.equal(all.json.raised, 500);
    const failed = await admin.get("/api/admin/donations?status=failed");
    assert.equal(failed.json.donations.length, 1);
    assert.equal(failed.json.raised, 0);
    const monthly = await admin.get("/api/admin/donations?type=monthly");
    assert.equal(monthly.json.donations[0].donorName, "Ravi Kumar");
  });

  it("returns donation detail with donor history and a public receipt", async () => {
    const donation = (await admin.get("/api/admin/donations?q=ravi")).json.donations[0];
    const detail = await admin.get(`/api/admin/donations/${donation.id}`);
    assert.equal(detail.json.donation.cause.title, "School Kits");
    assert.equal(detail.json.history.length, 1);
    const receipt = await anon.get(`/api/donations/${donation.id}/receipt`);
    assert.equal(receipt.status, 200);
    assert.equal(receipt.json.donation.email, undefined, "receipts must not leak donor contact details");
  });

  it("restricts manual status changes", async () => {
    const pending = (await anon.post("/api/donations", { donorName: "Tej", email: "tej@example.com", amount: 99 })).json.donation;
    const forced = await admin.patch(`/api/admin/donations/${pending.id}`, { status: "successful" });
    assert.equal(forced.status, 400);
    const failed = await admin.patch(`/api/admin/donations/${pending.id}`, { status: "failed" });
    assert.equal(failed.status, 200);
  });
});

describe("settings, team and audit", () => {
  it("reads and updates the site settings", async () => {
    assert.equal((await anon.get("/api/settings")).status, 200);
    const updated = await admin.put("/api/admin/settings", { phone: "+91 90000 00000", instagram: "https://instagram.com/nalvalam" });
    assert.equal(updated.json.settings.phone, "+91 90000 00000");
    assert.equal((await anon.get("/api/settings")).json.settings.instagram, "https://instagram.com/nalvalam");
  });

  it("creates teammates and enforces roles", async () => {
    const created = await admin.post("/api/admin/users", { name: "Content Lead", email: "Lead@Example.com", password: "Password123", role: "content_manager" });
    assert.equal(created.status, 201);
    assert.equal(created.json.user.email, "lead@example.com");
    assert.equal(created.json.user.role, "content_manager");

    const duplicate = await admin.post("/api/admin/users", { name: "Again", email: "lead@example.com", password: "Password123" });
    assert.ok(duplicate.status >= 400 && duplicate.status < 500);
    const weak = await admin.post("/api/admin/users", { name: "Weak", email: "weak@example.com", password: "short" });
    assert.equal(weak.status, 400);

    const editor = api.client();
    assert.equal((await editor.login("lead@example.com", "Password123")).status, 200);
    assert.equal((await editor.get("/api/admin/posts")).status, 200);
    assert.equal((await editor.get("/api/admin/audit")).status, 403);
    assert.equal((await editor.get("/api/admin/users")).status, 403);
    assert.equal((await editor.put("/api/admin/settings", { phone: "1" })).status, 403);
  });

  it("lists users and the audit trail with pagination", async () => {
    const users = await admin.get("/api/admin/users");
    assert.equal(users.json.pagination.total, 2);
    const audit = await admin.get("/api/admin/audit");
    assert.equal(audit.json.pagination.limit, 20);
    const actions = audit.json.logs.map((log) => `${log.action}:${log.entity}`);
    assert.ok(actions.includes("login:user"));
    assert.ok(actions.includes("create:blog"));
    assert.ok(actions.includes("create:user"));
  });
});

describe("dashboard", () => {
  it("returns the summary and chart data", async () => {
    const res = await admin.get("/api/admin/dashboard");
    assert.equal(res.status, 200);
    const { summary } = res.json;
    assert.equal(summary.donations, 1);
    assert.equal(summary.raised, 500);
    assert.ok(summary.posts >= 7);
    assert.equal(res.json.activeCauses >= 6, true);
    assert.ok(Array.isArray(res.json.leadSources));
    assert.ok(Array.isArray(res.json.chartDonations));
    assert.ok(res.json.causeProgress.length <= 5);
    assert.ok(Array.isArray(res.json.recentDonations));
    assert.equal((await admin.get("/api/admin/summary")).status, 200);
  });
});

describe("uploads", () => {
  it("accepts an image and rejects other files", async () => {
    const png = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="), (c) => c.charCodeAt(0));
    const ok = new FormData();
    ok.append("file", new Blob([png], { type: "image/png" }), "pixel.png");
    const res = await admin.raw("POST", "/api/admin/uploads", ok);
    assert.equal(res.status, 201);
    assert.match(res.json.url, /^\/uploads\/.+\.png$/);

    const bad = new FormData();
    bad.append("file", new Blob(["hello"], { type: "text/plain" }), "note.txt");
    assert.equal((await admin.raw("POST", "/api/admin/uploads", bad)).status, 400);
    assert.equal((await anon.raw("POST", "/api/admin/uploads", ok)).status, 401);
  });
});
