# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entrypoints, route folders (`about`, `collections`, `contact`, `showcase`), `layout.tsx`, and `globals.css`.
- `components/`: Reusable UI; `components/ui/` holds primitives, while top-level components cover headers, galleries, forms, and theming.
- `lib/`: Shared utilities (`utils.ts`), collection metadata/helpers, and server actions.
- `hooks/`: Client hooks such as toast handling and mobile detection.
- `public/`: Images and static assets. Gallery photos live in collection-named folders that must match entries in `lib/collections.ts`.
- `scripts/`: Maintenance tasks like `validate-images.ts` that verify asset structure and metadata.

## Build, Test, and Development Commands
- `yarn dev`: Runs image validation in dry-run mode, then starts the Next.js dev server on port 3000.
- `yarn build`: Dry-run image validation, then produces the production build.
- `yarn start`: Serves the prebuilt app.
- `yarn lint`: Runs the Next.js ESLint config.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components; add `"use client"` only where required.
- Styling: Tailwind CSS; combine utilities with existing component wrappers instead of long ad-hoc class strings.
- Naming: PascalCase for components, camelCase for variables/functions, kebab-case for filenames and routes. Keep collection directory names consistent across `public/` and `lib/collections.ts`.
- Formatting: Two-space indentation. Group imports by package vs. local paths. Lint must pass before merging.

## Testing Guidelines
- Automated coverage is light: rely on `yarn lint` and `yarn validate-images`.
- Manually verify navigation between routes, image loading in collections/showcase, theme toggling, and contact form submission.
- When adding tests, colocate near the feature (e.g., `Component.test.tsx`) and keep fixtures minimal.

## Assets & Image Management
- Place new photos under `public/<collection-name>/` and register the collection in `lib/collections.ts`.
- Ensure filenames and folder names stay kebab-case and match across code and assets.
- Run `yarn validate-images` after adding or moving assets to catch missing metadata or misnamed directories.

## Commit & Pull Request Guidelines
- Commit messages: concise, present tense; Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) are welcome but optional. Keep scope narrow (UI tweak, data update, build chore).
- Before committing, run `yarn lint` and `yarn validate-images`.
- Pull requests: include intent, linked issue (if any), and screenshots or clips for UI changes. Note new assets added to `public/` and confirm validation passed.
