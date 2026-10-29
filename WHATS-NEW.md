# What's new in this update

This replaces your project folder entirely. Follow the setup steps below —
don't just drop files in, since dozens changed across 8 features.

## ⚠️ Required steps, in order

1. **Keep your existing `.env`** — it isn't in this zip on purpose, so your
   real Firebase credentials for your current PROJEXIAHUB Firebase project aren't touched. Copy your old
   `.env` file into this new folder before doing anything else.

2. **Configure secure image hosting** — do not put provider keys in `.env`, GitHub, or the browser bundle. Use the Cloudflare Worker setup guide in `cloudflare/image-upload-worker/SETUP.md`; add `IMGBB_API_KEY` and `FREEIMAGE_API_KEY` as encrypted Worker secrets.

3. **Redeploy Firestore rules and indexes** — several new collections
   (`posts`, `testimonials`) and the `settings` collection need rules:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

4. **Firebase Storage is no longer used at all** — fully replaced by imgBB.
   If you never got Storage enabled (the Blaze-plan blocker from earlier),
   that's fine now — nothing in the app needs it anymore. `storage.rules` and
   the `"storage"` key in `firebase.json` have been removed.

5. Run `npm install` (no new packages were added, but harmless to run given
   how much changed), then `npm run dev`.

## ⚠️ One thing genuinely changed for the worse, on purpose

**Request attachments are now images only** (JPG, PNG, WebP, GIF, BMP) — no
more PDF, DOC, DOCX or TXT. This is a real constraint of imgBB: it only
hosts images, and there is no other free file storage available without the
Blaze plan. If someone needs to share a document, the request form's
reference links and description fields still cover that.

---

## The 8 things added

### 1. Secure dual image hosting through Cloudflare

Admin uploads for project thumbnails, hero images, school models, blog covers,
website logos, and favicon images are sent to both ImgBB and Freeimage.host
through a Cloudflare Worker. The preferred provider is the primary URL; the
second URL is recorded in `imageHostingAssets` and used only if the primary
image fails to load. Existing single-host image URLs continue to work.

Customer project-request and school-model request attachments keep their
existing ImgBB-only behavior, but the upload key is now held by the Worker
rather than exposed in the browser. The admin panel stores only the Worker URL
and preferred provider. Provider keys belong in Cloudflare encrypted secrets,
never in Vite variables, Firestore, or source control.

Before deploying the website changes, deploy the Worker from
`cloudflare/image-upload-worker`, add its two encrypted secrets and Firebase
project/origin settings, then save the Worker URL under Admin → Settings →
Image hosting. Deploy the updated Firestore rules with
`firebase deploy --only firestore:rules`.

If any API credential was ever committed to the repository, rotate it with
the provider/service. This also applies to credentials unrelated to image hosting. Removing it from the current files does not erase Git history.
Neither image host guarantees permanent backup; keep original project photos
in a separate archive. Removing a website image removes its content reference
but does not guarantee deletion from the remote image host.

### 2. Banner — fully customizable
`/admin/banner` now controls: tone (5 options, each with an energetic
mono tag — OFFER, AVAILABLE, NOTICE, UPDATE, LIMITED — with a small pulsing
icon), size (normal/large), whether the message scrolls as a marquee ticker,
and — the specific thing you asked for — **whether visitors can dismiss it
at all**. Off by default: a banner you turn on stays visible until you turn
it off, not until someone clicks away.

### 3. Lightbox for project galleries
Click any gallery image on a project page (there's a "View full size" hint
on hover) to open a full-screen viewer with keyboard arrow-key navigation
and an image counter. `src/components/ui/ImageLightbox.tsx`.

### 4. FAQ accordion
Added to the About page, genuine content grounded in policies already stated
elsewhere on the site (source code handed over, budget flexibility, etc.) —
not fabricated claims. Content lives in `src/constants/faq.ts` if you want to
edit the wording.

### 5. Theme toggle — dark/light, instant, no reload
The sun/moon icon in the navbar (desktop and mobile) switches between the
existing dark "Instrument Panel" theme and the earlier light "Schematic"
theme, instantly. This required converting every color in
`tailwind.config.js` from static hex values to CSS variables (see
`src/index.css` for both palettes) — the payoff is that adjusting either
theme's colors going forward is a one-file change, same as before.
Preference is remembered in the visitor's browser (`localStorage`), with a
small inline script in `index.html` that applies it before first paint so
there's no flash of the wrong theme.

### 6. Testimonials — a real management system, empty by default
`/admin/testimonials` — add name, role, company, quote, an optional 1-5 star
rating, and a publish toggle. The homepage section (`Testimonials.tsx`)
renders nothing at all — no placeholder, no empty state — until you publish
at least one. This deliberately avoids ever showing fake reviews.

### 7. Blog / build-log
A second content type alongside Projects: `/blog` (public list),
`/blog/:slug` (public post), `/admin/blog` (list), `/admin/blog/new` and
`/admin/blog/:id/edit` (editor with title, slug, excerpt, cover image via
imgBB, and body text). Added to the main navigation.

### 8. AI chat — the free version
A floating "Help Assistant" button, bottom-left (WhatsApp stays bottom-right
if you've set a number). It answers by matching your question against a
knowledge base in `src/constants/helpKnowledge.ts` — no external API, so it's
structurally incapable of discussing anything off-topic, and costs nothing.

**This is not generative AI** — it can't handle novel phrasing well, and it
will say so and point to the contact page when it doesn't recognize a
question. If you want a real LLM-powered version later, that needs either
Firebase Functions (the Blaze plan, whether or not you use it, since
Functions requires billing enabled) or a separate free serverless host
(Cloudflare Workers is a common choice) plus your own Anthropic or OpenAI API
key — say the word and I'll build that properly rather than bolt an insecure
client-side key onto what's here.

---

## One thing I could not verify from here

I don't have network access to api.imgbb.com from this environment to test
your actual key end-to-end (confirmed: the request gets blocked at the
network level here, not by imgBB). The integration code is correct and
follows imgBB's documented API exactly, but the first real test is uploading
a project thumbnail from your own browser once this is running. If it
fails, check the browser console — the error message will say either "no API
key configured" (means `.env` didn't carry over) or something from imgBB
itself (means the key needs checking at api.imgbb.com).
