# PROJEXIAHUB image gateway setup

This Worker keeps both image-host API keys out of the React bundle and Firestore. It uses Firebase Authentication tokens to verify signed-in users, then checks the caller's `admins/{uid}` document for administrator uploads. Authenticated customer request attachments remain ImgBB-only to avoid changing the existing request workflow.

## 1. Create the Worker

1. Open the Cloudflare dashboard and create a Worker named `projexiahub-image-gateway`.
2. Paste the code from `src/index.ts` into the Worker editor (or deploy this folder with Wrangler).
3. Set the non-secret variables:
   - `FIREBASE_PROJECT_ID`: the exact Firebase project ID used by PROJEXIAHUB.
   - `ALLOWED_ORIGINS`: comma-separated exact origins, with no trailing slash. Include the deployed Firebase Hosting origin, any custom domain actually used by the site, and `http://localhost:5173` for local development if needed.
4. In Worker **Settings → Variables and Secrets**, add these as **encrypted secrets**, not plain-text variables:
   - `IMGBB_API_KEY`
   - `FREEIMAGE_API_KEY`
5. Deploy the Worker and copy its HTTPS `workers.dev` URL.

The default maximum image size is **10 MB per file**. Admins can change it in **Admin → Settings → Image hosting** to a whole-number value from **1 MB to 10 MB**. The setting is stored in the public, non-secret `settings/imageHosting` document and enforced by the Worker for both admin uploads and authenticated customer request attachments. The browser also checks the saved limit before sending the file, but the Worker is authoritative.

Do not put provider keys in chat, GitHub, `.env`, Vite variables, Firestore, or the browser admin form. If a provider key was ever committed to this repository, rotate it with that provider first. Deleting it from the latest file does not erase Git history.

## 2. Configure the website

1. Sign in to the PROJEXIAHUB admin panel.
2. Open **Admin → Settings → Image hosting**.
3. Paste the deployed Worker HTTPS URL and choose the preferred primary host.
4. Save, then use **Check Worker**. This confirms the Worker is reachable and reports whether the two secrets are present; it does not prove the keys are valid. A real upload is the definitive provider test.

The Worker URL is not a secret. API keys remain exclusively in Cloudflare secrets.

## 3. Upload behavior

- Admin uploads send the same validated image to ImgBB and Freeimage.host independently.
- If both uploads succeed, the selected provider is primary and the other is saved as a fallback mapping in Firestore.
- If only one succeeds, the admin upload still succeeds and the editor offers a retry for the missing provider while the original file remains in the current editing session.
- The website only looks up fallback metadata after the primary image actually fails to load. Existing image URL fields and legacy ImgBB-only records remain unchanged.
- Request attachments stay ImgBB-only, but their API key is still held by the Worker.
- Removing an image from a project or post removes its reference from that content; it does not guarantee remote deletion from either hosting provider.

Free image hosts are not guaranteed permanent backups. Keep original project photos in a separate local/cloud archive as well.

## 4. Firestore rules and rollout

The branch adds read-only public access to one fallback metadata document at a time and restricts writes to admins. Deploy the updated rules before expecting automatic fallback:

```bash
firebase deploy --only firestore:rules
```

Merge/deploy the website only after the Worker is deployed and its URL is saved in Admin Settings. Until then, image uploads intentionally show a setup message rather than exposing keys in the browser.

## Username sign-in and throttling (added in the security hardening release)

The Worker also serves `POST /auth/login`, which resolves a username to its
sign-in email and returns it only after Firebase confirms the password. It needs
three more secrets: `FIREBASE_WEB_API_KEY`, `RESOLVER_EMAIL` and
`RESOLVER_PASSWORD` (a dedicated Firebase account registered in Firestore as
`resolvers/{uid}`). `wrangler.toml` now also defines four rate-limit bindings.
`GET /health` shows whether each is active. Full steps and ordering are in
`SECURITY-MIGRATION.md` at the repository root.
