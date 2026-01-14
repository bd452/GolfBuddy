# Architecture (GolfBuddy)

This document describes the recommended technical architecture to implement the product plan in `SUMMARY.md`.

## Goals

- **Ship fast (MVP-first)**: marketing site + intake + video uploads + payment + coach delivery + basic client portal.
- **One codebase**: Next.js for web UI and backend endpoints.
- **Firebase as system-of-record**: Auth + Firestore + Storage.
- **Secure by default**: least-privilege access, private video storage, auditable admin actions.
- **Production-ready**: clear env/config, webhook safety, deployments, and observability hooks.

## High-level stack (opinions / defaults)

- **Web**: Next.js (App Router) + TypeScript
- **Mobile (iOS/Android)**: React Native via Expo + TypeScript
- **Backend**: Next.js Route Handlers / Server Actions (Node.js runtime) + Firebase Admin SDK
- **UI**: Tailwind CSS + shadcn/ui (optional, but a strong default)
- **Database**: Firebase **Firestore**
- **Auth**: Firebase **Authentication**
- **File storage**: Firebase **Storage** (private objects; access via authenticated download; signed URLs optional)
- **Payments**: Stripe (Checkout + Webhooks)
- **Scheduling (1:1 lessons)**: Calendly (or similar) embed (MVP) with optional future in-app scheduling
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
  - Auth: client sign-in via **Email/Password** (MVP choice)
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

## Responsibility & platform split (web / mobile / back-end)

This project supports **Web (Next.js)** and **Native mobile (iOS/Android)** clients. The key rule:

- **Back-end business logic is authoritative** (payments, access control, status transitions, private media access, cross-user/admin actions).
- **Front-end business logic is UX-only** (form state, client-side convenience validation, upload progress orchestration). It must be safe if bypassed.

Below is the explicit separation requested.

### Web-only business logic (front-end, UX-only)

- **Marketing/SEO orchestration**: landing page experiments, client-side analytics events, A/B UI decisions.
- **Admin UI helpers**: client-side filtering/sorting of queue results, keyboard shortcuts, playback layout preferences.

> Note: Coach/admin *decisions* that affect data (deliver, refund, status change) are **back-end logic** even if initiated from a web-only screen.

### Web-only UI

- Public marketing pages: Home/Services/Pricing/How-it-works/About/FAQ/Contact/Legal
- Coach/Admin console screens (web-only): Queue, Client detail/review workspace, Delivery workflow UI, Admin settings UI

### Hybrid business logic (front-end, UX-only; shared patterns across web + mobile)

- **Intake form state**: guided steps, draft saving, inline validation messaging.
- **Checklist rendering**: showing required uploads and completeness indicators (server is still source-of-truth).
- **Order timeline presentation**: mapping `status` to human-friendly labels and “what happens next”.
- **Playback UX rules**: default sorting/grouping of uploads, “mark watched” local state (if used).

### Hybrid UI (client-facing; web + mobile)

- Client auth screens (sign-in/up)
- Client dashboard (orders list + statuses)
- Order detail (intake summary, checklist, upload state, delivered response access)
- Upload portal entry (guidance, checklist, progress UI)
- Basic support/help surfaces (contact, FAQ subset)

### Mobile-only business logic (front-end, UX-only)

- **Guided capture workflow state machine**: step-by-step camera prompts that map captures to checklist items.
- **Upload manager implementation**: background/resumable upload queueing, retries, “upload on Wi‑Fi” behavior (implementation detail; server still validates what’s allowed).
- **Push notification client handling**: registering for notifications, routing taps to deep links, local notification preferences.

### Mobile-only UI

- In-app camera capture UX (framing tips, retake flow, per-clip labeling)
- Upload manager screens (queued uploads, progress, retry/resume prompts)
- Push-notification entry points (deep links into a specific order/response)

### Back-end business logic (authoritative; platform-agnostic, with platform-specific sub-areas)

These rules run server-side (Next.js Route Handlers / Server Actions + Firebase Admin) and apply regardless of client.

- **AuthZ / entitlements**
  - order ownership checks (`clientUid === requesterUid`)
  - role checks (coach/admin)
  - prevent client writes to sensitive fields (`status`, `stripe*`, delivery metadata)
- **Order lifecycle**
  - allowed status transitions and invariants
  - “upload window” policy and states (`paid`/`awaiting_videos`)
  - completeness computation: which required uploads are satisfied
- **Payments (Stripe)**
  - create checkout sessions
  - verify webhooks
  - finalize orders as `paid`, record Stripe IDs
  - refunds (admin-only)
