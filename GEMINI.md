# Project Overview

**Salim Silver** is a premium web application for showcasing handcrafted Javanese jewelry. It serves as a digital catalog, company profile, and blog. The application features a sophisticated design system, dynamic product filtering, and smooth animations to reflect the brand's luxury aesthetic.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4), Framer Motion (Animations)
- **Database & Auth:** Supabase
- **UI Components:** Shadcn UI (Radix Primitives), Lucide Icons
- **Gallery/Media:** React Photo Album, Yet Another React Lightbox
- **Testing:** Playwright (End-to-End)
- **Editor:** Tiptap (Rich Text)
- **Email:** Resend

## Building and Running

The project uses `yarn` as the package manager.

- **Install Dependencies:**

  ```bash
  yarn install
  ```

- **Development Server:**

  ```bash
  yarn dev
  ```

  Runs at `http://localhost:3000`.

- **Production Build:**

  ```bash
  yarn build
  ```

- **Start Production Server:**

  ```bash
  yarn start
  ```

- **Run End-to-End Tests:**

  ```bash
  yarn test:e2e
  ```

  (Runs `playwright test`)

- **Linting:**

  ```bash
  yarn lint
  ```

- **Formatting:**
  ```bash
  yarn format
  ```

## Project Structure & Conventions

> [!IMPORTANT]
> **Middleware Deprecation**: The "middleware" file convention is deprecated. We use `proxy.ts` (root) instead of `middleware.ts`. This project is configured to use `proxy.ts`.

### Key Directories

- `app/`: Main application code (Next.js App Router).
  - `(auth)/`: Authentication routes (Login).
  - `(main)/`: Public-facing pages (Home, Catalog, Blog, About).
  - `admin/`: Protected admin dashboard for managing collections, jewelry, and blog posts.
  - `api/`: Backend API routes (e.g., WhatsApp integration).
- `components/`: Reusable React components.
  - `ui/`: Base UI components (Shadcn UI).
  - `features/`: Feature-specific components (e.g., Contact Form, Theme Toggle).
  - `blocks/`: Larger page sections (e.g., Hero, Gallery).
  - `admin/`: Admin-specific components.
- `lib/`: Utilities and configurations.
  - `supabase/`: Supabase client and server configuration (`client.ts`, `server.ts`).
  - `types.ts`: TypeScript interfaces for data models (`Jewelry`, `Collection`, `Post`).
  - `actions/`: Server actions for data mutation.
- `supabase/`: Database configuration.
  - `migrations/`: SQL migration files.
  - `seed.sql`: Initial data seeding.
- `tests/`: Playwright E2E test specs (`catalog.spec.ts`, `home.spec.ts`).

### Development Conventions

- **Styling:** Use Tailwind CSS utility classes. Global theme colors are defined in `app/globals.css` (variables like `--background`, `--foreground`, `--gold`, etc.).
- **Data Fetching:** Prefer Server Components for data fetching where possible. Use Supabase clients (`@supabase/ssr`) configured in `lib/supabase/`.
- **State Management:** Use React Server Actions for form submissions and mutations (`lib/actions/`).
- **Icons:** Use `lucide-react` for iconography.
- **Types:** Strictly adhere to types defined in `lib/types.ts` and `lib/types_db.ts`.

## Data Models (Key Interfaces)

- **Jewelry:** Represents a product item (id, title, status, material, images, etc.).
- **Collection:** Represents a group of jewelry items (Rings, Necklaces, etc.).
- **Post:** Represents a blog entry (title, content, tags, SEO metadata).
