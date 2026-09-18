# Architecture

Why this codebase is shaped the way it is. Read this before making structural changes.

---

## The one rule

```
Component  →  Hook  →  Service  →  Firebase SDK
```

Data flows down that chain and never skips a step.

- **Components** render. They receive data and callbacks; they never query.
- **Hooks** manage React state — loading, data, error — and call services.
- **Services** are the only place `firebase/firestore`, `firebase/auth` and `firebase/storage` are imported.
- **Firebase** modules just initialise the SDK.

Everything else in this document follows from that rule.

### Why it matters

Grep for `from 'firebase/firestore'` and you get four files. That means:

- **Changing the backend** touches `src/services/` and nothing else. If you move to Supabase or a REST API in two years, components and hooks are untouched.
- **Finding a bug** is fast. Wrong data on screen? It came from exactly one service function.
- **Schema changes** happen in one place: the mapper at the top of each service.

The cost is one extra layer. Adding a field means editing a type, a service mapper and a component instead of just a component. That is a deliberate trade — three small edits in predictable places beats one edit in an unpredictable one.

---

## Directory map

```
src/
  firebase/      SDK initialisation only. Four tiny files.
  types/         TypeScript shapes for Firestore documents.
  constants/     Every fixed list, label and limit in the app.
  utils/         Pure functions. No React, no Firebase.
  services/      The only code that talks to Firebase.
  hooks/         React state around services.
  contexts/      AuthContext — the one piece of global state.
  components/
    ui/          Generic and reusable: Button, Badge, Skeleton, EmptyState…
    layout/      Navbar, Footer, Layout, AdminLayout.
    forms/       Field wrappers and inputs shared by every form.
    projects/    Project-specific display components.
    home/        Homepage sections. One file per section.
  pages/         One folder per route.
  routes/        Route table and the admin route guard.
```

### Where does new code go?

| You are adding | Put it in |
|---|---|
| A fixed list of options | `constants/` |
| A pure function (formatting, validation) | `utils/` |
| A new Firebase read or write | `services/` |
| React state around that read | `hooks/` |
| Something used on more than one page | `components/ui/` |
| A whole new screen | `pages/` |

If you are unsure, the question is "does this know about React?" and "does this know about Firebase?". The answers put it in a layer.

---

## Key decisions

### No state management library

`AuthContext` holds the signed-in user. Everything else is local `useState` or data from a hook.

Redux, Zustand and friends solve the problem of many components needing the same mutable state. This app does not have that problem — each page loads its own data and owns it. Adding a store would mean writing actions and selectors for data that is read once and thrown away on navigation.

If you later add something genuinely global (a cart, a notification queue), reconsider. Until then it is complexity with no payoff.

### No backend server

Firebase Hosting serves static files; the browser talks to Firestore directly. No Express, no Cloud Functions, no server to patch or pay for.

This works because security rules do server-side authorisation. `firestore.rules` is not configuration — it is the backend. Read it as carefully as you would read server code.

The one thing this costs is server-side logic on write: sequential counters, sending email, image resizing. Each of those needs a Cloud Function. Reach for one when a specific need appears, not in advance.

### Admin authorisation via `admins/{uid}`

A document exists at `admins/{uid}` ⟹ that user is an admin. Enforced in rules with `exists()`.

Alternatives and why not:

- **Email comparison in rules** — a user can change their own account email, and revoking requires a rules redeploy.
- **Custom claims** — better in principle, but setting them needs the Admin SDK or a Cloud Function, which this project avoids.
- **A `role` field on a user document** — same as the current approach but with an extra field to get wrong. Existence is the simplest possible signal.

`ProtectedRoute` and `useAuth().isAdmin` are **UI only**. Anyone can edit the bundle to render the dashboard; they still cannot read a single request, because the rules reject it. Never move a security decision into React.

### Client-side search

`projectService.getPublishedProjects()` fetches all published projects; `useFilteredProjects` filters in memory.

Firestore cannot do full-text search or `OR` across fields. The options are: fetch and filter locally, or add a search service.

At tens of projects, local filtering is instant and free. It degrades somewhere in the low hundreds, when the initial payload gets slow on mobile.

**Migration path**, when that happens:

1. Add Algolia or Typesense and sync `projects` into it (a Cloud Function on write, or a manual re-index script).
2. Replace the body of `getPublishedProjects` with a search-index query.
3. Change `useFilteredProjects` to pass filters through instead of filtering locally.

Components do not change. That is the layering paying for itself.

### Request creation is a single write

`requestService.createRequest` generates the document ID locally with `doc(collection)`, uploads attachments to `projectRequests/{id}/attachments/`, then writes the document once with the attachment metadata included.

