# Salim Silver | Handcrafted Javanese Jewelry

![Salim Silver](public/images/private-collection-priyana-jatmika-salim.webp)

**Salim Silver** is a premium web application for showcasing handcrafted Javanese jewelry. It serves as a digital catalog, company profile, and blog, featuring a sophisticated design system, dynamic product filtering, and smooth animations to reflect the brand's luxury aesthetic.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4), Framer Motion
- **Database & Auth**: Supabase
- **UI Components**: Shadcn UI (Radix Primitives), Lucide Icons
- **Internationalization**: next-intl
- **Gallery**: React Photo Album, Yet Another React Lightbox
- **Email**: Resend
- **Testing**: Playwright (End-to-End)

## 📂 Project Structure

- **`app/`**: Main application code (App Router).
  - `[locale]/`: Internationalized routes.
    - `(auth)/`: Authentication routes.
    - `(main)/`: Public-facing pages (Home, Catalog, Blog, About).
  - `api/`: Backend API routes.
- **`components/`**: Reusable React components.
  - `ui/`: Base UI components (Shadcn UI).
  - `features/`: Feature-specific components.
  - `blocks/`: Larger page sections.
- **`lib/`**: Utilities and configurations.
  - `supabase/`: Supabase client/server configuration.
  - `actions/`: Server actions for data mutation.
  - `types.ts`: TypeScript interfaces.
- **`supabase/`**: Database migrations and seeds.
- **`proxy.ts`**: Middleware replacement for request handling.
- **`tests/`**: Playwright E2E test specs.

## 🛠️ Setup Instructions

This project uses `yarn` as the package manager.

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Run the development server**

   ```bash
   yarn dev
   ```

   Runs at `http://localhost:3000`.

3. **Production Build**

   ```bash
   yarn build
   yarn start
   ```

4. **Testing & Linting**

   ```bash
   yarn test:e2e  # Run Playwright tests
   yarn lint      # Run linter
   yarn format    # Run formatter
   ```

## 💎 Features & Data

- **Jewelry Catalog**: Browsable handcrafted collections managed via **Supabase**.
- **Data Fetching**: Collections and items are fetched using `@supabase/ssr` in `lib/collections.ts` and `lib/supabase/`.
- **Filtering**: Filter products by type (Rings, Necklaces, etc.).

## 🎨 Design System

The theme uses a premium color palette defined in `app/globals.css` with **Tailwind CSS v4** variables:

- **Light Mode**: Light Cream background, Deep Charcoal text, Gold accents.
- **Dark Mode**: Midnight Blue background, Soft Cream text, Muted Gold accents.
- **Typography**: Cormorant Garamond (Serif) & Lato (Sans-serif).

## 📄 License

This project is licensed under the MIT License.
