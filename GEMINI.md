# Project Overview

Salim Silver is a multilingual Next.js application for handcrafted Javanese silver jewelry. It combines a public brand site, Supabase-backed catalog, product and collection pages, blog, workshop registration, contact flow, store location, and live gold and silver price pages.

## Tech Stack

- **Framework:** Next.js 16 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4 and Framer Motion
- **Data:** Supabase database, storage, SSR clients, and Edge Functions
- **UI:** Shadcn-style Radix primitives, Lucide icons, Sonner
- **Internationalization:** next-intl with `en`, `id`, and `nl`
- **Media:** React Photo Album, Yet Another React Lightbox, React Social Media Embed
- **Email and forms:** Resend, Cloudflare Turnstile, server actions
- **Testing:** Playwright

## Commands

Use Yarn 1.22.22.

```bash
yarn install
yarn dev
yarn build
yarn start
yarn lint
yarn test:e2e
yarn format
```

`yarn test:e2e` runs Playwright. The Playwright config starts `yarn dev` against `http://localhost:3000` and reuses an existing local server outside CI.

## Environment Variables

The application references these variables:

```bash
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
CONTACT_EMAIL_TO
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
REVALIDATION_SECRET
METALS_DEV_API_KEY
METALS_DEV_API_KEY_2
```

`NEXT_PUBLIC_SITE_URL` defaults to `https://salimsilver.com` in `lib/constants.ts`.

## Project Structure

> [!IMPORTANT]
> Next.js middleware has been replaced by `proxy.ts`. Keep request routing changes in `proxy.ts`, not `middleware.ts`.

- `app/`: App Router pages, layouts, route handlers, Open Graph images, manifest, robots, and sitemap
- `app/[locale]/(main)/`: localized public pages
- `app/[locale]/(main)/(home)/`: localized home page
- `app/[locale]/(main)/catalog`: catalog listing and product query handling
- `app/[locale]/(main)/product/[slug]`: product detail pages
- `app/[locale]/(main)/collections`: collection listing and collection detail pages
- `app/[locale]/(main)/blog`: blog list and post pages
- `app/api/`: revalidation, WhatsApp, blog view count, and metal price Open Graph routes
- `components/`: shared UI, layout, feature, icon, and block components
- `dictionaries/`: translation JSON for English, Indonesian, and Dutch
- `i18n/`: localized navigation and request setup
- `lib/`: Supabase clients, data access, SEO helpers, actions, price helpers, and shared types
- `supabase/`: local Supabase config, migrations, seed data, and Edge Functions
- `tests/`: Playwright E2E specs
- `packages/react-twitter-embed/`: private vendored package resolved from the root `package.json`

## Development Conventions

- Prefer Server Components for data fetching unless client interactivity is required.
- Use the Supabase clients in `lib/supabase/client.ts` and `lib/supabase/server.ts`.
- Keep data access helpers in `lib/collections.ts`, `lib/blog.ts`, `lib/gold-price.ts`, and `lib/silver-price.ts`.
- Use server actions from `app/actions.ts` and `lib/actions/` for form submissions and mutations.
- Keep canonical URL, alternate locale, and Open Graph locale behavior in `lib/seo.ts`.
- Use Tailwind utility classes and theme variables from `app/globals.css`.
- Use `lucide-react` for standard icons.
- Follow shared data types in `lib/types.ts` and database types in `lib/types_db.ts`.
- Keep translations synchronized across `dictionaries/en.json`, `dictionaries/id.json`, and `dictionaries/nl.json`.

## Data Models

- **Jewelry:** product item data, including title, slug, status, material, dimensions, images, price, and collection relationships
- **Collection:** catalog grouping for product families and collection landing pages
- **Post:** blog content with localized fields, SEO metadata, tags, images, views, and comments
- **Metal prices:** cached gold and silver price rows used by the public price pages and OG image routes

## SEO and Caching

Public routes define localized metadata, canonical URLs, alternates, and Open Graph data. Catalog, product, and collection data use revalidation windows, while manual revalidation is handled through `app/api/revalidate/route.ts` and `REVALIDATION_SECRET`.
