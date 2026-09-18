# MECTEC

**Electronics project showcase and client request platform**

MECTEC is a React + TypeScript + Firebase platform designed to showcase electronics projects and allow clients to submit detailed project requests.

The project is intentionally structured to be **secure, maintainable, and practical for a single developer**.

---

## ✨ Features

- 📁 Electronics project showcase
- 🔎 Client-side project search and filtering
- 📋 Detailed project case studies
- 📨 Client project request system
- 📬 Contact message system
- 🔐 Firebase Authentication for administrators
- 👤 UID-based admin authorization
- 🖼️ Firebase Storage for project media
- 📎 Private client attachment uploads
- 📊 Project view counting
- 🌐 SEO metadata and sitemap
- 📱 Responsive React interface
- 🛡️ Firestore and Storage security rules
- ⚡ Firebase Hosting deployment
- 🚫 No public account registration

---

## 🛠️ Tech Stack

| Technology              | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| React                   | Frontend UI                              |
| TypeScript              | Type-safe application code               |
| Vite                    | Development and production build tooling |
| Firebase Authentication | Admin authentication                     |
| Cloud Firestore         | Application database                     |
| Firebase Storage        | Images, videos, and attachments          |
| Firebase Hosting        | Production hosting                       |

---

# 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

Then fill in your Firebase configuration values.

### 3. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

> **Note:** The site will load, but the Projects page will remain empty until Firestore contains project data and the Firebase security rules have been deployed.

Continue with the **Firebase Setup** section below.

---

# 📜 Available Commands

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload          |
| `npm run build`   | Type-check and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally                  |
| `npm run lint`    | Run TypeScript checks without creating a build        |
| `npm run seed`    | Add sample projects to Firestore                      |

---

# 🔥 Firebase Setup

MECTEC requires a Firebase project with the following services enabled:

- Firestore
- Authentication
- Storage
- Firebase Hosting

---

## 1. Configure Environment Variables

Go to:

**Firebase Console → Project settings → General → Your apps → SDK setup and configuration**

