# PROJEXIAHUB image gateway setup

This Worker keeps image-host API credentials out of the React bundle and Firestore. It verifies Firebase Authentication tokens, checks the caller's `admins/{uid}` document for administrator uploads, and keeps authenticated customer request attachments on ImgBB only.

## 1. Create or update the Cloudflare Worker

1. Open the Cloudflare dashboard and select the existing Worker named `projexiahub-image-gateway`.
2. Deploy the current code from `cloudflare/image-upload-worker/src/index.ts` (or deploy this folder with Wrangler).
3. Set the non-secret variables:
   - `FIREBASE_PROJECT_ID`: the exact Firebase project ID used by PROJEXIAHUB.
   - `ALLOWED_ORIGINS`: comma-separated exact origins, with no trailing slash. Include the deployed Firebase Hosting origins and `http://localhost:5173` only if you use local development.
4. In ImageKit, open **Developer options → API keys** and copy the **Private key**. Keep it private.
5. In Cloudflare Worker **Settings → Variables and Secrets**, add these as encrypted secrets:
   - `IMGBB_API_KEY`
   - `IMAGEKIT_PRIVATE_KEY`
   - The existing username sign-in secrets: `FIREBASE_WEB_API_KEY`, `RESOLVER_EMAIL`, and `RESOLVER_PASSWORD`.
6. Remove the obsolete `FREEIMAGE_API_KEY` secret if it still exists: `wrangler secret delete FREEIMAGE_API_KEY`.
7. Deploy the Worker and keep its existing HTTPS `workers.dev` URL.

**Important:** ImageKit's private key is the only ImageKit credential this server-side integration needs. Do not add it to GitHub, chat, `.env`, Vite variables, Firestore, or any browser form. Do not share it with anyone. If it has been exposed, rotate it in ImageKit.

The default maximum image size is **10 MB per file**. Admins can change it in **Admin → Settings → Image hosting** to a whole-number value from **1 MB to 10 MB**. The Worker enforces this limit for admin uploads and authenticated customer request attachments.

## 2. Configure the website

1. Sign in to the PROJEXIAHUB admin panel.
2. Open **Admin → Settings → Image uploads**. Keep the existing Cloudflare Worker URL and choose **ImgBB** or **ImageKit** as the preferred primary host.
3. Save the settings, then select **Check Worker**. The health check confirms that the Worker can see the configured secrets; it does not prove that the API credentials are valid.
4. Open **Admin → Settings → Username sign-in** and confirm that the same Worker URL is saved in the dedicated authentication setting. Image hosting and username sign-in store the URL separately.

## 3. Upload and fallback behavior

- Admin uploads send the same validated image to ImgBB and ImageKit independently.
- If both uploads succeed, the selected provider is primary and the other URL is saved in the `imageHostingAssets` Firestore fallback mapping.
- If only one succeeds, the image upload still succeeds and the editor offers a retry for the missing provider while the original file remains available in the current editing session.
- If the primary image later fails to load, the website checks the saved fallback mapping and tries the other provider.
- Customer project-request attachments remain ImgBB-only; this intentionally preserves the existing request workflow.
- Existing project, blog, school-model, logo, favicon, and gallery image URLs are not rewritten. Previously saved URLs from the retired provider are left untouched, so existing content is not broken. New uploads and new fallback records use ImgBB/ImageKit only.
- Removing an image from a project or post removes its content reference; it does not guarantee remote deletion from the image host.

ImageKit's free plan has usage limits. Monitor storage and bandwidth in its dashboard, and keep original project photos in a separate archive. Neither provider should be treated as your only copy of important images.

## 4. Firestore rules and rollout

The existing fallback metadata document and Firestore rules are unchanged; no migration or rewrite of existing image URLs is required.

After updating the Worker and its secrets, save/check the Worker URL in Admin → Settings → Image uploads. Merge and deploy the website changes only after the Worker is ready.

## Username sign-in and throttling

The Worker also serves `POST /auth/login`. It uses the existing Firebase resolver account and Firestore `resolvers/{uid}` allow-list. Its three secrets and rate-limit bindings are unchanged; see `SECURITY-MIGRATION.md` at the repository root for the original setup.
