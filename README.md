<h1 align="center">Felipe Mota — Developer Portfolio</h1>

<p align="center">
  <strong>A modern, dark-themed personal portfolio for a full-stack developer with an IT &amp; security mindset.</strong>
</p>

<p align="center">
  Built with <a href="https://nextjs.org">Next.js 16</a> · <a href="https://react.dev">React 19</a> · <a href="https://tailwindcss.com">Tailwind CSS 4</a> · <a href="https://www.framer.com/motion/">Framer Motion</a>
</p>

---

## Overview

This is the source for Felipe Mota's personal developer portfolio — a single-page Next.js site that showcases who I am, what I'm building, the skills I'm sharpening, and how to get in touch. It's designed to feel intentional and quiet rather than flashy: a unified teal/sky/blue atmospheric background flows through every section, hard borders are softened into gradient fades, and the type does most of the talking.

The site is data-driven. Almost everything you see — projects, experience, skills, contact info — lives in plain JavaScript files under `utils/data/`, so updating the content never means touching React components.

---

## Highlights

- **Single-page narrative** — Hero → About → Skills → Projects → Journey → Contact, each section anchored for smooth in-page navigation.
- **Cohesive visual language** — A fixed, multi-layered radial gradient background bleeds the same hue through the navbar, sections, and footer so the page reads as one continuous surface.
- **Animated, accessible UI** — Framer Motion drives the entry animations and scroll-driven transitions; the navbar tracks the active section in real time via `IntersectionObserver`.
- **Hardened contact pipeline** — Server-side input validation, Google reCAPTCHA verification, an in-memory IP rate limiter (5 requests / 15 min), HTML escaping in owner email notifications, and dual delivery to both email (Nodemailer) and Telegram.
- **Dev.to blog ingestion** — The `/blog` route automatically pulls and renders my latest dev.to posts when a username is configured.
- **Production-ready** — Builds with Next.js Turbopack, optimized images via `sharp`, and a `pnpm` lockfile with explicit security overrides for known-vulnerable transitive dependencies.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components, Turbopack) |
| UI | React 19, Tailwind CSS 4, SASS where useful |
| Animation | Framer Motion, Lottie |
| Icons | `lucide-react`, `react-icons` |
| Email | Nodemailer (Gmail SMTP) |
| Spam protection | Google reCAPTCHA v2 |
| Notifications | Telegram Bot API |
| Image optimization | `sharp` |
| Analytics | `@next/third-parties` (Google Tag Manager) |
| Package manager | pnpm |

---

## Project Structure

```
.
├── app/                              Next.js App Router
│   ├── api/
│   │   ├── contact/route.js          Hardened contact endpoint (captcha + rate limit + email/Telegram)
│   │   ├── google/route.js           Server-side reCAPTCHA verification helper
│   │   └── data/route.js             Data endpoint
│   ├── blog/                         Dev.to-powered blog page
│   ├── components/
│   │   ├── footer.jsx                Footer with blended radial accents
│   │   ├── navbar.jsx                Sticky nav with active-section tracking
│   │   ├── helper/                   Glow card + scroll-to-top utilities
│   │   └── homepage/                 All page sections (hero, about, skills, projects, ...)
│   ├── css/
│   │   ├── globals.css               Site-wide background gradient + glass utilities
│   │   └── card.css                  Glow-card conic gradients
│   ├── icon.png                      Favicon
│   ├── layout.js                     Root layout (fonts, toast container, GTM)
│   └── page.js                       Composes all homepage sections
│
├── utils/data/                       All site content lives here
│   ├── personal-data.js              Name, contact, socials
│   ├── experience.js                 Work history
│   ├── projects-data.js              Project cards
│   ├── skills.js                     Skill list
│   ├── educations.js                 Education timeline
│   └── contactsData.js               Contact section copy
│
├── public/                           Static assets (profile photo, SVG decorations)
├── scripts/post-merge.sh             Post-merge hook (re-installs dependencies)
└── package.json                      Dependencies + pnpm security overrides
```

