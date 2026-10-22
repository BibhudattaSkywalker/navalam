const MONGO_BASE = process.env.TEST_MONGO_URI || "mongodb://127.0.0.1:27017";

/**
 * Boots the API against a throw-away database and returns a small client.
 * Every test file gets its own database so files can run in parallel.
 * `overrides` sets extra environment variables (for example the webhook secret).
 */
export async function startApi(overrides = {}) {
  const dbName = `nalvalam_test_${process.pid}_${Date.now()}`;
  process.env.MONGO_URI = `${MONGO_BASE}/${dbName}`;
  process.env.ADMIN_EMAIL = "admin@nalvalam.local";
  process.env.ADMIN_PASSWORD = "Nalvalam@2026";
  process.env.RAZORPAY_KEY_ID = "";
  process.env.RAZORPAY_KEY_SECRET = "";
  process.env.NODE_ENV = "test";
  Object.assign(process.env, overrides);

  const { app, ready } = await import("../app.js");
  await ready;
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  async function stop() {
    server.close();
    const { default: mongoose } = await import("mongoose");
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }

  return { base, stop, client: (jar) => client(base, jar) };
}

/** Minimal fetch wrapper with a cookie jar and JSON helpers. */
function client(base, jar = {}) {
  async function call(method, path, body, headers = {}) {
    const isForm = body instanceof FormData;
    const response = await fetch(base + path, {
      method,
      headers: {
        ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
        ...(jar.cookie ? { Cookie: jar.cookie } : {}),
        ...headers,
      },
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    });
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) jar.cookie = setCookie.split(";")[0];
    const text = await response.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      /* non-JSON body (csv, html) */
    }
    return { status: response.status, json, text, headers: response.headers };
  }

  return {
    jar,
    get: (path) => call("GET", path),
    post: (path, body) => call("POST", path, body),
    put: (path, body) => call("PUT", path, body),
    patch: (path, body) => call("PATCH", path, body),
    del: (path) => call("DELETE", path),
    raw: call,
    async login(email = "admin@nalvalam.local", password = "Nalvalam@2026") {
      const result = await call("POST", "/api/auth/login", { email, password });
      return result;
    },
  };
}
