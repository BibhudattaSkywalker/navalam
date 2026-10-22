# Nalvalam Foundation

React site built with Vite, React Router, and Tailwind CSS, with an Express and MongoDB backend and an admin panel.

## Getting started

```bash
npm install
cp .env.example .env        # then adjust MONGO_URI and the admin password
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The admin panel is at `/admin/login`.

`npm run dev` serves the site and the API together: the API is mounted as Vite middleware, so there is no second process to start.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with the API mounted on `/api` |
| `npm run build` | Production build into `dist` |
| `npm start` | Production server: API, `dist` and `public/uploads` on `PORT` (default 3000) |
| `npm run seed` | Creates the first admin and starter content if they are missing |
| `npm test` | Backend tests (needs a MongoDB on `127.0.0.1:27017`, uses throw-away databases) |
| `npm run lint` | ESLint for the whole project |

## Backend

### Layout

```
server/
├── app.js                  entry used by Vite (re-exports src/app.js)
├── start.js                production entry: serves dist, graceful shutdown
├── scripts/seed.js         npm run seed
├── tests/                  node:test suites, one throw-away database per file
└── src/
    ├── app.js              express app + bootstrap (connect, indexes, seed)
    ├── config/             env.js, database.js, constants.js
    ├── core/               errors, pagination, security, text helpers, logger
    ├── middleware/         authenticate, rateLimit, validateId, errorHandler, requestLogger
    ├── routes/index.js     mounts every module under /api and /api/admin
    ├── seed/               starter posts and causes, idempotent seeding
    └── modules/
        ├── auth/  users/  audit/  settings/  dashboard/  uploads/
        ├── posts/  causes/  leads/
        └── donations/      donations, checkout, webhook and the demo checkout
```

Each module follows the same shape, so a new feature is easy to find and easy to copy:

| File | Responsibility |
| --- | --- |
| `*.routes.js` | URL, middleware and which controller handles it |
| `*.controller.js` | Reads the request, calls the service, shapes the response |
| `*.service.js` | Business rules and database work. No `req` or `res` in here |
| `*.model.js` | Mongoose schema and indexes |

Errors are thrown as `HttpError` (see `core/errors.js`) and turned into `{ "error": "message" }` by
`middleware/errorHandler.js`. Unexpected errors become a generic 500 and are logged, never sent to the client.

### Conventions

- **Pagination.** Every list endpoint accepts `?page=` and `?limit=` (default 10, max 100) and returns
  `{ <items>, pagination: { page, limit, total, totalPages, hasNext, hasPrev } }`.
- **Auth.** Cookie session (`nvf_session`, httpOnly, sameSite lax, `secure` in production). Tokens are stored hashed
  and sessions expire on their own through a TTL index.
- **Roles.** `super_admin` and `content_manager`. Settings changes, the audit log, team management and donation
  status changes are super admin only.
- **Audit trail.** Every admin write is recorded through `audit.service.js`.
- **Payments.** Razorpay is used when the keys are set. Without keys, a demo checkout completes the gift so the
  whole flow can be shown. A gift moves to successful through one atomic update, so a webhook and a browser callback
  racing each other cannot credit a cause twice.

### API overview

Public:

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/health` | liveness and database state |
| POST | `/api/auth/login`, `/logout` · GET `/me` | session |
| GET | `/api/posts`, `/api/posts/:slug` | published posts only |
| GET | `/api/causes`, `/api/causes/:slug` | archived causes are hidden |
| POST | `/api/leads` | every public form submits here |
| POST | `/api/donations`, `/api/payments/create-order` | stores a pending gift and opens checkout |
| POST | `/api/payments/verify`, `/api/payments/webhook` | Razorpay confirmation |
| POST | `/api/payments/demo-confirm`, `/demo-fail` | demo checkout, disabled once keys are set |
| GET | `/api/donations/:id/receipt` | receipt without contact details |
| GET | `/api/settings` | public contact details |

Admin (`/api/admin/...`, needs a session): `dashboard`, `posts`, `causes`, `leads` (+ `/export` CSV), `donations`,
`settings`, `uploads`, and for super admins `audit` and `users`.

### Environment

See `.env.example`. In production `MONGO_URI` is required and the default admin password is rejected at start-up.

### Tests

```bash
npm test
```

`contract.test.js` pins the API behaviour the frontend depends on. `hardening.test.js` covers error handling,
concurrency and the Razorpay webhook.

---

Backend designed and written by Bibhudatta Satapathy.
