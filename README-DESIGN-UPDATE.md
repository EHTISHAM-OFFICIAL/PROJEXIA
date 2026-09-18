# Feature update — manageable site banner + WhatsApp button

Adds a site-wide announcement banner you control entirely from `/admin/banner`,
plus a floating WhatsApp button (only shows once you fill in your number).

## ⚠️ Two things this patch needs that earlier ones didn't

**1. Seven of these files are brand new — they need to be added, not just
overwritten.** See the list below.

**2. This changes `firestore.rules`, so you must redeploy it:**

```bash
firebase deploy --only firestore:rules
```

Without this step, the banner won't save from the admin panel (permission
denied) even though everything else works.

## How to apply

**New files — add these:**
```
src/types/banner.ts
src/utils/banner.ts
src/services/bannerService.ts
src/hooks/useBanner.ts
src/components/layout/AnnouncementBanner.tsx
src/components/layout/WhatsAppFab.tsx
src/pages/Admin/BannerSettings.tsx
```

**Existing files — overwrite these:**
```
src/firebase/firestore.ts
src/routes/AppRoutes.tsx
src/components/layout/Layout.tsx
src/components/layout/AdminLayout.tsx
firestore.rules
```

Then:

```bash
npm run dev
firebase deploy --only firestore:rules
```

No new npm packages.

## How to use it

1. Go to `/admin/banner` (new link in the admin sidebar, "Banner").
2. Turn on "Show the banner", write your message, pick a tone (Offer / Success
   / Info / Warning / Urgent — each is a different color), optionally add a
   link and/or a start and end date.
3. Save. It appears above the navigation on every public page within a few
   seconds (next time each visitor's browser fetches it).
4. A visitor who dismisses it (the × button) won't see that *exact* message
   again this browser session — but if you edit the message, it reappears for
   everyone immediately, since the dismissal is tied to the specific text.

The badge next to the page title ("Live now" / "Not showing") reflects your
current unsaved form, including the date range — so you can see whether a
scheduled banner will actually be visible before you save it.

## The WhatsApp button

Fill in `whatsapp` in `src/constants/site.ts` (international format, no `+` or
spaces — e.g. `923001234567`) and a floating WhatsApp button appears
bottom-right on every page automatically. Leave it blank and nothing renders
— no dead buttons.

## Why a general banner, not a "sale products" banner

MECTEC's current data model is a project showcase + request form — there's no
product catalog, prices, or cart to tie a sale to. This banner works for any
message (an offer, a seasonal notice, "currently booking for next month",
whatever) without inventing product data that doesn't exist. If you want an
actual product/pricing system later, that's a separate, larger feature — a
new Firestore collection, an admin catalog editor, and a decision about
whether it needs a cart — worth scoping on its own rather than bolting onto
this banner.
