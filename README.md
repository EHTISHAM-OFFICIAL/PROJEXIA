# MECTEC

Electronics project showcase and client request platform. React + TypeScript + Firebase, built to be run and maintained by one developer.

---

## Quick start

```bash
npm install
cp .env.example .env     # then fill in your Firebase values
npm run dev
```

Open http://localhost:5173.

The site will load, but the projects page will be empty until Firestore has data and the security rules are deployed. Work through **Firebase setup** below.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check only, no build |
| `npm run seed` | Add sample projects to Firestore |

---

## Firebase setup

You need a Firebase project with Firestore, Authentication and Storage enabled.

### 1. Environment variables

Firebase Console → Project settings → General → Your apps → SDK setup and configuration. Copy the values into `.env`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Vite reads `.env` only at startup, so restart the dev server after editing it.

**These values are not secrets.** They ship inside the JavaScript bundle by design — they identify your project, they do not authorise anything. All real security comes from `firestore.rules` and `storage.rules`. `.env` is gitignored for config hygiene (different values per environment), not secrecy.

### 2. Enable the services

- **Firestore** → Create database → start in **production mode** (the rules in this repo replace the defaults).
- **Authentication** → Sign-in method → enable **Email/Password**. Nothing else is needed; there is no public sign-up.
- **Storage** → Get started.

### 3. Deploy the rules and indexes

```bash
npm install -g firebase-tools
firebase login
firebase use --add            # select your project
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

Do this **before** putting the site online. Until the rules are deployed, Firestore's default rules apply and your data is either fully locked or fully open depending on the mode you chose.

### 4. Creating an admin account

There is no sign-up page. Admin access is granted by hand, in two steps.

**a. Create the user.** Firebase Console → Authentication → Users → Add user. Enter an email and password. Copy the **User UID** that appears in the table.

**b. Grant admin.** Firestore → Start collection → Collection ID `admins`. Create a document whose **Document ID is exactly that UID**, with these fields:

| Field | Type | Value |
|---|---|---|
| `role` | string | `admin` |
| `email` | string | your email |
| `createdAt` | timestamp | now |

Only the existence of the document matters; the fields are for your own reference.

Now sign in at `/admin/login`.

**Why a document instead of an email check?** A rule like `request.auth.token.email == "me@example.com"` looks simpler, but a user can change their own account email, and revoking access means editing and redeploying rules. A document can be deleted in one click, and multiple admins cost nothing. Firestore custom claims would be marginally better but require the Admin SDK or a Cloud Function, which this project deliberately avoids.

### 5. Sample data (optional)

```bash
SEED_EMAIL=you@example.com SEED_PASSWORD=yourpassword npm run seed
```

Adds five sample projects, each marked `isSample: true` with a slug starting `sample-`. They have no images, so cards show a neutral placeholder — that is intentional, so they are never mistaken for real work.

Remove them once you have your own:

```bash
SEED_EMAIL=... SEED_PASSWORD=... node scripts/seed.mjs --remove
```

Then delete `scripts/seed.mjs`.

---

## Before you go live

Replace the placeholder values in **`src/constants/site.ts`**. Every one is marked `TODO`:

```ts
email: 'contact@mectec.pk',   // TODO — your real address
whatsapp: '',                 // TODO — e.g. 923001234567 (no + or spaces)
phone: '',                    // TODO
```

Empty WhatsApp, phone and social links are hidden automatically rather than rendering as dead links, so the site is presentable even before you fill them in.

Also update:
- `SITE.url` in `src/constants/site.ts` — used for canonical URLs and OG tags
- `public/robots.txt` and `public/sitemap.xml` — replace `https://mectec.pk`

---

## Deployment

```bash
npm run build
firebase deploy --only hosting
```

Or everything at once:

```bash
firebase deploy --only hosting,firestore:rules,firestore:indexes,storage:rules
```

`firebase.json` rewrites all routes to `index.html`, which is what makes deep links like `/projects/some-slug` work in a single-page app. Hashed assets get a one-year immutable cache; `index.html` is never cached, so a deploy takes effect immediately.

Any static host works — Netlify, Vercel, Cloudflare Pages — as long as you configure the same SPA fallback. Firebase Hosting is simplest because it is already in the same project.

---

## Data model

### `projects/{autoId}`

Public read when `published == true`. Admin write.

Grouped roughly as: identity (`title`, `slug`, `shortDescription`), classification (`category`, `status`, `difficulty`, `technologies`, `tags`), case study (`description`, `problemStatement`, `objectives`, `solutionOverview`, `howItWorks`, `features`, `challenges`, `results`), technical (`components[]`, `specifications[]`, `estimatedCost`), media (`media.thumbnailUrl`, `media.heroImageUrl`, `media.gallery[]`, `media.videoUrl`), and control (`featured`, `published`, `viewCount`, `createdAt`, `updatedAt`, `completedAt`).

