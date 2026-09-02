# Elimu Mwalimu

Elimu Mwalimu is an offline-first teacher preparation app for Grade 10 curriculum planning. It helps teachers move from a strand overview into a simple teaching workflow with:

- a plain-language strand understanding page
- key concepts for quick review
- a lesson guide for class delivery
- quick checks for formative assessment

The current prepared pack focuses on Grade 10 Biology, Cell Biology.

## Features

- Grade, subject, and strand selection
- Strand overview with a guided preparation flow
- Teacher-focused lesson support pages
- Offline-first app shell with service worker caching
- Local IndexedDB seeding for strand content
- Supabase client setup for backend content workflows

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- shadcn-style UI components
- Lucide icons
- PWA support

## Project Structure

- `src/App.tsx` - top-level routes and app shell
- `src/pages/` - page-level views
- `src/components/` - reusable UI and content panels
- `src/data/preparation.ts` - curriculum navigation and strand content
- `src/lib/contentStore.ts` - offline IndexedDB seeding
- `src/lib/supabase.ts` - Supabase client setup
- `content/raw-strand.md` - raw curriculum source material
- `scripts/generate-content.js` - content generation script

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Vite will start a local development server and print the URL in the terminal.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Environment Variables

The app and content generation scripts expect these environment variables when you connect them to Supabase or Anthropic:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`

For local development, put them in a `.env` file at the project root.

## Content Workflow

The app is designed around teacher preparation content rather than learner-facing accounts.

- `src/lib/contentStore.ts` seeds the current strand pack into IndexedDB for offline access.
- `scripts/generate-content.js` reads the raw strand source from `content/raw-strand.md`, generates teacher-friendly explanations with Anthropic, and stores the result in Supabase.
- `public/sw.js` caches the app shell so the interface stays usable when offline.

## Routes

The current app routes include:

- `/` - preparation home
- `/strands/cell-biology` - strand overview
- `/strands/cell-biology/understand`
- `/strands/cell-biology/key-concepts`
- `/strands/cell-biology/lesson-guide`
- `/strands/cell-biology/quick-checks`
- `/preparations`
- `/downloaded`
- `/settings`
- `/about`

## Notes

- The app title is `Elimu Mwalimu`.
- The PWA metadata is configured for an offline-first classroom experience.
- Some areas of the app are placeholders for future strand packs and saved content.
