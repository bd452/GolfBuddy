# Golf Coaching Website – Plan

This business is an online golf coaching platform designed to help golfers improve their game through simple, accessible online instruction. The focus will be on using video analysis, drills, and clear explanations to golfers.

Golf instructor is a former All Confrence Division one golfer at UC San Diego and Cal Poly. Years of coaching experience and playing experience along with learning from some of the worlds top Swing, Short Game and Putting Coaches for years while competing.

The process should begin with potential clients selecting between Swing help (Off the Tee/Approach or both), Short Game (Bunker, Chipping, Pitching), Putting. Can also provide help with course management and tournament preparation.

The potential client will then describe the current problems they are having with their game and what they are searching for. Could be distance/accuracy. Problems could be driver slicing, chunked chips etc.

Either I will respond to this and chat and ask for specific videos or will be an automated response for videos:

- **Swing videos needed**:
  - Face-on + down-the-line for: **Driver**, **7 iron**, **wedge**
- **Chipping and/or bunker videos needed**:
  - Traditional chip with highest-lofted wedge, **down-the-line + face-on**
  - For chipping only: also include flops (or other shots the golfer is working on)
- **Putting videos needed**:
  - Face-on videos from: **3 feet**, **10 feet**, **30 feet**

After sending videos and pay, I will respond with a video responding to the clients problems, maybe 5–10 minutes. The video will include me going over the clients golf swing in depth with solutions and drills to improve game. It will also include me showing exactly how to do the drills and how to fix their problems.

Also offer one on one video lessons: **30 minute sessions** for a set price (maybe **$80**?).

The goal is to experience high quality golf coaching without needing to be at a private club or pay expensive in-person lesson fees.

---

## Product summary

### Problem
- Many golfers want expert coaching but are blocked by private-club access, high in-person lesson costs, scheduling friction, and limited local coaching quality.

### Solution
- A streamlined online coaching experience focused on:
  - Fast intake (choose coaching category + describe issues)
  - Simple video upload requirements (clear instructions)
  - Clear pricing and checkout
  - Professional coach response video (5–10 minutes) with analysis + drills
  - Optional live 1:1 video lesson (30 minutes)

### Target users
- Recreational golfers seeking quick improvement (distance, accuracy, consistency)
- Competitive golfers seeking course management / tournament prep
- Golfers without easy access to premium private-club instruction

### Value proposition
- Premium-quality, practical coaching delivered remotely, with clear drills and actionable next steps.

---

## Core user flows (MVP)

### Flow A: Asynchronous video analysis (primary)
- **Choose help category**
  - Swing: Off the tee / approach / both
  - Short game: bunker / chipping / pitching
  - Putting
  - Optional add-on: course management + tournament prep notes
- **Describe the issue(s)**
  - Free-form text + optional “goals” (distance, accuracy, consistency, scoring)
- **Receive video requirements automatically**
  - Clear shot list + filming instructions + examples
- **Upload required videos**
  - Validate count/angles/distances where possible
- **Pay**
  - Confirmation email + “what happens next” timeline
- **Coach delivers response**
  - A coach-recorded video (target 5–10 minutes) with:
    - What’s happening
    - Why it happens
    - Fix priorities (1–3)
    - Drills (with demos)
    - Practice plan (simple weekly structure)
- **Client follow-up (optional)**
  - A short Q&A window or “next analysis” upsell (configurable)

### Flow B: Live 1:1 lesson (secondary)
- **Book a 30-minute session**
  - Pick available time slots
  - Pay
  - Receive calendar invite + prep instructions
- **Conduct lesson**
  - Live call + screen share video analysis as needed
- **Follow-up**
  - Optional summary notes + drills list

---

## Coaching categories & intake requirements

### Swing help
- **Client selects**: off the tee / approach / both
- **Required uploads**:
  - Driver: face-on + down-the-line
  - 7 iron: face-on + down-the-line
  - Wedge: face-on + down-the-line

### Short game
- **Client selects**: bunker / chipping / pitching
- **Required uploads**:
  - “Traditional chip” with highest-lofted wedge: down-the-line + face-on
  - If chipping: flops and/or the specific shots they struggle with
  - If bunker: include standard greenside bunker reps (angles as above)

### Putting
- **Required uploads**:
  - Face-on:
    - 3 feet
    - 10 feet
    - 30 feet

### Course management / tournament prep (optional)
- **Inputs** (no video required):
  - Typical score range + handicap estimate
  - Common miss patterns
  - Home course type (parkland/links/desert), wind conditions
  - Tournament format + typical pressure points

---

## Site structure (information architecture)

### Public pages
- **Home**
  - Clear “how it works” section
  - Category selection CTA
  - Coach credibility (playing/coaching background)
  - Example drills + sample clip snippets (if available)
- **Services**
  - Asynchronous video analysis
  - Live 1:1 lesson (30 minutes)
  - Course management / tournament prep (optional)
