# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router project. Routes, layouts, route handlers, metadata, and Open Graph image routes live in `app/`. Shared UI and page sections live in `components/`, with primitives in `components/ui`, feature components in `components/features`, layout pieces in `components/layout`, and page blocks in `components/blocks`.

Shared logic belongs in `lib/`, including Supabase clients, data access, SEO helpers, server actions, and types. Locale dictionaries are in `dictionaries/`, next-intl helpers in `i18n/`, static assets in `public/`, Supabase files in `supabase/`, and Playwright specs in `tests/`.

## Build, Test, and Development Commands

Use Yarn 1.22.22.

```bash
yarn install   # Install dependencies
yarn dev       # Start local Next.js dev server at http://localhost:3000
yarn build     # Create a production build
yarn start     # Run the production server
yarn lint      # Run ESLint across the repository
yarn test:e2e  # Run Playwright end-to-end tests
yarn format    # Format files with Prettier
```

Playwright starts `yarn dev` automatically and reuses an existing local server outside CI.

## Coding Style & Naming Conventions

Use TypeScript, React Server Components by default, and client components only when interactivity requires them. Follow Tailwind CSS v4 utility patterns and theme variables from `app/globals.css`. Use `lucide-react` for standard icons and `components/ui` primitives before adding controls.

Use kebab-case for route paths such as `store-location/page.tsx`; use PascalCase for component files when nearby files do, such as `ContactHero.tsx`. Keep translations synchronized across `dictionaries/en.json`, `dictionaries/id.json`, and `dictionaries/nl.json`.

## Testing Guidelines

End-to-end coverage uses Playwright in `tests/*.spec.ts`. Name specs after the surface under test, for example `catalog.spec.ts` or `og-image.spec.ts`. Run `yarn test:e2e` before merging user-facing route, metadata, or interaction changes. Run `yarn lint` for TypeScript and Next.js checks.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit-style prefixes: `feat:`, `fix:`, `refactor:`, `style:`, and `chore:`. Keep messages imperative and specific, for example `feat: add localized workshop pricing`.

Pull requests should include a short description, testing performed, linked issue when applicable, and screenshots or videos for visible UI changes. Call out environment, migration, Supabase, or translation changes explicitly so reviewers know what must be deployed or verified.

## Security & Configuration Tips

Do not commit secrets. Required environment variables include Supabase public and service keys, Resend, Turnstile, WhatsApp, revalidation, and metal price API keys. Keep request routing changes in `proxy.ts`; do not add `middleware.ts`.