Copy the Firebase configuration values into `.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> **Important:** Vite reads `.env` only when the development server starts. Restart the dev server after changing environment variables.

### Are these Firebase values secret?

No.

Firebase's web configuration values are designed to be included in the browser bundle. They identify your Firebase project but do not grant unrestricted access to your database.

Actual protection comes from:

- `firestore.rules`
- `storage.rules`
- Firebase Authentication
- Optional Firebase App Check

The `.env` file is still gitignored because different environments may use different configuration values and keeping configuration out of version control is good practice.

---

## 2. Enable Firebase Services

### Firestore

Go to:

**Firebase Console → Firestore Database → Create database**

Start in:

**Production mode**

The rules included in this repository should then be deployed.

### Authentication

Go to:

**Firebase Console → Authentication → Sign-in method**

Enable:

**Email/Password**

There is intentionally **no public registration system**.

Only administrators are manually created.

### Storage

Go to:

**Firebase Console → Storage → Get started**

---

# 🔐 3. Deploy Firebase Rules and Indexes

Install the Firebase CLI if necessary:

```bash
npm install -g firebase-tools
```

Log in:

```bash
firebase login
```

Connect the local project to your Firebase project:

```bash
firebase use --add
```

Select the appropriate Firebase project.

Then deploy the security rules and indexes:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

> **Important:** Deploy the rules before putting the website online. The application's security depends on these rules, not on frontend code.

---

# 👤 4. Create an Admin Account

MECTEC does not have a public sign-up page.

Admin access is granted manually in two steps.

## Step A — Create the Firebase user

Go to:

**Firebase Console → Authentication → Users → Add user**

Enter the administrator's email and password.

After creating the user, copy the **User UID**.

---

## Step B — Grant admin access

Go to:

**Firebase Console → Firestore Database → Data**

Create a collection:

```text
admins
```

Create a document where the **Document ID is exactly the Firebase Authentication UID**.

Example:

```text
admins/
└── xxxxxxxxxxxxxxxxx
```

Recommended fields:

| Field       | Type      | Value            |
| ----------- | --------- | ---------------- |
| `role`      | string    | `admin`          |
| `email`     | string    | Your admin email |
| `createdAt` | timestamp | Current time     |

Only the existence of the document is required by the security rules.

Once the document exists, the user can sign in at:

```text
/admin/login
```

### Why use an admin document?

MECTEC deliberately does not rely on a hardcoded email address.

The security rules check:

```text
admins/{authenticated-user-uid}
```

If the document exists, the user is an administrator.

This makes access easy to revoke: simply remove the document.

It also supports multiple administrators without requiring a rules redeployment.

> **Security note:** Firebase custom claims can provide another robust authorization model, but they require the Admin SDK or a Cloud Function. MECTEC deliberately avoids that additional infrastructure.

---

# 🌱 5. Optional Sample Data

You can populate Firestore with sample projects using:

```bash
SEED_EMAIL=you@example.com SEED_PASSWORD=yourpassword npm run seed
```

The seed script creates five sample projects.

Each sample project:

- Has `isSample: true`
- Uses a slug beginning with `sample-`
- Contains no images
- Uses a neutral placeholder on project cards

This prevents sample projects from being confused with real client work.

### Remove sample projects

```bash
SEED_EMAIL=you@example.com SEED_PASSWORD=yourpassword node scripts/seed.mjs --remove
```

After removing the samples, delete:

```text
scripts/seed.mjs
```

---

# 📝 Before Going Live

Before publishing MECTEC, replace all placeholder values in:

```text
src/constants/site.ts
```

Look for the `TODO` values.

Example:

```ts
email: 'contact@mectec.pk',
whatsapp: '',
phone: '',
```

Add your real:

- Email address
- WhatsApp number
- Phone number
- Social media links

Empty WhatsApp, phone, and social links are automatically hidden rather than rendered as broken or inactive links.

---

## Update the Site URL

Update:

```text
SITE.url
```

inside:

```text
src/constants/site.ts
```

This value is used for:

- Canonical URLs
- Open Graph metadata
- SEO-related information

---

## Update SEO Files

Also update:

```text
public/robots.txt
public/sitemap.xml
```

Replace:

```text
https://mectec.pk
```

with your actual production domain if necessary.

---

# 🚀 Deployment

## Build the project

Before deploying, create a production build:

```bash
npm run build
```

If the build succeeds, deploy the website:

```bash
firebase deploy --only hosting
```

---

## Deploy Everything

To deploy Hosting, Firestore rules, Firestore indexes, and Storage rules together:

```bash
firebase deploy --only hosting,firestore:rules,firestore:indexes,storage:rules
```

This is useful after making changes to both the website and Firebase configuration.

---

# 🌐 Hosting Architecture

MECTEC uses Firebase Hosting by default.

The project is configured as a single-page application.

`firebase.json` rewrites application routes to:

```text
index.html
```

This allows routes such as:

```text
/projects/some-slug
```

to work correctly when accessed directly.

### Caching

Hashed static assets use long-term immutable caching.

`index.html` is not cached aggressively, allowing new deployments to take effect immediately.

---

## Alternative Hosting

MECTEC can also be hosted on platforms such as:

- Netlify
- Vercel
- Cloudflare Pages

Any hosting provider used must support the application's SPA fallback configuration.

Firebase Hosting is the simplest option because Firebase is already used for the application's backend services.

---

# 🗄️ Data Model

## `projects/{autoId}`

Projects are publicly readable only when:

```text
published == true
```

Administrators can create, update, and delete projects.

### Project fields

Project data is organized into several logical groups.

#### Identity

```text
title
slug
shortDescription
```

#### Classification

```text
category
status
difficulty
technologies
tags
```

#### Case Study

```text
description
problemStatement
objectives
solutionOverview
howItWorks
features
challenges
results
```

#### Technical

```text
components[]
specifications[]
estimatedCost
```

#### Media

```text
media.thumbnailUrl
media.heroImageUrl
media.gallery[]
media.videoUrl
```

#### Control

```text
featured
published
viewCount
createdAt
updatedAt
completedAt
```

Full TypeScript definitions are available in:

```text
src/types/project.ts
```

Optional sections are automatically hidden from the public project page when they contain no data.

---

# 📩 `projectRequests/{autoId}`

Project requests are designed as **public-create / admin-manage** documents.

### Public permissions

Visitors can:

- Create a request

Visitors cannot:

- Read requests
- Update requests
- Delete requests

### Admin permissions

Administrators can:

- Read requests
- Update requests
- Delete requests

### Request structure

Requests contain:

```text
contact
project
technical
software
scale
budget
timeline
references
attachments[]
additionalRequirements
consent
admin
metadata
```

The `admin` section contains internal information such as:

```text
notes
quotedAmount
assignedTo
```

These fields are protected from public creation by Firestore rules.

---

# 📬 `contactMessages/{autoId}`

Contact messages support:

- Public creation
- Admin reading
- Admin updating
- Admin deletion

Public users cannot read previously submitted messages.

Firestore rules validate:

- Name
- Email
- Subject
- Message
- Creation timestamp

---

# 👤 `admins/{uid}`

Admin documents are identified by Firebase Authentication UID.

A user can read only their own admin document.

The collection:

- Cannot be listed publicly
- Cannot be modified from the client
- Is used by Firestore security rules to determine administrator access

---

# ⚙️ `settings/{docId}`

Site-wide configuration is stored under the `settings` collection.

For example:

```text
settings/banner
```

The homepage banner can be publicly read while only administrators can modify it.

Typical structure:

```text
settings/
└── banner
```

Public visitors can read the banner.

Only authenticated administrators can create, update, or delete it.

---

# 📦 Storage Layout

Firebase Storage uses the following structure:

```text
projects/{projectId}/thumbnail/{file}
projects/{projectId}/gallery/{file}
projects/{projectId}/videos/{file}

