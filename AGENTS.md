# Repository Guidelines

## Project Structure & Module Organization

- Next.js App Router lives in `app/` with route groups like `(main)` and `(auth)`, the `admin` area, API routes in `app/api`, and shared server actions in `app/actions.ts`.
- Reusable UI is under `components/ui`, layout scaffolding in `components/layout`, feature blocks in `components/blocks` and `components/features`, and icon wrappers in `components/icons`.
- Shared logic sits in `hooks/` and `lib/` (including `lib/supabase/*` and `lib/constants.ts`), while static assets live in `public/`.
- Playwright suites reside in `tests/`; Supabase SQL/migrations are under `supabase/` when data alignment is needed.

## Build, Test, and Development Commands

- `yarn dev`: run Next.js locally at `http://localhost:3000`.
- `yarn build`: production build; use to catch bundle or type issues before shipping.
- `yarn start`: serve the built app.
- `yarn lint`: Next.js ESLint rules plus repo-specific conventions.
- `yarn format`: Prettier with Tailwind class ordering.
- `yarn test:e2e`: Playwright suite (auto-starts `yarn dev` via `playwright.config.ts`).

## Coding Style & Naming Conventions

- TypeScript-first; compiler runs in `strict` mode. Favor server components and keep client components lean.
- 2-space indentation (Prettier default); let Prettier decide quotes/semicolons.
- Components/hooks exported in PascalCase; filenames stay kebab-case (e.g., `hero-banner.tsx`).
- Use the `@/` alias for absolute imports to keep paths shallow.

## Testing Guidelines

- Place e2e specs in `tests/*.spec.ts`; name them after the user path covered (e.g., `catalog.spec.ts`).
- Keep tests deterministic: seed via `supabase/seed.sql` or mock external calls when required.
- For debugging, `yarn test:e2e --ui` or `DEBUG=pw:api` are available; commit only stable, headless-friendly tests.

## Commit & Pull Request Guidelines

- Follow the existing Conventional-style prefixes (`feat:`, `fix:`, `refactor:`). Keep subjects concise and in present tense.
- PRs should describe the change, list commands run (lint/tests), and include before/after screenshots or clips for UI updates.
- Link issues/tasks and call out migrations or config changes explicitly (e.g., new env keys or Supabase scripts).

## Security & Configuration Tips

- Keep secrets in `.env.local`
- Never commit `.env*` files or Supabase service keys; rotate credentials if accidentally exposed.
