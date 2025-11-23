# JapanStack – Japanese Business OS (Example Template)

Practical, Japan-ready capabilities for SMEs: LINE login and messaging, Pay.jp payment and consumption tax, polite Japanese copy via Groq, and national holidays/business day logic. Runs locally and deploys easily to Vercel.

## Features

- LINE login (LIFF) and profile retrieval, push confirmations/reminders
- Pay.jp sample payment with Japan consumption tax (default 10%)
- Groq (Llama3-70B) to generate polite business Japanese copy
- Japan national holidays detection and next business day calculation
- Three demo pages: Wedding Booking / Hair Salon / Restaurant Omakase

## Tech Stack

- Next.js 16 App Router (React Server Components)
- TypeScript + Tailwind CSS + ESLint
- Minimal dependencies for straightforward deployment and extension

## Structure & Key Files

- Pages:
  - `src/app/wedding/page.tsx` (Wedding Booking)
  - `src/app/salon/page.tsx` (Hair Salon)
  - `src/app/restaurant/page.tsx` (Restaurant Omakase)
- API routes:
  - `src/app/api/tax/route.ts` (consumption tax calculation)
  - `src/app/api/line/push/route.ts` (LINE push messaging)
  - `src/app/api/groq/route.ts` (AI copy generation)
  - `src/app/api/pay/route.ts` (payment sample)
- Libraries:
  - `src/lib/line.ts` (LIFF init, login, profile)
  - `src/lib/payjp.ts` (payment client sample)
  - `src/lib/groq.ts` (AI copy client)
  - `src/lib/jpCalendar.ts` (JP holidays & business day utils)

## Getting Started

1) Install and run:

```bash
npm install
npm run dev
# Open http://localhost:3000/
```

2) Environment variables: copy `.env.example` to `.env` and fill in:

- `NEXT_PUBLIC_LINE_CHANNEL_ID`: LIFF Channel ID
- `NEXT_PUBLIC_LINE_TEST_USER_ID`: user ID for test pushes (optional)
- `LINE_CHANNEL_ACCESS_TOKEN`: Channel Access Token for Messaging API
- `PAYJP_SECRET_KEY`: Pay.jp secret (sample flow, no real charge here)
- `GROQ_API_KEY`: Groq API key (for polite business Japanese)
- `DATABASE_URL`: reserved for future DB integration

## Pages & API

- Wedding `/wedding`
  - LIFF login + profile, deposit payment sample, send confirmation message
- Salon `/salon`
  - Input amount to get tax-inclusive price, holiday check and next business day, send reminder message
- Restaurant `/restaurant`
  - Enter a topic and generate polite business Japanese, render on page

API endpoints:

- `POST /api/tax`: `{ amount, tax_rate }` → `{ amount, tax, total }`
- `POST /api/line/push`: `{ to, text }`, requires `LINE_CHANNEL_ACCESS_TOKEN`
- `POST /api/groq`: `{ topic }`, requires `GROQ_API_KEY`
- `POST /api/pay`: `{ amount, currency, note }` → sample transaction object

## Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`



## Deploy to Vercel (optional)

- Import the GitHub repository into Vercel, select the `main` branch
- In Vercel project Settings → Environment Variables, set the keys listed above
- Trigger a build to get your production URL

---

This repository is an example template of Japan-focused business features. It’s ready for further integration of real payments, database persistence, and a more complete LINE workflow.