projectRequests/{requestId}/attachments/{file}
```

### Project media

Project:

```text
thumbnail
gallery
videos
```

are publicly readable and administrator-writable.

### Client attachments

Request attachments are intentionally private:

```text
projectRequests/{requestId}/attachments/{file}
```

They may contain:

- Drawings
- Technical specifications
- Reference files
- Private project information

Therefore, they are **not publicly readable**.

Storage rules enforce:

- Maximum 5 files
- Maximum 5 MB per file
- Allowed MIME types

The same restrictions are also defined in:

```text
src/constants/requestOptions.ts
```

The frontend values provide fast user feedback, while the actual security enforcement happens in Firebase Storage rules.

---

# 🔢 Request Reference Numbers

Project requests receive references similar to:

```text
MECTEC-2026-K4T9RQ
```

The format contains:

```text
MECTEC
YEAR
6 RANDOM CHARACTERS
```

The random characters come from a 31-character alphabet that removes visually confusing characters such as:

```text
I
L
O
0
1
```

### Why random instead of sequential?

References are intentionally **random rather than sequential**.

A sequential system such as:

```text
MECTEC-2026-0001
MECTEC-2026-0002
MECTEC-2026-0003
```

would require a shared counter document.

Because public visitors can create requests, that counter could become an abuse target through:

- Excessive writes
- Contention
- Number burning
- Denial-of-service-style write pressure

Random six-character references provide approximately **27 billion possible combinations per year**, making accidental collisions extremely unlikely.

They also provide a small privacy benefit because references cannot be easily guessed sequentially.

---

## Future Sequential References

If sequential numbering becomes necessary later, the recommended architecture is a server-side Cloud Function.

This requires the Firebase Blaze plan.

The implementation would:

1. Create an `onDocumentCreated` trigger for `projectRequests/{id}`.
2. Read `counters/projectRequests` inside a transaction.
3. Increment the counter.
4. Write the generated reference number back to the request.
5. Remove `generateRequestNumber()` from `src/services/requestService.ts`.

Existing random references can remain valid; no migration is required.

---

# 🔎 Search Architecture

Firestore does not provide traditional full-text search.

MECTEC currently:

1. Fetches all published projects.
2. Stores them in the application.
3. Filters them in memory using `useFilteredProjects`.

The relevant hook is:

```text
src/hooks/useProjects.ts
```

This is intentionally simple and works well at the current scale.

### When should this change?

Once the project catalogue reaches the low hundreds of projects, fetching every published project on each load may become unnecessarily expensive or slow.

At that point, consider moving search to a dedicated service such as:

- Algolia
- Typesense

The existing service/hook architecture keeps this migration contained.

See:

```text
ARCHITECTURE.md
```

for the planned migration approach.

---

# 🔍 SEO

SEO metadata is managed by:

```text
src/components/ui/Seo.tsx
```

The application updates metadata during navigation.

Google can execute JavaScript, so normal indexing can work.

### Social link previews

Some link-preview crawlers do not execute JavaScript.

Examples include:

- WhatsApp
- Slack
- Facebook
- X/Twitter

When a project URL is shared on these platforms, the preview may use the metadata from:

```text
index.html
```

instead of the project-specific metadata generated by React.

### Future solution

If project-specific social previews become important, consider:

- Pre-rendering
- `vite-plugin-ssr`
- Static generation
- Moving project pages to a framework with server/static rendering

---

# 🛡️ Recommended: Firebase App Check

The project and contact request forms are intentionally exposed to the public internet.

Current protection includes:

- Honeypot fields
- Firestore validation
- Field length limits
- Restricted database permissions

These measures prevent basic automated abuse but cannot completely stop a determined attacker.

For stronger protection, consider enabling **Firebase App Check** with reCAPTCHA v3.

It can help reject requests that do not originate from your legitimate application.

> **Recommendation:** Enable App Check before heavily publicising the website.

---

# 🐛 Troubleshooting

## "Missing Firebase environment variables"

Check that:

```text
.env
```

exists and contains all required Firebase variables.

Then restart:

```bash
npm run dev
```

---

## "The query requires an index"

Firebase will normally provide a direct link in the console error to create the required index.

Alternatively:

```bash
firebase deploy --only firestore:indexes
```

---

## "Signed in but see No admin access"

Verify that:

1. The user exists in Firebase Authentication.
2. The UID was copied correctly.
3. Firestore contains:

```text
admins/{UID}
```

The document ID must be the **UID**, not the email address.

---

## Projects page is empty

If project data exists but nothing appears:

Check that:

```text
published
```

is:

```text
true
```

and not:

```text
"true"
```

The value must be a **boolean**, not a string.

Also make sure the latest Firestore rules have been deployed:

```bash
firebase deploy --only firestore:rules
```

---

## Images do not appear after upload

Check:

1. Firebase Storage is enabled.
2. Storage rules are deployed.
3. The administrator is authenticated.
4. The uploaded file path matches the Storage rules.
5. The generated download URL is stored correctly.

Deploy Storage rules with:

```bash
firebase deploy --only storage:rules
```

---

## "Permission denied" when submitting a request

Firestore validates the request payload.

Common causes include:

- Consent checkbox not set to `true`
- `status` is not `'new'`
- Invalid or missing email
- Invalid timestamp
- Missing required fields
- Attachment metadata exceeding limits

Check the browser console for the exact Firebase error.

---

# 🏗️ Project Architecture

The project follows a simple layered architecture:

```text
Component
    ↓
