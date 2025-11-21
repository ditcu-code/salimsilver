# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages, layout shell (`layout.tsx`), global styles (`globals.css`), and routes for `about`, `collections`, `contact`, `showcase`, plus `manifest` files.
- `components/`: Reusable UI; `components/ui/` holds low-level primitives, while top-level files cover headers, galleries, forms, and theming.
- `lib/`: Shared utilities (`utils.ts`), type definitions, collection helpers, and server actions.
- `hooks/`: Client hooks such as toasts and mobile detection.
- `public/`: Images and assets; gallery photos live in collection-named folders validated by `scripts/validate-images.ts`.
- `scripts/`: Toolbox tasks; `validate-images.ts` checks image folders and metadata.

## Build, Test, and Development Commands
- `yarn dev`: Runs image validation in dry-run mode, then starts the Next.js dev server on port 3000.
- `yarn build`: Dry-run image validation, then creates the production build.
- `yarn start`: Serves the prebuilt app.
- `yarn lint`: Runs Next.js ESLint config against the repo.
- `yarn validate-images`: Full image validation; use before committing new photos.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components; enable `"use client"` only where needed.
- Styling: Tailwind CSS utility classes; keep classes focused and leverage component-level wrappers for complex layouts.
- Naming: PascalCase for components, camelCase for functions/variables, kebab-case for filenames and routes. Keep collection folder names consistent across `public/` and `lib/collections.ts`.
- Formatting: Follow existing two-space indentation and imports grouped by package/local paths. Lint must pass before pushing.

## Testing Guidelines
- Automated testing is limited to linting. Use `yarn lint` and `yarn validate-images` for fast checks.
- Manually verify key flows after changes: route navigation, image loading in collections/showcase, theme toggling, and contact form submission path.
- When adding tests, colocate them near the feature (e.g., `component.test.tsx`) and keep fixtures small.

## Commit & Pull Request Guidelines
- Commit messages: Prefer concise, present-tense summaries; Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) are welcome but not enforced.
- Scope commits narrowly (UI tweak, data change, build chore). Ensure lint and validation pass before committing.
- Pull requests: Include a short description of intent, linked issue (if any), screenshots or clips for UI changes, and a manual test checklist. Note any new assets added to `public/` and confirm they pass validation.
