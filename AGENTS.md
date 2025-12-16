# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Next.js App Router pages, layouts, metadata files, and route-specific UI. Keep route components small and push shared UI into `components/`.
- `components/`: Reusable UI primitives and feature blocks; prefer co-locating styles/variants near the component.
- `lib/`: Utilities, data loaders, and constants (e.g., collection data); keep pure functions here.
- `hooks/`: Reusable React hooks; avoid business logic duplication across routes.
- `public/`: Static assets (imagery, icons, fonts); reference via `/images/...` paths in components.
- `scripts/`: One-off maintenance scripts; keep idempotent and documented with inline usage notes.

## Build, Test, and Development Commands

- `yarn dev`: Run the local dev server at `localhost:3000` with hot reload.
- `yarn build`: Production build; ensure this passes before merging.
- `yarn start`: Serve the built app locally for smoke testing.
- `yarn lint`: ESLint with Next.js rules; run before opening a PR.

## Coding Style & Naming Conventions

- Language: TypeScript + React; prefer functional components and hooks over classes.
- Styling: Tailwind CSS; favor semantic class composition and use `tailwind-merge`/`clsx` for conditional styles.
- Components: Use PascalCase for components/filenames (`FeatureCard.tsx`), camelCase for functions/variables.
- Imports: Absolute paths allowed; group external libs, then internal modules (`components`, `lib`, `hooks`).
- Accessibility: Use Radix primitives thoughtfully, label interactive elements, and keep keyboard support intact.

## Testing Guidelines

- Current suite: No automated tests checked in; add tests alongside new functionality when feasible.
- Suggested approach: Component tests with React Testing Library and Jest; name files `*.test.tsx`.
- Run lint and manual smoke tests (`yarn dev`, exercise changed routes) before pushing.

## Commit & Pull Request Guidelines

- Commits: Prefer concise, action-driven messages (e.g., `feat: add carousel autoplay controls`, `fix: correct catalog filter query`). Squash trivial WIP commits before opening a PR.
- Pull Requests: Include a brief summary, screenshots for UI changes (desktop + mobile), and mention affected routes (`app/catalog`, `app/contact`, etc.). Link any related issues.
- Quality bar: PRs should pass `yarn lint` and a local `yarn build`; note any known limitations or follow-ups.

## Security & Configuration Tips

- Environment: Avoid committing secrets; use `.env.local` for per-developer values.
- Assets: Large images belong in `public/images`; optimize before adding to keep build times fast.
- Dependencies: Prefer existing libraries in the stack (Radix UI, Framer Motion) before introducing new ones; justify additions in the PR description.
