# Architecture (GolfBuddy)

This document describes the recommended technical architecture to implement the product plan in `SUMMARY.md`.

## Goals

- **Ship fast (MVP-first)**: marketing site + intake + video uploads + payment + coach delivery + basic client portal.
- **One codebase**: Next.js for web UI and backend endpoints.
- **Firebase as system-of-record**: Auth + Firestore + Storage.
- **Secure by default**: least-privilege access, private video storage, auditable admin actions.
- **Production-ready**: clear env/config, webhook safety, deployments, and observability hooks.

## High-level stack (opinions / defaults)

- **Web + backend**: Next.js (App Router) + TypeScript
- **UI**: Tailwind CSS + shadcn/ui (optional, but a strong default)
- **Database**: Firebase **Firestore**
- **Auth**: Firebase **Authentication**
- **File storage**: Firebase **Storage** (private objects; access via signed URLs or authenticated download)
- **Payments**: Stripe (Checkout + Webhooks)
- **Scheduling (1:1 lessons)**: Calendly embed (MVP) with optional future in-app scheduling
- **Email**: Resend (simple DX) for transactional mail (order confirmations, delivery emails)
- **Hosting**: Vercel (simplest Next.js deploy); Firebase used for managed data/storage/auth

## System overview

### Components

- **Next.js app**
  - Public marketing pages: Home, Services, Pricing, How it Works, About, FAQ, Contact, Legal
  - Authenticated client area: Dashboard, Orders, Upload Portal
  - Coach/Admin area: Queue, Client detail, Delivery workflow
  - Backend endpoints (Route Handlers): intake creation, upload session creation, Stripe webhook handling, delivery notifications, admin actions
- **Firebase**
  - Auth: client sign-in (email link or password; pick one)
  - Firestore: users, intakes/orders, upload metadata, response video metadata, booking metadata
  - Storage: raw client uploads + coach response videos
- **Stripe**
  - Checkout session creation
  - Webhooks to finalize orders, update status, and trigger emails

### Request flow (MVP)

1. User completes **intake** (category + description + goals).
2. App creates an **Order** in Firestore with status `draft`.
3. User completes **Stripe Checkout**.
4. Stripe webhook marks Order `paid` and (optionally) enables uploads.
5. User uploads required videos to Firebase Storage; metadata written to Firestore.
6. Coach views admin **Queue**, reviews videos, records response video.
7. Coach uploads response video; Order moves to `delivered`; user gets an email + dashboard update.

## Monorepo layout (single Next.js app)

Recommended structure:

```
/
  app/                      # Next.js App Router (routes + pages)
    (marketing)/...
    (auth)/...
    (client)/dashboard/...
    (admin)/admin/...
    api/                    # Route Handlers (server-side)
      stripe/webhook/route.ts
      orders/route.ts
      uploads/route.ts
  components/
  lib/
    firebase/
      client.ts
      admin.ts
    stripe/
      server.ts
    auth/
      requireUser.ts
      requireAdmin.ts
  firestore/
    rules/                  # security rules source (optional)
  scripts/                  # dev utilities (optional)
```

Notes:
- Use **server-only modules** for Firebase Admin SDK and Stripe secrets.
- Keep all domain logic in `lib/` (thin routes, testable functions).

## Firebase project setup

Create a Firebase project with:

- **Authentication**
  - Enable Email/Password (easiest) or Email Link (nice UX); Google optional.
  - Store a user profile doc on first sign-in.
- **Firestore**
  - Native mode
  - Indexes as needed (admin queue filtering).
- **Storage**
  - Private bucket.
  - Use folder conventions to separate client uploads and coach responses.

### Local Firebase tooling (recommended)

- Use the Firebase Emulator Suite for Auth/Firestore/Storage during development.
- Keep production credentials out of local defaults; use `.env.local`.

## Data model (Firestore)

Names are suggestions; keep them stable once clients exist.

### `users/{uid}`

- `uid`: string
- `email`: string
- `role`: `"client" | "coach" | "admin"` (MVP can be `"client"` and `"coach"`)
- `createdAt`: timestamp
- `displayName?`: string

### `orders/{orderId}`

Represents a paid product: async analysis or live lesson booking.

- `orderId`: string
- `clientUid`: string
- `type`: `"async_analysis" | "live_lesson"`
- `category`: `"swing" | "short_game" | "putting" | "course_management"` (plus subtypes)
- `subCategory?`: e.g. `"off_the_tee" | "approach" | "both" | "bunker" | "chipping" | "pitching"`
- `goals?`: string[] (distance, accuracy, consistency, scoring)
- `description`: string
- `status`:
  - `"draft"` (created before payment)
  - `"awaiting_payment"`
  - `"paid"`
  - `"awaiting_videos"`
  - `"in_review"`
  - `"delivered"`
  - `"cancelled"`
  - `"refunded"`
- `requiredUploads`: array of `{ key: string; label: string; angle: "face_on" | "down_the_line"; clubOrDistance?: string }`
- `stripeCheckoutSessionId?`: string
- `stripePaymentIntentId?`: string
- `amountCents?`: number
- `currency?`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp
- `deliveredAt?`: timestamp

### `orders/{orderId}/uploads/{uploadId}`

- `uploadId`: string
- `key`: string (matches `requiredUploads.key`)
- `storagePath`: string
- `contentType`: string
- `sizeBytes`: number
- `uploadedAt`: timestamp
- `originalFilename?`: string