The obvious ordering — create the document, upload files, then update it with URLs — cannot work here, because the rules allow the public to **create** a request but never to **update** one. Allowing updates would let anyone rewrite any request. Generating the ID first keeps it to one write and keeps the rule strict.

### Random request references

Explained in the README under "Request reference numbers", with the Cloud Function upgrade path.

### Code splitting

The request form and the entire admin area are `React.lazy`. Someone reading a project page never downloads the Zod schema or the admin editor.

Firebase is split by SDK in `vite.config.ts`: core, auth and storage are separate chunks, so the public site does not pay for Storage code it never runs.

### `useAsync`

Every data hook is built on `src/hooks/useAsync.ts`, which returns `{ data, loading, error, reload }`.

Without it, each screen invents its own loading and error handling, and they drift — one shows a spinner, another shows nothing, a third forgets errors entirely. One primitive means the three states are handled identically everywhere, and every error is already a human-readable message via `toUserMessage`.

### Design tokens in Tailwind config

Colours, fonts, spacing and radii are defined in `tailwind.config.js` as semantic names: `bg`, `surface`, `line`, `accent`, `content`, `state`.

Components use `bg-surface`, never `bg-[#121418]`. Changing the accent colour is one line. Semantic names also make intent readable — `text-content-secondary` says what it is for, `text-gray-400` says what it looks like.

---

## Error handling

Every error reaching a user passes through `toUserMessage` in `src/utils/errors.ts`, which maps Firebase error codes to plain English and logs the original to the console in development.

Raw Firebase errors (`FirebaseError: Missing or insufficient permissions`) are meaningless to a visitor and leak implementation detail. One mapping function keeps the wording consistent and gives one place to improve it.

---

## Forms

Both public forms use React Hook Form with a Zod resolver. Schemas live in `src/utils/validation.ts`.

- One schema is the single definition of what is valid. TypeScript types are inferred from it, so the form values and the validation cannot drift apart.
- Cross-field rules (deadline after start date; WhatsApp required if WhatsApp is the preferred contact) live in `superRefine`, next to the fields they constrain.
- The ten-section request form is split into `sections/SectionA.tsx` … `SectionJ.tsx`, each receiving the same `form` object. One 1,500-line file would be unmaintainable; ten 100-line files each map to a visible part of the page.

Client validation is for helpfulness. The rules validate again on write, because the client can be bypassed.

---

## Accessibility

Built in rather than retrofitted: semantic landmarks, a skip link, visible `:focus-visible` rings, labels tied to every input with `htmlFor`, `aria-invalid` and `role="alert"` on errors, `aria-live` on the filter result count, meaningful `alt` text, and `prefers-reduced-motion` respected globally.

`components/forms/Field.tsx` wraps every input with its label, hint and error. Because roughly sixty fields go through it, getting it right once fixes them all.

---

## Things deliberately not done

| Not done | Why |
|---|---|
| Server-side rendering | Adds a build and hosting model for a site whose main content is already indexable. |
| Unit tests | For a solo project at this size, the type checker and manual testing catch more per hour spent. Add tests around `utils/` and `services/` first if you change your mind. |
| Image optimisation pipeline | Firebase's Resize Images extension does this in one click if uploads get large. |
| Pagination with cursors | `limit` + client-side slicing is simpler and fine at this scale. Move to `startAfter` cursors if the catalogue grows. |
| A component library | Twelve small primitives, fully owned and readable, beat a dependency with its own upgrade path and styling conventions. |
| Email notifications on new requests | Needs a Cloud Function and an email provider. Check the dashboard, or add the Trigger Email extension. |

---

## Extending it

**Adding a field to a project**

1. Add it to `Project` in `src/types/project.ts`.
2. Add a default in the `toProject` mapper in `src/services/projectService.ts` — existing documents will not have it.
3. Add it to `EMPTY_DRAFT` and the editor in `src/pages/Admin/ProjectForm.tsx`.
4. Render it in `src/pages/ProjectDetails/ProjectDetails.tsx`, wrapped in `<CaseStudySection empty={…}>` so it hides when blank.

Step 2 is the one people skip. Firestore documents are not migrated, so every read must tolerate a missing field.

**Adding a category** — one line in `src/constants/categories.ts`. It appears in the filters, the admin editor and the request form automatically.

**Adding a page** — a folder in `src/pages/`, a `<Route>` in `src/routes/AppRoutes.tsx`, and an entry in `NAV_LINKS` if it belongs in the navigation.

**Changing the accent colour** — `accent` in `tailwind.config.js`. Nothing else.
