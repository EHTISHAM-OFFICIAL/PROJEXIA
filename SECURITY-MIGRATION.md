# Security hardening: deployment and migration guide

This release changes the data model and the sign-in flow, so the pieces must be
deployed **in this order**. Do it at a quiet time and allow about 30 minutes.
Take a Firestore export first (Console > Firestore > Import/Export, or
`gcloud firestore export`).

## What changed

| Area | Before | After |
| --- | --- | --- |
| Internal notes, quote, assignee | Stored on `projectRequests`, which the customer can read | Stored in admin-only `requestPrivate/{id}` |
| Username to email mapping | `usernameLookup` was public | Readable only by a resolver account; the Worker's `/auth/login` reveals the email only after the password is verified |
| Anonymous/open writes | No field allowlists | Key allowlists and length caps on requests, contact messages and status records |
| Public status record | Created by anyone; school form stored a plain email | Created only by the request's owner; email is always hashed |
| Request numbers | 6 characters, ~8.9e8 values | 10 characters, ~8.2e14 values (old numbers still work) |
| Customer URLs | Rendered as links as-is | Only `http(s)` URLs become links |
| Uploads | Any signed-in user, unthrottled | Per-user and per-IP throttles |

## 1. Create the resolver account (once)

1. Firebase Console > Authentication > Add user: a dedicated email and a long
   random password, e.g. `resolver@yourdomain`. Copy its **User UID**.
2. Firestore > start collection `resolvers` > document ID = that UID, with any
   field (for example `purpose: "worker"`).

Do **not** reuse a real customer or admin account. This account can read
`usernameLookup` and nothing else.

## 2. Deploy the Worker

```bash
cd cloudflare/image-upload-worker
npx wrangler secret put FIREBASE_WEB_API_KEY   # the apiKey from your Firebase web config
npx wrangler secret put RESOLVER_EMAIL
npx wrangler secret put RESOLVER_PASSWORD
npx wrangler deploy                            # also creates the rate-limit bindings
curl https://<your-worker>.workers.dev/health  # expect usernameSignIn: true and rateLimiting upload/login: true
```

If your Firebase API key is restricted by HTTP referrer, the Worker presents the
first `https://` entry of `ALLOWED_ORIGINS` as its referrer, so that origin must
be allowed on the key.

## 3. Deploy the new Firestore rules

```bash
firebase deploy --only firestore:rules
```

From this moment, **old copies of the site stop being able to sign in by username
or create requests** until they reload. Continue straight to the next steps.

## 4. Migrate existing data

```bash
# dry run first: prints what would change and changes nothing
SEED_EMAIL=<admin email> SEED_PASSWORD=<admin password> npm run migrate:privacy
# then apply
SEED_EMAIL=<admin email> SEED_PASSWORD=<admin password> npm run migrate:privacy -- --apply
```

It moves each request's `admin` block into `requestPrivate`, deletes it from the
request, and replaces plain emails in public status records with a hash. It is
safe to re-run and exits non-zero if any request failed. Until it has run, the
old `admin` data is still visible to the owning customers.

## 5. Deploy the site

```bash
npm ci && npm run build && firebase deploy --only hosting
```

Then check:

- Sign in as an admin: request notes, quotes and assignment still show and save.
- Open a customer account's request in the browser network tab: the response has
  no `admin` field.
- Sign in as a customer with the username, then with the email.
- Submit a test request and track it with the new 10-character number.

## 6. Optional but recommended: App Check

1. Firebase Console > App Check > register the web app with reCAPTCHA v3.
2. Put the site key in `.env` as `VITE_RECAPTCHA_SITE_KEY` and redeploy.
3. Watch the App Check metrics for a few days. When verified requests dominate,
   click **Enforce** for Cloud Firestore.

This is what limits bot traffic to the contact form and the project view counter,
which must stay open to anonymous visitors. Firestore rules cannot rate-limit.

## Rolling back

Redeploy the previous rules and site. Run nothing else: `requestPrivate` is new
and harmless to leave in place, but re-add its data to requests by hand if you
need the old admin screens back.

## Known limits (not fixed by this release)

- Rate limits on the Worker are per Cloudflare location and eventually
  consistent. They slow floods; they are not exact quotas. Open registration
  without email verification still lets one person create many accounts.
- `viewCount` on projects can still be incremented by anyone. It is cosmetic;
  App Check is the mitigation.
- The customer "edit request" path validates which top-level fields change, not
  the nested contents.
- The admin trash confirmation token is shown to the customer by design. It is a
  deliberate human check, not a secret.