### `orders/{orderId}/responses/{responseId}`

- `responseId`: string
- `storagePath`: string
- `durationSeconds?`: number
- `createdByUid`: string (coach/admin)
- `createdAt`: timestamp

### `bookings/{bookingId}` (optional in MVP)

Only if you don’t want Calendly to be the system-of-record.

- `bookingId`: string
- `clientUid`: string
- `orderId?`: string
- `provider`: `"calendly" | "internal"`
- `startsAt`: timestamp
- `endsAt`: timestamp
- `meetingUrl?`: string
- `createdAt`: timestamp

## Storage layout (Firebase Storage)

Use deterministic, permission-friendly paths:

- Client uploads:
  - `client-uploads/{clientUid}/{orderId}/{uploadId}.mp4`
- Coach response videos:
  - `coach-responses/{orderId}/{responseId}.mp4`

Do **not** expose raw bucket paths to the client UI; prefer:
- authenticated download via Firebase SDK, or
- server-generated **signed URLs** for time-limited access (ideal for delivery emails).

## Security model

### Auth & roles

- Users authenticate via Firebase Auth.
- Assign coach/admin role via:
  - a `users/{uid}.role` field + server checks, and/or
  - Firebase Auth custom claims (more robust; recommended for admin gating).

### Firestore rules (principles)

- Clients can read/write **only their own** documents:
  - Read `orders` where `clientUid == request.auth.uid`
  - Write drafts only; server transitions statuses after payment/webhooks.
- Coaches/admins can read all orders and write review/delivery fields.
- Prevent clients from editing sensitive fields (e.g., `status`, `stripe*` ids).

### Storage rules (principles)

- Clients can upload only to:
  - `client-uploads/{uid}/{orderId}/...` **and** only if that order belongs to them and is in an upload-allowed state.
- Clients can read their response videos only for their orders.
- Coaches/admins can read all client uploads and write responses.

Because Storage rules can’t easily enforce all cross-document constraints, keep the MVP safe by:
- generating upload destinations on the server (Route Handler),
- writing upload metadata via server validation, and/or
- using signed upload URLs (advanced; optional).

## Backend API (Next.js Route Handlers)

### Public/Client

- `POST /api/orders`
  - Create an `order` in `draft` or `awaiting_payment`
  - Generate `requiredUploads` based on category
- `POST /api/stripe/checkout`
  - Create Stripe Checkout session for an existing order
- `POST /api/uploads/init`
  - Validate order ownership + status
  - Return allowed upload keys and storage paths (or signed URLs if used)

### Webhooks

- `POST /api/stripe/webhook`
  - Verify signature
  - On `checkout.session.completed` / `payment_intent.succeeded`:
    - set order `paid` (and usually `awaiting_videos`)
    - send confirmation email

### Admin/Coach

- `POST /api/admin/orders/{orderId}/status`
  - Move `paid -> awaiting_videos -> in_review -> delivered` with server authorization
- `POST /api/admin/orders/{orderId}/deliver`
  - Record response metadata + trigger delivery email

## Frontend pages (Next.js App Router)

### Marketing

- `/` home
- `/services`, `/pricing`, `/how-it-works`, `/about`, `/faq`, `/contact`, `/legal/*`

### Client

- `/dashboard`
  - list orders + statuses
- `/orders/[orderId]`
  - intake details + upload checklist + delivered response links
- `/orders/[orderId]/upload`
  - guided uploads + progress UI

### Admin/Coach

- `/admin/queue`
  - filter by `status` (awaiting videos, in review, delivered)
- `/admin/orders/[orderId]`
  - intake text, upload playback, internal notes, deliver response

## Environment variables

Use `.env.local` for dev and provider secrets in production.

### Firebase (client)

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Firebase Admin (server)

Prefer Google application default creds in Vercel, or store a service account JSON via env:

- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (newline-safe; replace `\\n` with `\n`)

### Stripe

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Email (Resend)

- `RESEND_API_KEY`
- `EMAIL_FROM`

### App

- `NEXT_PUBLIC_APP_URL` (used for webhook redirects and email links)

## Deployment

### Vercel (recommended)

- Deploy Next.js directly on Vercel.
- Configure all env vars in Vercel project settings.
- Add Stripe webhook endpoint pointing to:
  - `https://<your-domain>/api/stripe/webhook`

### Firebase

- Firestore and Storage are managed services; update security rules as part of releases.

## Observability / logging

- Server logs via Vercel logs (Route Handlers).
- Track funnel metrics (simple MVP):
  - service select → intake submit → checkout started → paid → delivered
- Consider Sentry later for frontend + server error visibility.

## Recommended MVP scope decisions (to reduce complexity)

- **Accounts**: require login for dashboard + uploads (Email/Password easiest).
- **Uploads**: use Firebase Storage with authenticated access; keep upload rules strict.
- **Delivery**: store coach response in Storage and email a signed URL that expires (e.g., 7 days) plus keep access via dashboard.
- **Scheduling**: embed Calendly and record only minimal booking metadata in Firestore (or none until v2).

## Future extensions (V2+)

- In-app messaging (thread per order)
- Automated upload validation (guided capture, angle confirmation, client checklist enforcement)
- Practice plan templates + progress tracking
- Subscription/membership tiers
- Admin analytics dashboard