- **Pricing**
  - Simple packages (good/better/best optional)
  - Turnaround time estimates
- **How it works**
  - Step-by-step with filming requirements
- **About**
  - Coach bio + credentials + coaching philosophy
- **FAQ**
  - Video requirements, timeline, refunds, privacy
- **Contact**
- **Legal**
  - Privacy policy, terms, refund policy, consent to share videos (optional)

### Logged-in pages (MVP: accounts required via Email/Password)
- **Client dashboard**
  - Orders, status, upload links, delivered videos, invoices/receipts
- **Upload portal**
  - Clear checklist + progress indicators

### Admin/coach pages
- **Queue**
  - New intakes, missing videos, ready for review, delivered
- **Client detail**
  - Intake text, videos, notes, payment status
- **Delivery**
  - Upload response video + send email to client

---

## Functional requirements (MVP)

### Intake & uploads
- **Category selection** with sub-options (swing/short-game/putting + subtypes)
- **Form capture**: text problem description + goals
- **Automated “video checklist” generation** based on selected category
- **Video upload**
  - Multiple files
  - Large-file support (chunked/resumable if possible)
  - Mobile-first UX (most golfers record on phones)
  - Basic validation (required angles/distances; at minimum, checklist + confirmations)

### Payments
- **Checkout** for:
  - Asynchronous analysis package(s)
  - Live 1:1 session (30 minutes, e.g. $80)
- **Receipts** + order confirmations

### Delivery & communication
- **Order status tracking**
  - Submitted → Waiting on videos → In review → Delivered
- **Coach delivery**
  - Upload response video
  - Client receives email with secure link
- **Optional chat**
  - Simple messaging can be v1; can start with email (no in-app messaging)

### Scheduling (for 1:1 lessons)
- Availability management
- Booking page + confirmation email + calendar invite

---

## Non-functional requirements

### Performance & UX
- Fast, mobile-first experience
- Upload reliability on cellular networks

### Privacy & consent
- Secure storage of user videos
- Clear consent language and deletion policy
- Ability for client to request deletion

### Turnaround time
- Display expected delivery time (e.g., “within 48–72 hours”) and set expectations

### Accessibility
- Readable typography, high-contrast UI, keyboard navigation for forms

---

## Content & brand requirements

### Voice and positioning
- Calm, practical, clear coaching language
- “Simple, accessible instruction” with actionable drills

### Credibility elements
- Coach background:
  - Former All Conference Division I golfer (UC San Diego, Cal Poly)
  - Years of coaching + competition experience
  - Learned from top swing/short game/putting coaches while competing

### Media assets (nice-to-have early)
- Short sample analysis clip(s)
- Drill demonstration snippets
- Before/after testimonials (when available)

---

## Pricing & packaging (initial proposal)

### Asynchronous video analysis
- Single price per category OR tiered packages:
  - **Basic**: 1 issue focus + 1–2 drills
  - **Standard**: 2–3 priorities + drills + practice plan
  - **Premium**: includes follow-up Q&A window or second check-in

### Live 1:1
- **30 minutes** at fixed price (e.g., **$80**)

---

## Implementation approach (recommended)

### MVP (ship fast)
- Public marketing pages + intake + uploads + payment + delivery email
- Admin queue for coach to manage clients and deliver response videos
- Lightweight client portal (orders + links)

### V2 improvements
- In-app chat + structured follow-ups
- Better upload validation (angle detection / guided capture)
- Practice plan templates + progress tracking
- Membership/subscription option

---

## Technical plan (suggested stack; adjustable)

### Web app
- Frontend: Next.js (React) or similar
- Backend: Node/Next API routes or a small API service
- Auth (MVP): Firebase Authentication (Email/Password)

### Video storage & delivery
- Object storage for uploads (secure, expiring links)
- Separate “response video” storage with secure playback links

### Payments & scheduling
- Payments: Stripe
- Scheduling: Calendly integration or in-app scheduling (later)

### Analytics
- Track conversion funnel: visit → service select → checkout start → paid → delivered

---

## Milestones (practical build sequence)

### Milestone 1: Public site + service definition
- Home/Services/Pricing/How-it-works/About/FAQ/Contact/Legal

### Milestone 2: Intake + uploads + payments
- Category selection + form + upload portal + Stripe checkout

### Milestone 3: Coach admin queue + delivery
- Admin dashboard + delivery workflow + email notifications

### Milestone 4: Live lesson booking
- Scheduling + payment + calendar invites

---

## Open questions (to finalize during build)
- Final pricing for asynchronous analysis and any tiers
- Turnaround time commitment (e.g., 48 hours weekdays)
- Refund policy specifics
- Auth method for MVP (decided): Email/Password
- Whether to include a fixed follow-up window (e.g., 7 days Q&A)

