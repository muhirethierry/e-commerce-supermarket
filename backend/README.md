# FreshMart API

The initial backend is an Express API backed by Prisma and SQLite. SQLite keeps local development simple; Prisma makes it possible to move to PostgreSQL later without rewriting the API queries.

## Local setup

From the `backend` directory in PowerShell:

```powershell
npm install
Copy-Item .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

The seed imports the current sample catalog from `frontend/src/data/products.js`. Prices are stored as integer RWF amounts. Rerunning the seed updates matching product IDs; rows removed from the sample catalog are not automatically deleted.

## Endpoints

- `GET /api/health` checks the API and database connection.
- `GET /api/categories` returns the distinct catalog departments.
- `GET /api/subcategories?category=...` returns distinct item types, optionally for one department.
- `GET /api/products` returns a paginated catalog. Supports `q`, `category`, `subcategory`, `sort` (`price-asc`, `price-desc`, or `name`), `page`, and `limit` (maximum 100).
- `GET /api/products/:id` returns one catalog item.
- `POST /api/auth/register` creates an account and sets an HttpOnly session cookie.
- `POST /api/auth/login` verifies an email/password and sets an HttpOnly session cookie.
- `POST /api/auth/google` verifies a Google ID token server-side when `GOOGLE_CLIENT_ID` is configured.
- `GET /api/auth/me` returns the active session user; `POST /api/auth/logout` clears the session cookie.
- `POST /api/orders` creates a pending cash-on-delivery order using current database prices and stock. Card and Mobile Money return `503 PAYMENT_PROVIDER_NOT_CONFIGURED` until a payment gateway is selected and configured.
- `POST /api/chat` provides catalog-grounded AI shopping help when `OPENAI_API_KEY` is configured on the server.

Password reset and account welcome emails use Resend when configured. Set `RESEND_API_KEY` and `EMAIL_FROM` in `backend/.env`; the sender address/domain must be verified in Resend. Registration still succeeds if the welcome email cannot be delivered, and the frontend reports that separately. Password-reset requests use the same mail configuration. Google sign-in also needs matching OAuth client IDs in both frontend and backend environment files.

## First administrator

Register your normal account in the storefront, then from the `backend` directory run `npm run admin:grant -- your-email@example.com`. This local CLI command is the only role-promotion path; no public endpoint can grant admin access. Sign out and back in so the storefront refreshes your role. Keep the admin account protected with a strong password.

To enable the live AI shopping assistant, add an OpenAI API key to `backend/.env` as `OPENAI_API_KEY`; optionally set `OPENAI_MODEL`. The key stays on the server and is never sent to the browser. The assistant receives a small list of matching, active, in-stock catalog records to ground its answer. Provider usage may incur charges.

Example:

```text
http://localhost:3000/api/products?category=Fruits%20%26%20Vegetables&sort=price-asc
```

The catalog is sample data for development. Orders currently support cash on delivery and reduce sample stock transactionally. Delivery fees and electronic payment processing are not configured. For production, set a high-entropy `AUTH_SECRET`, restrict `CORS_ORIGINS` to trusted origins, configure HTTPS, and set `GOOGLE_CLIENT_ID` to the same Google OAuth client ID used in the frontend `VITE_GOOGLE_CLIENT_ID` variable. Local development creates a temporary session secret at startup when `AUTH_SECRET` is absent, so sessions expire when the API restarts.