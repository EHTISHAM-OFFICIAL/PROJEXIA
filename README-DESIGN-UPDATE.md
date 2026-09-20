# Feature update — view counts, category chips, request tracking, email notifications

## ⚠️ Required steps

**Two brand-new files — add these, don't overwrite anything for them:**
```
src/services/emailNotificationService.ts
src/pages/TrackRequest/TrackRequest.tsx
```

**Everything else overwrites an existing file.**

**This changes `firestore.rules` — redeploy it:**
```bash
firebase deploy --only firestore:rules
```
Without this, the "track my request" page will always say "not found," even
for a real reference number.

No new npm packages. `npm run dev` after copying files in.

---

## 1. View counts on project cards

You were already tracking `viewCount` in Firestore, just not showing it
anywhere. Now it appears next to the date on each card — but only when it's
greater than zero, so a brand-new project doesn't show "0 views" and look
neglected. Large counts compact automatically ("1.2k" instead of "1234").

## 2. Category counts as filter chips

The category dropdown on `/projects` is now a row of chips —
"All (12)", "IoT (5)", "Arduino (3)" — computed live from your actual
published projects. A category with zero projects doesn't get a chip at all,
so there's never a dead-end click.

## 3. Request status lookup — `/track-request`

Someone who submitted a request previously had no way to check on it except
waiting for your reply. Now there's a page where they enter their reference
number and email to see status, project title, submitted date, and last
updated date. Linked from the request-confirmation screen and the footer.

**The security design here matters, so it's worth understanding:** this
does **not** read the full request document. It reads a separate, narrow
`requestStatusLookup` collection containing only `{ requestNumber, status,
projectTitle, email, timestamps }` — never your internal admin notes or
quoted amounts. That collection is:
- Seeded automatically the moment someone submits a request
- Kept in sync automatically whenever you change a request's status from
  the admin panel (`/admin/requests/:id`)
- Readable by anyone who knows the exact reference number (which is what
  makes the lookup possible without login), but never listable — there's no
  way to enumerate or browse all requests, only fetch one you already have
  the reference for

One limitation worth knowing: requests submitted **before** this update
won't have a lookup record (there was nothing to seed it retroactively).
Only new submissions from now on are trackable this way.

## 4. Email notifications on new requests/messages — `/admin/settings`

Uses EmailJS (free tier, sends straight from the browser, same "no backend"
approach as imgBB). You'll need to set this up yourself since I don't have
credentials for it:

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Connect an email provider (Gmail, Outlook, etc.) as an "Email Service"
3. Create an Email Template using these variable names so this integration
   fills them in automatically: `{{subject}}`, `{{message}}`, `{{reply_to}}`,
   `{{to_email}}`
4. Copy the Service ID, Template ID, and Public Key into `/admin/settings`
   (or into `.env` if you'd rather — same override pattern as the imgBB key)

Until you do this, the feature just silently does nothing — no errors, no
broken requests, it simply doesn't send anything. A failed or unconfigured
email notification can never block or fail an actual request/message
submission; that Firestore write already succeeded before the email attempt
even starts.

---

## Nothing I could verify end-to-end from here

Same limitation as imgBB: this sandbox can't reach `api.emailjs.com` to test
a real send. The integration follows EmailJS's documented REST API exactly,
but the first real test is submitting the request form yourself once
you've set up a template.
