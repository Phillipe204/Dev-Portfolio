# Threat Model

## Project Overview

This repository is a public-facing developer portfolio built with Next.js 16 App Router, React 19, and Tailwind CSS. In production it primarily serves static content, but it also exposes server-side API routes for a contact workflow that forwards user-submitted messages to Telegram and Gmail via Nodemailer and performs reCAPTCHA verification against Google's API. The `/blog` page is currently a static "Coming soon" page rather than a live content-ingestion surface.

The production attack surface is small and mostly unauthenticated. There is no user login, no session layer, no database, and no admin UI in this codebase. Production assumptions for this scan: `NODE_ENV=production`, TLS is handled by the platform, and mockup sandbox environments are not production-reachable.

## Assets

- **Contact channel integrity** — the `/api/contact` route can trigger outbound email and Telegram messages. Abuse here can create spam, alert flooding, quota exhaustion, or operational denial of service.
- **Application secrets** — `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GMAIL_PASSKEY`, `EMAIL_ADDRESS`, optional GTM configuration, and any reCAPTCHA secret used by server routes. Exposure would allow unauthorized outbound actions or service impersonation.
- **Owner inbox / notification trust** — inbound contact content is delivered to the site owner through email and Telegram. Malicious payloads that alter how those messages render or overwhelm them are security-relevant.
- **Third-party verification availability** — Google reCAPTCHA verification is part of the contact submission path. Unnecessary or unbounded use of that shared dependency can degrade legitimate contact handling.
- **Static reputation content** — links and displayed profile data in `utils/data/` are build-time content. They matter for phishing and open-redirect style review only if they become runtime user-controlled.

## Trust Boundaries

- **Public browser → Next.js server routes** — `app/api/contact/route.js` and `app/api/data/route.js` accept unauthenticated requests from the internet. All request bodies and most request headers are untrusted.
- **Next.js server → third-party services** — the server calls Telegram, Gmail SMTP, and Google reCAPTCHA using secrets from environment variables.
- **Build-time repo content → rendered client UI** — data files under `utils/data/` are trusted only as repository-controlled content at build time, not as user input.
- **Production vs dev-only configuration** — `Dockerfile.dev`, `.next/`, `.cache/`, `attached_assets/`, and `next.config.js` dev-origin allowances should be ignored unless a path is proven production-reachable.

## Scan Anchors

- **Production entry points:** `app/page.js`, `app/layout.js`, `app/api/contact/route.js`, `app/api/data/route.js`
- **Highest-risk code areas:** contact submission flow (`app/components/homepage/contact/contact-form.jsx` + `app/api/contact/route.js`), request-body handling before deserialization, route-level abuse controls, outbound integrations and secrets
- **Public vs authenticated vs admin:** all routes are public; there is no authenticated or admin surface in this repo
- **Usually dev-only / out of scope unless proven reachable:** `Dockerfile.dev`, `allowedDevOrigins` behavior in development, `.next/`, `.cache/`, attached assets, README-only examples
- **Noise to deprioritize unless trust changes:** link-based XSS findings on `utils/data/*` or static project/blog cards are likely false positives unless those URLs become runtime user-controlled; current blog card components are not production-reachable from `app/page.js`

## Threat Categories

### Tampering

The main tampering risk is untrusted input crossing from the public contact form into outbound notification channels. The server must validate request structure, constrain field sizes and formats, and ensure downstream email / Telegram content is derived safely from attacker-controlled input.

Required guarantees:
- Public API routes MUST treat all request bodies as untrusted and enforce server-side validation.
- Contact message generation MUST safely handle attacker-controlled text before embedding it into downstream formats.
- Client-side validation MUST NOT be the only enforcement mechanism for production behavior.

### Information Disclosure

This project stores operational secrets in environment variables and sends outbound requests to third-party services. Error handling, logging, and any client exposure of environment-backed values must avoid leaking those secrets or unnecessary implementation details.

Required guarantees:
- Secrets used by server routes MUST remain server-only and MUST NOT be exposed to client bundles, logs, or error responses.
- API errors MUST avoid returning stack traces, tokens, SMTP details, or other internals to the browser.
- Only the minimum necessary contact data should be forwarded to third-party services.

### Denial of Service

Because the exposed backend is unauthenticated and triggers email / Telegram side effects and external CAPTCHA verification, abuse resistance matters more than confidentiality. Attackers can attempt repeated submissions, oversized bodies, or bot traffic to exhaust quotas, flood the inbox, or degrade service. Redundant public routes that invoke third-party services can create additional availability risk even when they do not expose data.

Required guarantees:
- Public side-effecting endpoints MUST have effective abuse controls such as rate limiting, CAPTCHA enforcement, or equivalent server-side protections.
- Expensive or side-effecting requests MUST reject malformed or oversized input early.
- If IP-based throttling is used behind a proxy, client identity MUST come from trusted infrastructure-derived signals rather than user-supplied forwarding headers.
- Public helper endpoints that trigger third-party verification or other outbound work SHOULD be removed if redundant, or protected to the same standard as the primary route they support.
- Third-party calls SHOULD fail safely without causing cascading operational impact.

### Spoofing

There is no end-user authentication surface, but the application does rely on third-party verification and service credentials. If bot-verification or external-service identity checks are incomplete, an attacker may be able to impersonate legitimate contact submissions.

Required guarantees:
- Any CAPTCHA or bot-verification mechanism MUST be enforced on the same server path that triggers side effects.
- Third-party service credentials MUST only be accepted from trusted environment configuration.
- Public endpoints MUST not assume the browser is honest simply because the form UI applies validation.
