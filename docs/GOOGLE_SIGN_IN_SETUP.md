# Google Sign-In setup for PROJEXIAHUB

The application uses Firebase Authentication's built-in Google provider. No Firebase Functions, paid API, or separate authentication service is required.

## Enable Google as a sign-in provider

1. Open the Firebase project used by PROJEXIAHUB in the Firebase Console.
2. Go to **Authentication → Sign-in method** (or **Sign-in providers**).
3. Select **Google**, enable it, choose the project support email, and save.
4. Open **Authentication → Settings → Authorized domains**.
5. Confirm `projexia.web.app` is listed. Add `localhost` if it is not already present and you need local development.
6. If the site is later served from another custom domain, add that exact hostname to Authorized domains too.

## What the application does

- Existing Google-linked Firebase accounts sign in normally.
- The sign-in flow uses a popup where supported and falls back to Firebase redirect authentication when the browser blocks or does not support popups.
- First-time Google users receive a standard PROJEXIAHUB customer profile, username lookup, and username-change quota record in one Firestore batch.
- Their initial username is generated from their Firebase UID. They can change it using the existing account username editor and its existing two-changes-per-30-days limit.
- Existing customer profiles are never overwritten by Google sign-in.
- If the same email already belongs to an account using another provider, Firebase blocks the sign-in with an account-conflict message. The application does not create a second profile or silently merge accounts. The customer should use the existing sign-in method.

## Deployment

After the feature PR is merged, pull the latest `main`, run the project's build and tests, then deploy the hosting application as usual. Enabling Google in the Firebase Console is a separate one-time project setting; a code deployment alone does not enable the provider.
