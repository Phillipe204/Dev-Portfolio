# Felipe's Developer Portfolio

A polished, dark-themed personal portfolio built with Next.js 16 and Tailwind CSS v4. Designed for Felipe as an aspiring full-stack developer with interests in IT and cybersecurity.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 (via @tailwindcss/postcss, plain CSS)
- **Email**: Nodemailer (contact form API route)
- **Icons**: react-icons
- **Animations**: CSS transitions, Tailwind hover states, Lottie

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `app/api/contact/` - Contact form API route
- `app/components/` - All React components
  - `homepage/hero-section/` - Hero with name, headline, CTAs
  - `homepage/about/` - About Me section
  - `homepage/skills/` - Categorized skills grid
  - `homepage/projects/` - Featured project cards
  - `homepage/it-interests/` - IT & Technical Interests
  - `homepage/cybersecurity/` - Cybersecurity Journey
  - `homepage/experience/` - Learning Journey timeline
  - `homepage/goals/` - Goals section
  - `homepage/contact/` - Contact form and info
  - `helper/` - Reusable components (section-title, scroll-to-top, glow-card)
  - `navbar.jsx` - Fixed navbar with mobile menu
  - `footer.jsx` - Footer
- `utils/data/` - All content data files (easy to edit)
  - `personal-data.js` - Name, email, links, bio
  - `skills.js` - Skills list and categories
  - `projects-data.js` - Project cards
  - `experience.js` - Learning journey timeline
- `utils/skill-image.js` - Maps skill names to SVG icons
- `app/css/globals.css` - Global styles and dark theme
- `app/css/card.css` - Glow card hover effects
- `public/` - Static assets

## Design System

- **Background**: #060a13 (deep dark)
- **Cards**: #0d1224 with #1a2035 borders
- **Accent**: Teal (#14b8a6) to Blue (#3b82f6) gradient
- **Text**: White headings, gray-400 body, gray-500 secondary
- **Hover**: teal-500/30 border glow

## Running the App

Port 5000 via "Start application" workflow (`npm run serve`).

- `npm run serve` — Production build + start (used by workflow, no HMR issues)
- `npm run dev` — Development mode with hot reload (may have HMR loop in Replit proxy)
- `npm run build` — Build only

**Note**: The `next dev` HMR system has a known rebuild loop issue in the Replit proxy environment. The workflow uses `npm run serve` (production build + start) to avoid this.

## Editing Content

All text content lives in `utils/data/` files. Update `personal-data.js` for your info, `projects-data.js` for projects, `skills.js` for skills, and `experience.js` for your learning timeline.

After editing content, restart the workflow to rebuild.

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GTM` | Google Tag Manager ID (optional) |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app |
| `TELEGRAM_BOT_TOKEN` | Telegram bot for contact notifications |
| `TELEGRAM_CHAT_ID` | Telegram chat for notifications |
| `GMAIL_PASSKEY` | Gmail app password for Nodemailer |
| `EMAIL_ADDRESS` | Gmail address for sending emails |
