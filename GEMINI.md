# Salim Silver Project Context

## Project Overview

**Salim Silver** is a premium jewelry catalog and company profile website. It is a **Next.js 16** application using the **App Router**, designed to showcase handcrafted Javanese silver jewelry (Rings, Necklaces, Bracelets).

## Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4
- **UI Library:** Shadcn UI (Radix UI primitives) + Custom components
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Theme:** Custom Light/Dark mode with "Warm Cream" and "Dark Warm Brown" aesthetic.
- **Data:** Static data management in `lib/collections.ts`.

## Directory Structure & Conventions

### `app/` (Routes)

Follows Next.js App Router conventions.

- `(home)/`: Root landing page.
- `catalog/`: Product catalog with filtering.
- `collections/[slug]/`: Dynamic individual collection pages.
- `layout.tsx`: Root layout containing `AppProviders`, `ThemeProvider`, and global font configurations (`Lato` and `Cormorant Garamond`).

### `components/`

Organized by scope and reusability:

- **`ui/`**: Atomic, reusable UI primitives (e.g., `button.tsx`, `card.tsx`). largely based on Shadcn UI. **Do not modify these unless necessary for global style changes.**
- **`blocks/`**: Larger, composite UI sections (e.g., `hero-slider.tsx`, `collection-grid.tsx`).
- **`features/`**: Functional components with specific business logic (e.g., `search-bar.tsx`, `theme-toggle.tsx`, `contact-form.tsx`).
- **`layout/`**: Global layout components (`header.tsx`, `footer.tsx`).

### `lib/` (Utilities & Data)

- **`collections.ts`**: Acts as the "database". Contains the `collections` array and helper functions (`getCollection`, `getFeaturedCollections`).
- **`utils.ts`**: Common utility functions (e.g., `cn` for Tailwind class merging).
- **`types.ts`**: Shared TypeScript interfaces (`Collection`, `Photo`).

### `public/`

- **`images/`**: Stores high-quality jewelry imagery.
- **`sounds/`**: UI sound effects.

## Development Workflow

### Commands

- **Dev Server:** `yarn dev` (Runs on http://localhost:3000)
- **Build:** `yarn build`
- **Lint:** `yarn lint`

### Coding Guidelines

1.  **Components:** Use Functional Components with Hooks.
2.  **Styling:** Use Tailwind utility classes. Use `cn()` for conditional class merging.
3.  **Imports:** Use the `@/` alias for the project root (e.g., `import { Button } from "@/components/ui/button"`).
4.  **Type Safety:** Ensure all props and data structures are typed. Avoid `any`.
5.  **Icons:** Import from `lucide-react`.

## Key Design Tokens (from `globals.css`)

- **Fonts:** `Lato` (Sans-serif) for body, `Cormorant Garamond` (Serif) for headings.
- **Colors:**
  - `background`: Warm Cream (`#fafaf6`) / Dark Brown (`#1a120b`)
  - `primary`: Dark Brown (`#3c2a21`) / Lighter Brown (`#956a58`)
  - `accent`: Soft Brown (`#dccdc9`) / Dark Brown Accent (`#533e35`)

## Common Tasks

- **Adding a new Collection:** Update `lib/collections.ts` and add images to `public/images/`.
- **Modifying the Theme:** Edit CSS variables in `app/globals.css`.
- **New UI Component:** Create in `components/ui/` if generic, or `components/blocks/` if complex.