- **Secure media policy**
  - canonical storage paths
  - delivery access (MVP): **dashboard-only** via authenticated download (no email media links)
  - (optional) server-generated signed URLs for time-limited access (V2+ / special cases)
  - response visibility rules (only owning client, coach/admin)
- **Communication triggers**
  - confirmation, reminder, and delivery emails
  - (optional) push notification send triggers
- **Auditing**
  - record who performed admin actions (deliver/refund/status changes)

Platform-specific back-end areas (still under back-end):

- **[Mobile] Push token registration validation**: ensure device tokens are bound to the authenticated user; revoke on sign-out.
- **[Mobile] Upload constraints policy**: max size/duration/content-type; allow/deny cellular uploads (policy) and enforce in upload-init endpoints.
- **[Web] Admin/coach operational policy**: additional auditing requirements, “two-step delivery” workflows, internal-only notes retention.

## Native mobile app strategy (Expo + Firebase)

Mobile apps (iOS/Android) should be first-class clients that use the same Firebase Auth/Firestore/Storage data model as web, while relying on the Next.js backend for privileged operations (Stripe, admin actions, optional signed URLs).

### What mobile talks to

- **Direct to Firebase (client SDKs)**:
  - Firebase Auth (sign in/out)
  - Firestore (read/write client-owned docs, e.g., drafts; read order status)
  - Firebase Storage (upload client videos to allowed paths; download allowed media)
- **To Next.js backend (server endpoints)**:
  - Stripe checkout session creation + webhook finalization
  - (optional) signed URL generation for response video access (V2+)
  - admin/coach operations (web-only UI, but server endpoints are shared)
  - (optional) push notification trigger endpoints

### Push notifications (recommended for mobile)

- Use **Firebase Cloud Messaging (FCM)**.
- Store device tokens in Firestore (e.g., `users/{uid}/devices/{deviceId}`) with server-side validation.
- Send notifications from server-side code (Next.js backend using Firebase Admin SDK), triggered by lifecycle events (paid, delivered, lesson reminder).

### Deep linking

- Define canonical deep links that work across platforms:
  - Web: `https://<app>/orders/{orderId}`
  - Mobile: `golfbuddy://orders/{orderId}` (and/or universal links/app links)
- Emails should include web links that can open the app when installed (universal links), but always work in browser.

### Mobile payments (MVP options)

Pick one and document it per release:

- **Option A (simplest)**: open Stripe **Checkout** in an in-app browser, return via success/cancel URLs.
- **Option B (best native UX)**: Stripe **PaymentSheet** in the mobile app + server-created PaymentIntents.

Important: app store policies can require in-app purchases for some digital goods; confirm before launching paid mobile flows.

### Mobile uploads (MVP guidance)

- Use Firebase Storage uploads from the mobile app.
- Implement a mobile upload queue (retry/pause/resume) for large videos; treat this as client UX, while server remains authoritative about allowed orders/keys/paths.

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
      notifications/route.ts # optional (FCM triggers)
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
  apps/
    mobile/                 # Expo React Native app (iOS/Android)
      app/...
      src/...
  packages/
    shared/                 # shared types/schemas (optional but recommended)
      src/...
  firestore/
    rules/                  # security rules source (optional)
  scripts/                  # dev utilities (optional)
```

Notes:
- Use **server-only modules** for Firebase Admin SDK and Stripe secrets.
- Keep all domain logic in `lib/` (thin routes, testable functions).
 - Prefer shared, versioned schemas for domain data (e.g., Zod) in `packages/shared` so web/mobile stay consistent.

## Firebase project setup

Create a Firebase project with:

- **Authentication**
  - Enable **Email/Password** (MVP choice). (Optional later: Email Link, Google, etc.)
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

Optional: store minimal booking metadata for a cohesive in-app experience (even if Calendly remains the system-of-record).

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
- (optional) server-generated **signed URLs** for time-limited access (V2+).

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

- **Accounts**: require login for dashboard + uploads (**Email/Password**).
- **Uploads**: use Firebase Storage with authenticated access; keep upload rules strict.
- **Delivery**: store coach response in Storage and require login to view it in the dashboard (no email media links in MVP).
- **Scheduling**: embed Calendly (or similar) and record minimal booking metadata in Firestore for cohesion.

## Future extensions (V2+)

- In-app messaging (thread per order)
- Automated upload validation (guided capture, angle confirmation, client checklist enforcement)
- Practice plan templates + progress tracking
- Subscription/membership tiers
- Admin analytics dashboard

