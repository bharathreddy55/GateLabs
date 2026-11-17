# Optional hosted AI proxy

The browser's bring-your-own-key providers remain available. The optional `/api/gemini` endpoint now fails closed until configured.

Required server environment variables:

- `FIREBASE_PROJECT_ID`, `FIREBASE_WEB_API_KEY`: project identity and public Firebase web key used by Google's Auth lookup service to validate bearer ID tokens.
- `GEMINI_API_KEY`: server-only provider key.
- `GEMINI_ALLOWED_MODELS`: comma-separated models verified as available in your provider account. Optional `GEMINI_MODEL` selects the default.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`: shared Redis quota service; ten calls per user per minute. This limit survives serverless instance changes.
- `APP_ORIGINS`: comma-separated exact browser origins allowed to call the endpoint.

Send the signed-in Firebase ID token as `Authorization: Bearer <token>`. No request-supplied provider key is accepted. Payloads are limited to 32 KB, 20 text-only messages and 2,048 output tokens. Authentication, quota and provider calls have bounded timeouts.

Never put server or Redis credentials in `VITE_*` variables. Missing configuration returns a controlled error and makes no provider call. Run `node --test tests/aiProxy.test.mjs` locally. Live provider/auth/quota verification requires configured test services; unit fixtures do not certify deployed credentials.
