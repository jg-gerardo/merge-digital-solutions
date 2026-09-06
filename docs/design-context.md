# General design context

This document translates the supplied website moodboard into a shared visual direction
for design and implementation. It records what is visible in the reference, then adds
practical guidance where the moodboard does not specify responsive behavior,
accessibility, or exact tokens.

The moodboard is directional rather than a complete UI specification. Measurements and
hex values below are working targets to be confirmed during implementation, not
pixel-perfect values extracted from a source design file.

## Design intent

The brand is **minimalist, professional, organized, and purposefully colorful**. The
interface should feel calm and credible first, then energetic through carefully placed
brand color and abstract imagery.

The main visual tension is deliberate:

- neutral backgrounds, black typography, simple geometry, and generous whitespace
  create order;
- five vivid accent colors express the breadth of the "MERGE" identity; and
- soft, grainy gradient artwork adds warmth and creativity without making the core UI
  feel decorative or busy.

Favor clarity over novelty. Color, imagery, and motion should help identify actions or
create a focal point, not compete for attention throughout the page.

## Visual principles

1. **Lead with hierarchy.** Use scale, weight, and whitespace before adding borders,
   shadows, or color.
2. **Keep the canvas quiet.** Large areas should remain white or very light gray so the
   brand colors retain impact.
3. **Use one dominant accent at a time.** Multiple brand colors can appear across a
   page, but an individual section or component should normally have one clear accent.
4. **Prefer crisp, flat UI.** Controls use solid fills or thin outlines. Heavy shadows,
   glass effects, and ornamental borders are outside the moodboard's language.
5. **Pair precision with softness.** Navigation, type, and controls are geometric and
   aligned; abstract gradients and grain supply the softer counterpoint.
6. **Repeat simple shapes.** Rounded pills, small rounded-square icon controls, and
   rectangular cards make up the core geometry.

## Color system

### Observed palette

The reference shows a neutral row and a saturated brand row. These approximate values
are suitable as initial design tokens, but should be checked against an editable brand
source before they are treated as canonical.

| Role          | Working value | Intended use                                               |
| ------------- | ------------- | ---------------------------------------------------------- |
| Ink           | `#20232e`     | Primary text and dark surfaces                             |
| Muted neutral | `#7b7d84`     | Secondary text, disabled states, and subdued UI            |
| Soft neutral  | `#eeeeee`     | Alternate section surfaces and subtle control backgrounds  |
| Cool neutral  | `#dedede`     | Dividers, placeholders, and image skeletons                |
| White         | `#ffffff`     | Page/card surfaces and text on saturated colors            |
| Brand blue    | `#0868b2`     | Links, focus indication, selected states, and blue accents |
| Brand pink    | `#ff3b82`     | Expressive highlights and selected campaign accents        |
| Brand orange  | `#ff7900`     | Warm highlights and selected campaign accents              |
| Brand teal    | `#00ad98`     | Positive accents and selected campaign accents             |
| Brand purple  | `#9700b8`     | Expressive highlights and selected campaign accents        |

Black is also used in the moodboard for primary calls to action and high-emphasis type.
If a true black token is introduced, reserve it for the highest-contrast moments rather
than replacing the softer ink color everywhere.

### Color usage

- Use ink/black and white for the default interface. Brand hues are accents, not the
  base layer.
- The primary site-wide CTA can remain black; colored versions are variants for a
  section with a clear color theme.
- Keep normal body copy neutral. Use color for links, status, emphasis, or short phrases
  only when it has a consistent meaning.
- Do not rely on hue alone to distinguish a state. Pair color with text, an icon, an
  underline, or another structural cue.
- Check every text/background pairing for WCAG contrast. The orange, teal, and pink
  samples may need dark text rather than white at smaller sizes; the moodboard's white
  button labels are a visual reference, not proof of accessible contrast.
- The purple dashed rectangles in the moodboard describe component boundaries. They
  are annotation guides and should not appear in the finished interface.

### Gradient and image palette

The supplied artwork uses diffuse blends of the same brand family: blue, cyan, pink,
purple, orange, yellow, red, and white. A fine grain softens the transitions and gives
the imagery a tactile, editorial character.

Use these images for hero atmosphere, work/case-study cards, or occasional section
accents. Preserve enough quiet space around them, avoid placing detailed copy on busy
areas, and add an overlay when text contrast is not reliable. Do not recreate the look
with many unrelated gradients across the UI.