Hook
    ↓
Service
    ↓
Firebase
```

### Components

Responsible for:

- UI
- User interaction
- Presentation

### Hooks

Responsible for:

- Application state
- Data loading
- UI-facing data logic

### Services

Responsible for:

- Firestore operations
- Firebase Storage operations
- Authentication operations

### Firebase

Responsible for:

- Authentication
- Database
- Storage
- Security enforcement

> **Architecture rule:** Components should never import `firebase/firestore` directly.

When new data functionality is required:

```text
Add service function
        ↓
Wrap it in a hook
        ↓
Use the hook in the component
```

This keeps the codebase organized and maintainable as MECTEC grows.

For the full architecture documentation, see:

```text
ARCHITECTURE.md
```

---

# 📁 Project Structure

A simplified structure:

```text
MECTEC/
│
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
├── scripts/
│   └── seed.mjs
│
├── src/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── ...
│
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# 🔒 Security Philosophy

MECTEC follows a simple security principle:

> **The browser is not trusted.**

Anything shipped to the browser can be modified by the user.

Therefore:

- React UI is not considered a security boundary.
- Hidden buttons do not provide security.
- Admin-only pages do not provide security.
- Client-side validation does not provide security.

The actual security boundary is Firebase:

```text
Firebase Authentication
        +
Firestore Rules
        +
Storage Rules
        +
Optional App Check
```

All sensitive operations must therefore be protected at the Firebase level.

---

# 📄 License

This project is currently maintained as a private MECTEC project.

All rights reserved unless otherwise specified.
