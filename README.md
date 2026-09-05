# Merge Digital Solutions

We design digital experiences that move your business forward.

## Project status

The initial project foundation is ready. The website is a static-first,
frontend-focused Astro site with selective client-side interactivity and animation.

## Tech stack

| Area               | Technology                                 | Purpose                                                                  |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------ |
| Framework          | Astro                                      | Static-first pages, routing, layouts, and component islands              |
| Language           | TypeScript (strict mode)                   | Typed application and animation code                                     |
| Styling            | Tailwind CSS with scoped CSS               | Design tokens and utilities, with scoped CSS for bespoke visuals         |
| Animation          | CSS and Motion                             | CSS for simple effects; Motion for composed and scroll-linked animation  |
| Advanced animation | GSAP with ScrollTrigger, when justified    | Complex timelines, pinning, and scroll-driven sequences only             |
| Content            | Astro Content Collections and Markdown/MDX | Typed case studies and other structured content                          |
| End-to-end testing | Playwright                                 | Critical user flows and cross-browser checks                             |
| Package manager    | pnpm                                       | Dependency and script management                                         |
| Hosting            | To be selected                             | The static build can be deployed to Cloudflare Pages, Netlify, or Vercel |

Astro, Tailwind, Motion, and the quality tools are installed locally and declared in
`package.json`; `pnpm-lock.yaml` records their exact resolved versions. They should
not be installed globally.

## Planned project structure

```text
.
├── public/                    # Files served unchanged (favicon, robots.txt, social images)
├── src/
│   ├── assets/               # Images, SVGs, fonts, and other processed assets
│   ├── components/
│   │   ├── ui/               # Small reusable interface components
│   │   └── sections/         # Page-level sections such as Hero and Services
│   ├── content/              # Content collection entries such as case studies
│   ├── layouts/              # Shared page shells and metadata
│   ├── lib/
│   │   └── animation/        # Reusable Motion or GSAP helpers
│   ├── pages/                # File-based routes
│   ├── styles/               # Global styles, tokens, and Tailwind entry point
│   └── types/                # Shared TypeScript types
├── tests/
│   └── e2e/                  # Playwright tests
├── docs/                     # Architecture, decisions, and implementation guides
├── astro.config.mjs          # Astro configuration
├── playwright.config.ts      # End-to-end test configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and project scripts
```

This is a target structure, not a requirement to create every directory up front.
Directories should be introduced only when the codebase needs them.

## Build principles

- Prefer semantic HTML and static Astro components.
- Add client-side JavaScript only where interaction requires it.
- Use CSS transitions and keyframes for simple effects, then Motion for richer
  component animation.
- Add GSAP only when a sequence cannot be expressed cleanly with CSS or Motion.
- Animate `transform` and `opacity` where possible, and support
  `prefers-reduced-motion` from the beginning.
- Keep components close to the page or section that owns them until reuse is clear.
- Store significant technical decisions and longer implementation guidance in
  [`docs/`](docs/README.md).

## Documentation

The [`docs/`](docs/README.md) directory is the index for project documentation.
Update its index whenever a new document is added.

## Local development

```powershell
pnpm install
pnpm dev
```

Before committing a change, run the checks relevant to it:

```powershell
pnpm check
pnpm format:check
pnpm test:e2e
pnpm build
```