---

## Quick Start

### Prerequisites

- Node.js 20 or newer
- pnpm 10+ (`npm install -g pnpm`)

### Install &amp; run

```bash
pnpm install
pnpm dev          # dev server on http://localhost:5000
```

### Production build

```bash
pnpm build
pnpm start        # serves the optimized build on port 5000
```

The `serve` script combines both: `pnpm serve`.

---

## Configuration

### Personalize the content

Edit the files under `utils/data/`. The most common edits:

- `personal-data.js` — name, headline, description, email, phone, GitHub, LinkedIn, resume link, dev.to username (`devUsername`).
- `projects-data.js` — add, remove, or reorder project cards.
- `experience.js` / `educations.js` — work history and education timeline.
- `skills.js` — the skills shown in the marquee.

### Environment variables

Create a `.env.local` at the project root. None are strictly required to run the UI, but the contact form and blog need a few to fully work.

| Variable | Purpose | Required for |
| --- | --- | --- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public site key for the reCAPTCHA widget | Showing the captcha on the contact form |
| `RECAPTCHA_SECRET_KEY` | **Server-only** secret used to verify captcha tokens | Accepting any contact form submission |
| `EMAIL_ADDRESS` | Gmail address used to send notifications | Email delivery from contact form |
| `GMAIL_PASSKEY` | Gmail App Password (not your account password) | Email delivery from contact form |
| `NEXT_PUBLIC_TELEGRAM_USER_ID` | Telegram chat ID to receive messages | Telegram delivery from contact form |
| `NEXT_PUBLIC_TELEGRAM_API_KEY` | Telegram bot token | Telegram delivery from contact form |
| `NEXT_PUBLIC_GTM` | Google Tag Manager container ID | Analytics |

> The reCAPTCHA secret is intentionally **not** prefixed with `NEXT_PUBLIC_` — it must never be exposed to the browser. Only the site key is public.

### Replace the favicon

Drop a square PNG at `app/icon.png`. Next.js automatically picks it up as the tab icon and metadata icon.

---

## Contact Form Security

The `/api/contact` endpoint applies layered defenses before any side effects (email or Telegram) are triggered:

1. **Server-side validation** — required fields, type checks, length caps, email format.
2. **CAPTCHA verification** — every submission must include a token verified against Google's `siteverify` endpoint with the server-only secret.
3. **Rate limiting** — in-memory limiter caps each IP at 5 submissions per 15-minute window.
4. **HTML escaping** — owner email notifications escape `&`, `<`, `>`, `"`, and `'` so attacker-controlled markup never renders.

Telegram notifications are sent as plain text and are not affected by HTML escaping.

---

## Dependency Security

`package.json` includes `pnpm.overrides` that pin known-vulnerable transitive dependencies (e.g. `flatted`, `minimatch`, `brace-expansion`, `ajv`, `js-yaml`, `follow-redirects`) to patched versions. After a merge, `scripts/post-merge.sh` runs `pnpm install` automatically to reconcile the lockfile.

If you add new dependencies, re-run a vulnerability scan and extend the override list as needed.

---

## Deployment

Any Node-capable host works (Vercel, Replit, Render, a self-hosted box, etc.). The build is a standard Next.js production build.

On Replit, the configured workflow runs `pnpm serve`, which builds and then starts on port 5000 bound to `0.0.0.0`.

---

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server on port 5000 |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build on port 5000 |
| `pnpm serve` | Build then start (used by the deployment workflow) |
| `pnpm lint` | Run ESLint via the Next.js config |

---

## License

This portfolio is a personal project. The code is provided as a reference — feel free to learn from it. Please don't copy the personal content (name, copy, photos, project descriptions) verbatim for your own portfolio.

---

## Contact

- **Email** — felipe2023usa@gmail.com
- **GitHub** — [github.com/Phillipe204](https://github.com/Phillipe204)
- **LinkedIn** — see the live site footer
