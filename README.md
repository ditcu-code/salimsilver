# Salim Silver

![Salim Silver](public/images/private-collection-priyana-jatmika-salim.webp)

Salim Silver is a multilingual Next.js application for handcrafted Javanese silver jewelry. It serves the public website, product catalog, collection pages, blog, workshop registration, contact flow, store location, and live metal price pages.

## Tech Stack

- **Framework:** Next.js 16 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion, Cormorant Garamond, Lato
- **Data:** Supabase database, storage, SSR clients, and Edge Functions
- **UI:** Shadcn-style Radix primitives, Lucide icons, Sonner
- **Internationalization:** next-intl with English, Indonesian, and Dutch dictionaries
- **Media:** React Photo Album, Yet Another React Lightbox, React Social Media Embed
- **Email and forms:** Resend, Cloudflare Turnstile, server actions
- **Testing:** Playwright end-to-end tests

## Main Routes

- `/`, `/id`, `/nl`: localized home pages
- `/catalog`: catalog listing with product filtering
- `/product/[slug]`: product detail pages
- `/collections` and `/collections/[slug]`: collection listing and detail pages
- `/blog` and `/blog/[slug]`: blog listing, post detail, views, and comments
- `/about`, `/contact`, `/career`, `/workshop`, `/store-location`
- `/gold-price` and `/silver-price`: live metal price pages with Open Graph image routes
- `/links`, `/gmaps-review`, `/maintenance`: utility and campaign pages

The default locale is English. Indonesian and Dutch are served with locale prefixes.

## Project Structure

- `app/`: App Router pages, layouts, route handlers, metadata, and Open Graph image routes
- `components/`: shared UI, layout, feature, icon, and page block components
- `dictionaries/`: `en`, `id`, and `nl` translation JSON files
- `i18n/`: next-intl routing, navigation, and request helpers
- `lib/`: Supabase clients, data access, SEO helpers, server actions, price helpers, and shared types
- `public/`: static public assets
- `scripts/`: maintenance and validation scripts
- `supabase/`: local Supabase config, migrations, seed data, and Edge Functions
- `tests/`: Playwright specs for home, catalog, and Open Graph image behavior
- `packages/react-twitter-embed/`: private vendored dependency used through Yarn resolutions
- `proxy.ts`: request middleware replacement for locale routing

## Setup

This project uses Yarn 1.22.22.

```bash
yarn install
yarn dev
```

The development server runs at `http://localhost:3000`.

## Environment

The app expects these variables where the related feature is used:

```bash
NEXT_PUBLIC_SITE_URL=https://salimsilver.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_EMAIL_TO=
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
REVALIDATION_SECRET=
METALS_DEV_API_KEY=
METALS_DEV_API_KEY_2=
```

`NEXT_PUBLIC_SITE_URL` defaults to `https://salimsilver.com` in shared constants so generated metadata does not point at preview domains.

## Scripts

```bash
yarn dev       # Start the Next.js development server
yarn build     # Create a production build
yarn start     # Start the production server
yarn lint      # Run ESLint across the repo
yarn test:e2e  # Run Playwright tests
yarn format    # Format files with Prettier
```

Playwright starts `yarn dev` automatically unless a server is already running on `http://localhost:3000`.

## Supabase

The application uses Supabase for catalog data, blog data, comments, storage-backed images, and cached metal prices. Migrations live in `supabase/migrations`, seed data lives in `supabase/seed.sql`, and Edge Functions for price ingestion live in `supabase/functions`.

The public catalog image URL is built from `NEXT_PUBLIC_SUPABASE_URL` and the `catalog` storage bucket.

## SEO

SEO utilities in `lib/seo.ts` build canonical URLs, locale alternates, and Open Graph locales. Most public routes define localized metadata and image assets. `app/sitemap.ts`, `app/robots.ts`, and dynamic Open Graph routes are part of the production SEO surface.

## License

This project is licensed under the MIT License.
