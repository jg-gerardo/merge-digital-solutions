# UI foundation

The first reusable theme layer is implemented in the global stylesheet and a small
Astro button component. The live reference is available at `/style-guide` during local
development.

## Theme tokens

[`src/styles/global.css`](../src/styles/global.css) defines the moodboard palette as
Tailwind theme tokens. Use their generated utilities when a utility is the clearest
choice:

```html
<section class="bg-brand-blue text-white">...</section>
<h2 class="text-ink">...</h2>
```

The same tokens are available as CSS custom properties for component styles:

```css
.example {
  color: var(--color-ink);
  border-radius: var(--radius-card);
  background: var(--color-brand-teal);
}
```

Prefer semantic variables such as `--color-page`, `--color-surface`, `--color-text`,
`--color-text-muted`, `--color-border`, and `--color-focus` for ordinary interface
structure. Reserve the named brand colors for intentional accents.

## Typography classes

Plus Jakarta Sans is loaded by the shared layout. The following global classes provide
the standard hierarchy:

- `.type-display`
- `.type-heading-1`
- `.type-heading-2`
- `.type-heading-3`
- `.type-body-lg`
- `.type-body`
- `.type-label`

Apply these to the appropriate semantic element; the class controls appearance, not
document structure.

## Buttons

Import the shared component:

```astro
---
import Button from "../components/ui/Button.astro";
---

<Button>Primary action</Button>
<Button variant="secondary" tone="blue">Secondary action</Button>
<Button href="/work" variant="tertiary" tone="teal">View work</Button>
<Button variant="icon" tone="purple" ariaLabel="View project" />
```

Supported variants are `primary`, `secondary`, `tertiary`, and `icon`. Supported tones
are `ink`, `blue`, `pink`, `orange`, `teal`, and `purple`. Passing `href` renders a link;
otherwise the component renders a button with `type="button"` by default.

Icon-only buttons require `ariaLabel`. Bright pink, orange, and teal primary buttons use
dark foreground text so their labels retain useful contrast.

## Form controls

Use `.field`, `.field-label`, and `.text-input` for the baseline input layout. Labels
must remain visible; placeholders are supporting hints, not replacements for labels.

This is intentionally a small foundation. Add components only when a real page proves
their API and reuse requirements.
