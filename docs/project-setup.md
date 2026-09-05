# Project setup guide

This document records how the initial website foundation was created and explains
how the pieces fit together. It is intended as a review aid, not just a command log.

## 1. Start from Astro's minimal template

The official Astro generator created a minimal project with strict TypeScript:

```powershell
npx --yes create-astro@latest .astro-scaffold `
  --template minimal `
  --typescript strict `
  --no-install `
  --no-git `
  --yes
```

The repository already contained `README.md` and `docs/`, so the template was first
generated in a temporary directory. Its application files were then moved into the
repository root. The generated README and Git metadata were not used, preserving the
project's existing documentation and Git history.

The important generated files are:

- `astro.config.mjs`: Astro and Vite configuration;
- `tsconfig.json`: extends Astro's strict TypeScript defaults;
- `package.json`: project metadata, dependencies, and runnable scripts;
- `src/pages/index.astro`: the `/` route; and
- `public/`: static files copied to the build output unchanged.

## 2. Use pnpm for the repository

The `packageManager` field in `package.json` pins the expected pnpm release. The
lockfile created by `pnpm install` records the exact resolved dependency graph so
local development and automated builds install the same packages.

```powershell
pnpm install
pnpm approve-builds # Select and approve esbuild when prompted
```

pnpm was also asked to approve Astro's `esbuild` install script. The resulting
`pnpm-workspace.yaml` stores that narrow approval in version control; other dependency
build scripts remain blocked until they are reviewed.

Application packages are kept in `dependencies`; development-only tools are kept in
`devDependencies`. Nothing in this project needs to be installed globally.

## 3. Add Tailwind CSS

The styling and animation runtime packages were added locally:

```powershell
pnpm add tailwindcss @tailwindcss/vite motion
```

Tailwind's Vite plugin is registered in `astro.config.mjs`. Astro uses Vite internally,
so this lets Tailwind transform styles during development and production builds.

`src/styles/global.css` starts with:

```css
@import "tailwindcss";
```

That file is imported once by `BaseLayout.astro`, making Tailwind and the shared
global styles available to every page that uses the layout. Component-specific
visuals should remain scoped inside their Astro component when practical.

## 4. Add the shared layout and first route

`src/layouts/BaseLayout.astro` owns the HTML document shell, shared metadata, favicon,
and global stylesheet import. It accepts `title` and `description` props, so every
route must provide meaningful metadata.

`src/pages/index.astro` becomes `/index.html` in the static build. It imports the
layout and supplies the page-specific content. Astro components render to HTML by
default and send no component runtime to the browser.

The current route is intentionally minimal. It verifies the wiring without deciding
the final design before the site's content and visual direction are defined.

### Favicon

`public/merge-favicon.png` is referenced by the shared layout as the site favicon.
Files in `public/` are available from the site's root without being transformed, so
the source path becomes `/merge-favicon.png` in both development and production.
Keeping the reference in `BaseLayout.astro` applies the favicon to every route.

The generic `favicon.svg` and `favicon.ico` files from Astro's starter were removed
once the custom favicon was connected, avoiding unused fallback branding.

## 5. Establish the animation baseline

The `motion` package is available for animations that need orchestration, gestures,
or scroll progress. It should be imported only by the components that use it.

Simple hover, focus, opacity, and transform effects should remain CSS. GSAP is not
installed yet; it will be added only if a design calls for complex timelines,
pinning, or scrubbed scroll sequences.

The global stylesheet includes a `prefers-reduced-motion` fallback from the start.
New animations must remain understandable when motion is reduced.

## 6. Add quality checks

The project-local checking, formatting, and testing packages were added with:

```powershell
pnpm add --save-dev `
  @astrojs/check `
  @playwright/test `
  @types/node `
  prettier `
  prettier-plugin-astro `
  typescript@^6.0
```

The setup provides three complementary checks:

- `pnpm check` runs Astro's type and component diagnostics;
- `pnpm format:check` verifies formatting with Prettier and its Astro plugin; and
- `pnpm test:e2e` runs the Playwright browser smoke test.

ESLint is intentionally deferred. The current ESLint release requires a newer Node
patch than the one used to create this project, while the older compatible ESLint
release is no longer supported. Astro's diagnostics provide the important initial
correctness checks without pinning a deprecated lint stack. Revisit linting after the
project's Node version is updated or when additional client-side TypeScript warrants
more rules.

`tests/e2e/home.spec.ts` verifies the visible site identity and document title. The
Playwright configuration starts the Astro development server automatically and uses
Chromium. More browsers or flows should be added when the site has behavior worth
testing.

The Playwright web server explicitly keeps Astro in foreground mode. Astro can detect
coding-agent environments and start a managed background server, but Playwright must
own a foreground process so it can reliably start and stop that server with the test
run. It also binds the test server to `127.0.0.1`, matching Playwright's configured
base URL. These settings do not change normal `pnpm dev` behavior in a developer
terminal.

The matching Chromium binary was installed with:

```powershell
pnpm exec playwright install chromium
```

## 7. Understand the request path

For the current home page, the code flows in this order:

```text
Browser requests /
  -> Astro matches src/pages/index.astro
  -> index.astro passes metadata and content to BaseLayout.astro
  -> BaseLayout.astro builds the HTML document and loads global.css
  -> Vite processes Tailwind utilities used by the page
  -> Astro emits static HTML, CSS, and assets into dist/
```

## 8. Grow the structure only when needed

The root README shows the intended long-term structure, but only directories with a
current responsibility should exist. For example:

- create `src/components/ui/` when the first reusable UI primitive appears;
- create `src/components/sections/` when a page is split into substantial sections;
- create `src/content/` when case studies or other collections are modeled;
- create `src/lib/animation/` when animation logic is reused; and
- create `src/types/` when a type is shared across modules.

This keeps the initial project easy to navigate and prevents empty architecture from
dictating how the site must evolve.

## 9. Daily commands

```powershell
pnpm dev          # Start the local development server
pnpm check        # Run Astro and TypeScript diagnostics
pnpm format       # Format supported project files
pnpm test:e2e     # Run browser tests
pnpm build        # Create the production build in dist/
pnpm preview      # Preview the production build locally
```