Current related assets:

- `public/assets/images/abstract-bg.png`: mostly white field with a soft multicolor
  form, suitable for a spacious section or hero background;
- `public/assets/images/card-design-1.png`: warm yellow/orange abstract texture;
- `public/assets/images/card-design-2.png`: high-energy red/orange/pink field; and
- `public/assets/images/card-design-3.png`: cool blue/pink field with generous light
  areas.

## Typography

The moodboard specifies **Plus Jakarta Sans** as the primary family. It is a modern
geometric sans serif that supports the intended professional but approachable tone.
Use a system sans-serif fallback while it loads.

The displayed family range is Extra Light, Light, Regular, Medium, Semi Bold, Bold,
Extra Bold, plus Bold Italic and Italic. The site will normally need only four or five
weights; load only those actually used to avoid unnecessary font payload.

### Recommended hierarchy

| Style             | Character from the moodboard                                       |
| ----------------- | ------------------------------------------------------------------ |
| Display / page H1 | Very large, compact line height, bold or extra bold                |
| Section H2        | Clearly smaller than the display, bold or semi bold                |
| Subsection H3-H4  | Progressive size reduction, semi bold to medium                    |
| Minor H5          | Compact and medium/semi-bold                                       |
| Body              | Regular weight, comfortable line height, moderate measure          |
| Small label       | Bold, visually compact, used sparingly                             |
| Editorial accent  | Italic or bold italic for a short phrase, never long body passages |

Keep headings tight but not crowded and body copy more open. Use sentence case for
headings, labels, and buttons. Avoid artificial letter spacing on ordinary body text.
Small uppercase labels can use modest tracking to remain legible.

Responsive type should scale fluidly where useful, with explicit minimum and maximum
sizes. Preserve semantic heading order independently of visual size.

## Layout and spacing

The reference is arranged as a clean modular board with strong left alignment,
consistent gutters, and generous separation between component groups. The website
should carry that same rhythm.

- Use a centered content container with comfortable side padding and a readable maximum
  width rather than stretching content edge to edge.
- Build sections on a consistent spacing scale. Larger jumps should separate ideas;
  smaller gaps should connect labels, copy, and controls.
- Let whitespace create grouping before introducing a border or background change.
- Use a responsive grid for services and work. Cards can vary in width or image ratio,
  but their text and actions should align consistently.
- On narrow screens, collapse multi-column arrangements to one column, let controls use
  the available width where appropriate, and replace the desktop navigation with an
  accessible menu control.
- Avoid copying the moodboard's fixed desktop coordinates. It presents components, not
  a literal page composition.

Slight corner rounding is part of the system: pill-shaped buttons, softly rounded input
fields, and subtly rounded cards or icon buttons. Avoid mixing many radius values.

## Logo and brand mark

The primary logo spells `mERGE;` with blue, pink, orange, teal, and purple characters,
plus the descriptor `BRANDING & DIGITAL SOLUTIONS`. The semicolon is part of the mark.
Use the supplied artwork rather than reconstructing the wordmark with live text.

- Preserve the logo's aspect ratio and clear space.
- Do not recolor, crop, rearrange, or apply effects to the mark.
- Use a compact or symbol treatment only when an approved source asset exists.
- At small sizes, confirm the descriptor remains legible; if it does not, use an
  approved simplified mark rather than allowing it to blur.

## Navigation

The desktop navigation is a single horizontal row: logo on the left, five plain-text
links (`Home`, `About`, `Services`, `Works`, `Contact`) across the middle, and a dark
`Let's Talk` CTA on the right.

- The active link is indicated by a short underline with a small gap below the label.
- Inactive links remain neutral and unboxed.
- The CTA is rectangular and high contrast, with less rounding than the pill controls
  shown elsewhere.
- Keep the header visually light. It should orient visitors without becoming a large
  decorative band.
- Give every link and button a visible keyboard focus treatment and adequate touch
  target, even when the visible label is compact.
- On mobile, preserve the CTA's importance without forcing the full desktop row into a
  narrow viewport.

## Buttons and links

The moodboard defines three levels of action, each repeated in black and the five brand
colors.

### Primary

Primary buttons are solid, high-contrast pills with a compact centered label. Use one
primary action per local decision area. Default to the black variant; select a colored
variant only when the surrounding section has an intentional accent.