Full field types are in `src/types/project.ts`. Every optional section disappears from the public page when empty — no blank headings.

### `projectRequests/{autoId}`

Public **create only**. No public read, update or delete. Admin full access.

Nested blocks mirror the ten form sections: `contact`, `project`, `technical`, `software`, `scale`, `budget`, `timeline`, `references`, `attachments[]`, `additionalRequirements`, `consent`, plus `admin` (internal notes and quote) and `metadata`.

### `contactMessages/{autoId}`

Public create with field validation. Admin read.

### `admins/{uid}`

A user can read only their own document. Not listable, not writable from the client.

---

## Storage layout

```
projects/{projectId}/thumbnail/{file}     public read, admin write
projects/{projectId}/gallery/{file}       public read, admin write
projects/{projectId}/videos/{file}        public read, admin write
projectRequests/{requestId}/attachments/{file}   admin read, public create only
```

Request attachments are **not** publicly readable — they can contain private drawings or specifications. Limits (5 files, 5 MB each, specific MIME types) are enforced in `storage.rules`; the same values in `src/constants/requestOptions.ts` exist only to give fast feedback in the browser.

---

## Request reference numbers

Requests get a reference like `MECTEC-2026-K4T9RQ`: the year plus six random characters from a 31-character alphabet with look-alikes (`I`, `L`, `O`, `0`, `1`) removed.

**This is random, not sequential** — a deliberate change from the original plan. A true counter (`0001`, `0002`, …) needs a shared document that unauthenticated visitors can write to, which is an obvious target: one script can burn through your numbering or lock the document with contention. Six random characters give about 27 billion combinations per year, so collisions are not a practical concern, and an unguessable reference is a small privacy win.

**If you later want sequential numbers**, that needs a Cloud Function (Blaze plan) so the counter lives server-side:

1. Write an `onDocumentCreated` trigger for `projectRequests/{id}`.
2. Inside a transaction, read and increment `counters/projectRequests`.
3. Write the formatted number back onto the request document.
4. Remove `generateRequestNumber()` from `src/services/requestService.ts`.

Existing random references stay valid; nothing needs migrating.

---

## How search works

Firestore has no full-text search. The projects page fetches all published projects once and filters in memory (`useFilteredProjects` in `src/hooks/useProjects.ts`).

This is the right trade-off at this scale: instant filtering, no extra service, no cost. It stops being right somewhere in the low hundreds of projects, when the initial fetch gets slow. At that point, see `ARCHITECTURE.md` for the migration path to Algolia or Typesense — it is contained to the service and hook layer.

---

## SEO

Meta tags are set on navigation by `src/components/ui/Seo.tsx`. Google executes JavaScript, so indexing works.

**What does not work:** link-preview crawlers that do not run JavaScript — WhatsApp, Slack, Facebook, Twitter. A link shared there shows the tags from `index.html`, not the project-specific ones. If previews matter, pre-render with `vite-plugin-ssr` or move the project pages to a framework with static generation.

`public/sitemap.xml` lists the five static pages. Project URLs are not in it. To add them, write a small script that reads published projects and regenerates the file as part of your deploy.

---

## Recommended: App Check

The request and contact forms are open to the internet by necessity. They have honeypot fields, which stops naive bots, and the rules cap field lengths, which stops bulk abuse. Neither stops a determined attacker.

[Firebase App Check](https://firebase.google.com/docs/app-check) with reCAPTCHA v3 rejects requests that do not come from your real site, at the infrastructure level. It is free and takes about fifteen minutes. Worth doing before you publicise the site.

---

## Troubleshooting

**"Missing Firebase environment variables"** — `.env` is missing or the dev server was started before it existed. Restart it.

**"The query requires an index"** — the console error contains a direct link to create it. Or deploy the ones in this repo: `firebase deploy --only firestore:indexes`.

**Signed in but see "No admin access"** — the `admins/{uid}` document does not exist, or its ID does not exactly match the UID from Authentication → Users. It is easy to paste an email by mistake.

**Projects page is empty but data exists in Firestore** — check `published` is `true` (boolean, not the string `"true"`), and that the rules are deployed.

**Images do not appear after upload** — check the Storage rules are deployed and that you are signed in as an admin.

**"Permission denied" when submitting a request** — the rules validate the payload. The most common causes are consent checkboxes not being `true`, or `status` not being `'new'`.

---

## Project structure

See `ARCHITECTURE.md` for the layering rules and the reasoning behind each decision. The short version:

```
Component  →  Hook  →  Service  →  Firebase
```

No component imports `firebase/firestore` directly. If you need new data, add a service function, wrap it in a hook, then use the hook. That one rule is what keeps the codebase navigable as it grows.
