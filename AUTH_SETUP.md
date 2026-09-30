# Authentication setup

Authentication requires Firebase Hosting, Firebase Authentication, Cloud Functions, Firestore, an SMTP account for email codes, and Firebase's phone sign-in service for SMS codes. The browser pages alone cannot send either kind of real message.

## Configure Firebase

1. Create a Firebase project and register a Web app.
2. Enable Email/Password and Phone in **Authentication → Sign-in method**.
3. Enable Firestore and Cloud Functions. Deploy from a trusted Node.js 20 environment with the Firebase CLI.
4. Add your Hosting domain to **Authentication → Settings → Authorized domains**. Phone authentication requires the Firebase reCAPTCHA verifier and must run on an authorized HTTPS host (Firebase Hosting is recommended).
5. In **App Check**, register the web app with the reCAPTCHA v3 provider, add your Hosting domain to its allowed domains, and enable App Check enforcement for Cloud Functions.
6. Copy the Web app's public config values and the reCAPTCHA v3 site key into `firebase-config.js`. Restrict the web API key to your Hosting domain in Google Cloud; never put service-account keys or SMTP credentials in this file.

## Configure email delivery

Set each Cloud Functions secret using the Firebase CLI. Values are kept server-side and must not be committed:

```text
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASSWORD
firebase functions:secrets:set SMTP_FROM
firebase functions:secrets:set OTP_HMAC_SECRET
```

Use an SMTP provider account and app password/API credential. `OTP_HMAC_SECRET` should be a unique random value of at least 32 characters. Then install and deploy:

```text
cd functions
npm install
cd ..
firebase deploy --only functions,firestore:rules,hosting
```

Cloud Functions and SMS usage can require a Firebase billing-enabled plan. Review provider pricing and enable usage alerts before deploying to production.

## Verification behavior

- Email account creation uses a server-generated six-digit code, expires after ten minutes, has a one-minute resend cooldown and five code attempts, and is never stored in browser storage.
- Phone account creation and phone login use Firebase Phone Authentication's SMS verification.
- Email login uses the password created with the verified email account.
- Until Firebase config and SMTP secrets are set, the forms show an explicit setup error; they do not generate or accept local demo codes.