### Secondary

Secondary buttons share the pill shape but use a transparent or very light fill with a
thin colored outline and matching text. They support the primary action without
competing with it.

### Tertiary

Tertiary actions are text labels followed by a right-pointing chevron/arrow. They have
no container by default and suit card links, inline exploration, and lower-emphasis
navigation.

### Icon-only

Icon buttons are compact rounded squares with a right-pointing chevron. Use them when
the action is already clear from context, especially on visual cards. Every icon-only
control still needs an accessible name.

All interactive variants need defined hover, active, focus-visible, and disabled states.
Use motion sparingly: a slight color shift, underline movement, or short arrow
translation is enough. Do not communicate state through motion alone.

## Form fields

The reference uses small labels above white rectangular fields with subtle rounding.
It shows default, focused, prefilled, date-picker, and search examples.

- Labels remain visible above the control; placeholders do not replace labels.
- Default fields use a subtle neutral border against the light-gray section surface.
- Focus uses the brand blue outline shown in the moodboard, with sufficient thickness
  and contrast for keyboard users.
- Date and search fields place a small functional icon at the trailing edge.
- Prefilled values use normal readable text; placeholder text is visibly quieter while
  still meeting contrast requirements.
- Add error, success, help-text, disabled, and required states when forms are designed;
  these states are not supplied by the moodboard.
- Maintain at least practical touch-target height even though the reference controls
  are visually compact.

## Cards

Two card directions appear in the moodboard.

### Image-led feature card

This is a wide, full-bleed image card. A title and short description sit near the lower
left, while a small white icon button anchors the lower right. Use a gradient scrim or
select an image crop that keeps the text readable. It is appropriate for featured work,
case studies, or major services.

### Compact content card

This is a white rectangular card with a small image at the top, followed by a heading,
short paragraph, and minimal arrow link. It suits supporting work, articles, or service
summaries. Keep copy concise so the layout remains airy.

Cards should not depend on hover to reveal essential information. If the whole card is
clickable, preserve a clear focus state and avoid nested interactive elements that
create ambiguous behavior.

## Imagery and art direction

The abstract assets are intentionally blurred, luminous, and grainy rather than sharp
or illustrative. They suggest creative energy while allowing the structured interface
to remain the foreground.

- Favor soft color fields, restrained compositions, and purposeful negative space.
- Choose warm or cool artwork to establish a section's dominant accent.
- Crop intentionally at each breakpoint; do not simply squeeze a desktop composition.
- Provide useful alternative text when an image communicates project content. Use an
  empty alternative for purely decorative atmosphere.
- Optimize delivery formats and responsive sizes before production use; the source
  assets are large raster files.

## Motion

Motion is not directly specified by the static moodboard. Any animation should inherit
its composed, professional character:

- use quick, subtle feedback for controls;
- use gentle opacity/transform reveals only when they clarify hierarchy;
- allow abstract imagery to drift or scale very slowly, if at all;
- avoid continuous high-energy effects around body copy or navigation; and
- honor `prefers-reduced-motion` with an equivalent, understandable static state.

## Voice and content shape

The design supports concise, direct copy. Headings should make a clear claim, body copy
should explain it in a few lines, and action labels should be specific. The visual system
loses its organized quality when cards or hero sections become text-heavy.

Prefer `View project`, `Explore services`, or `Start a conversation` over vague labels
such as `Click here`. Preserve the moodboard's friendly professionalism; avoid both
corporate filler and overly playful language.

## Accessibility and quality baseline

Before a component is considered complete:

- text and interactive states meet WCAG contrast requirements;
- keyboard focus is visible and follows a logical order;
- controls have semantic elements and accessible names;
- touch targets are comfortably operable;
- headings form a meaningful document outline;
- layouts work without horizontal scrolling at narrow widths;
- images have intentional alternative text and do not contain essential text; and
- the experience remains complete with reduced motion, zoomed text, or unavailable
  background imagery.

## Implementation decisions still to confirm

The moodboard does not establish the following. Decide and document them when real
content and page designs are available:

- canonical brand color values and accessible foreground pairings;
- exact type scale, line heights, and loaded font weights;
- spacing, radius, border, container, and breakpoint tokens;
- approved logo variants for dark backgrounds and small placements;
- mobile navigation behavior;
- form validation and status-state styling; and
- final motion timings and easing.
