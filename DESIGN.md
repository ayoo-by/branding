# Design System: Sage

Sage is the design language of Ayooby and ayoo.by: warm beige-white by day, deep navy by night, with one muted sage-green accent carried across both. Surfaces are frosted glass, display type is an editorial serif, shadows are tinted to the canvas, and motion is slow and perpetual (a drifting aurora and a WebGL mesh gradient). It is hand-built, framework-free and fully usable without JavaScript.

These are the usage rules for designers and agents. Every token lives in `tokens/tokens.json`, so the rules name tokens (`sage-600`, `surface-2`, `shadow-lift`, `radius-lg`) instead of repeating what they hold. Where this document and the Sage theme code disagree, the theme code wins and this document gets fixed.

---

## 1. Visual Theme & Atmosphere

Sage feels like a **well-lit ceramics studio on a warm afternoon**: quiet and unhurried. Surfaces are frosted glass you can almost feel the cold of; light catches their top rim. Behind everything, a soft aurora of blurred sage-green blobs drifts in slow motion, and the home hero carries a living WebGL mesh gradient that breathes. Nothing shouts. Hierarchy comes from a confident editorial serif, a single desaturated green and generous negative space, never from neon or size alone.

The same identity holds in the dark: the warm beige canvas becomes a **deep navy**, the sage accent stays (lightened so it still reads against navy), the glass becomes a faint luminous film, and the mesh gradient shifts to navy with one muted sage inflection. It reads as the same room with the lights down, not a different design.

- **Density: 3-4 (Gallery-airy to Daily-app balanced).** Large breathing room, one idea per zone, generous section padding. Content-dense pages (prose, card grids) tighten up but never crowd.
- **Variance: 4-5 (Composed, lightly asymmetric).** The home hero is two stacked glass stages over one shared gradient, each with a **centred** name and one asymmetric counterweight: a faux-cutout corner block carved into its bottom-right. Inner pages are calm: posts, pages and the 404 are centred, list heads sit left above their grid. This is intentional symmetry, not a default; do not force off-axis splits onto it.
- **Motion: 5-6 (Fluid, perpetual, restrained).** One soft easing everywhere; always-on ambient loops (aurora drift, glass sheen, mesh gradient); entrance fades and scroll reveals; tactile lift and press. Movement is `transform` and `opacity` (the split hero's `flex-grow` is the one exception), always with a full reduced-motion fallback.

---

## 2. Colour Palette & Roles

One palette, two complete themes. **Light (warm beige) is the base palette**; dark (deep navy) keeps the sage accent, lightened so green still reads against navy. That accent parity is a **defining feature**, not an afterthought. The default preference is **System** (`auto`): with no stored choice the page follows the OS. The theme is resolved before first paint, so nothing flashes.

**Sage is the only accent hue; no other hues.** Everything tonal comes from the `sage-100` to `sage-700` ramp; the one exception is One Dark syntax highlighting inside code blocks. Set every colour from a token, never a hard-coded copy of its value.

### Canvas and glass
- `bg`: the page canvas and the `theme-color` meta. It also fills whatever must read as cut out of the glass (hero corners, their masks, the split hero's band and seam).
- `bg-warm`, `bg-deep`: the aurora's 60% and 100% stops. Background only.
- `surface`: resting frosted fill (the glass primitive, cards, pager blocks).
- `surface-2`: raised glass: hovered cards, pills, ghost buttons, the toast, the selected nav theme-switch segment.
- `nav-base`: the navbar fill under its two sage radials; it solidifies once the page scrolls.
- `border-glass`: the 1px rim highlight on every glass surface. `border-soft`: hairlines (prose `hr`, the hero-corner circle), green-tinted in light.

### Sage ramp
The ramp keeps its names and roles in both themes. Light runs pale to deep; dark runs deep to pale, so `sage-600` and `sage-700` stay the readable accent on navy and `sage-100` to `sage-300` become deep tints.

- `sage-100`: the faintest tint: inline-code background.
- `sage-200`: a pale fill the stylesheet does not use directly; in light it equals `pill-bg`.
- `sage-300`: text selection and the resting prose-link underline.
- `sage-400`: decorative marks only (the 3px blockquote rule). Never text in light.
- `sage-500`: **the primary accent**: the focus ring, prose list markers, the hero theme-switch fill in dark.
- `sage-600`: accent text on the canvas: section and article headings, eyebrows, the hero first names, the nav brand's first word. Also the hero theme-switch fill in light and the hero-corner circle on hover.
- `sage-700`: the strongest accent: links, the card foot, the backlink, tag text, active and selected states, inline code, a hovered card title.
- `pill-bg`: the shared fill for tags and the active nav item, always with `sage-700` text. It is `sage-200` in light and `sage-100` in dark: the dark pill stays at the deep sage tint on purpose.
- `sage-invert`: the opposite theme's `sage-700`, only for the social-chip and theme-cycle icon on hover. A deliberate flash, not a legible colour.

### Ink, code and ambient
- `ink`: primary text and headings. Off-black in light, **never pure `#000`**.
- `ink-soft`: secondary text: leads, card summaries, inactive nav links, pill text.
- `ink-faint`: metadata only: dates, reading time, the post author, pager labels, the hero-corner subtitle.
- `prose-ink`: long-form paragraphs, a touch softer than `ink`. Blockquotes render in it too, because Markdown wraps the quote in a `p`.
- `code-bg`, `code-ink`: code blocks in both themes (One Dark; Hugo style `onedark`). The one dark island in light mode.
- `aurora-tint-1`, `aurora-tint-2` (the aurora's static washes) and `aurora-blob-1`, `aurora-blob-2` (its drifting blob centres): stronger in light because sage reads faintly on beige. Background only.
- `gradient-color-1` to `gradient-color-4`: the hero mesh gradient (three sage tints and a beige in light, three navies and one muted sage in dark) and its static CSS fallback.

### Contrast
WCAG 2 ratios. `ink`, `ink-soft`, `prose-ink` and `sage-700` pass 4.5:1 on `bg`, `surface` and `surface-2` in both themes, and `sage-700` holds 4.73:1 on light `pill-bg`. These real pairs miss, and stay exactly as the theme has them:

| Pair | Light | Dark | Where it is used |
| --- | --- | --- | --- |
| `ink-faint` on `bg` | 2.87:1 | 4.70:1 | Article meta, hero-corner subtitle |
| `ink-faint` on `surface` | 3.07:1 | 4.10:1 | Card meta and pager labels (3.57:1 on a hovered card's `surface-2` in dark) |
| `sage-600` on `bg` | 4.06:1 | 9.06:1 | Passes for headings at 24px and up; the 0.78rem eyebrow misses in light |
| `sage-600` brand word on the nav glass | 3.5 to 4.4:1 | 4.6 to 9.0:1 | The 1.15rem "Diab" in the navbar |
| `sage-600` hero first name on the mesh gradient | 2.0 to 2.7:1 | 5.8:1 or better | Light misses the 3:1 large-text floor |
| `sage-700` on `sage-300` | 3.61:1 | 4.84:1 | Text selection |
| `sage-invert` icon on `bg` | 1.43:1 | 2.70:1 | Social-chip and theme-cycle hover |
| White icon on `sage-600` | 4.62:1 | 2.0:1 | Hero-corner circle on hover |
| Selected icon on the solid hero switch | 2.97:1 | 5.30:1 | Hero theme switch and both Labs pill links |

When building something new, keep body copy off `ink-faint`, and give a small eyebrow `sage-700` if it must pass.

---

## 3. Typography Rules

A two-family system: an **editorial display serif** for presence, a **neutral grotesque** for everything functional. Both are variable fonts, self-hosted from this repository (section 10). (Note: this system endorses Inter as the UI and body face. It is the real, intentional choice here, paired against a distinctive serif rather than used as the headline face. The blanket "ban Inter" rule does not apply to this system.)

- **Display: Fraunces** (`--font-display`, optical sizing on). Headings, the brand, the hero names, card titles, the hero-corner title, blockquotes. Weight 500 for headings, 600 for the nav brand, italic 400 for the second half of a name and for blockquotes. Track tight (`-0.02em`, the hero `-0.035em`) and lead tight (`1.05`, the hero `1.02`). Weight and the sage colour drive hierarchy, **not screaming size**.
- **Body and UI: Inter** (`--font-sans`). Body copy, nav, buttons, meta, pills. Weights 400, 450, 500 and 600; 450 is a real step (nav links, pills). Leading `1.6`, antialiased.
- **Mono** (`--font-mono`): the system monospace stack, no webfont.

**Type styles** live in `tokens.json`, named for their job: `hero-split-name` (each stage of the home hero), `article-title`, `section-title`, `card-title`, `lead`, `meta`, `eyebrow`, `tag` and the rest. Large sizes are fluid: the token holds the cap and its usage note the full `clamp()`.

- Headline colour is part of the type system: section and article headings render in **`sage-600`**, not ink. The green *is* the hierarchy cue. Card titles, prose headings and the 404 title stay `ink`.
- Names split in two: the first part `sage-600` upright, the second `ink` italic 400 (with `0.12em` right padding so the italic is not clipped). "Diab Neiroukh" splits at the space; "Ayooby" is "Ayoo" plus an italic "by" with no space.
- **Eyebrow:** the `eyebrow` style, uppercase, `sage-600`, any icon sized `1em`. It labels "Error 404", tag pages and pages that set an `eyebrow` in front matter.
- **Measure caps:** prose `44rem`, leads and heads `60ch`. Keep body lines to about 65 characters.

---

## 4. Component Stylings

### Glass Primitive (the core building block: learn this first)
Every surface is a variation of one frosted-glass recipe. Reuse it; don't reinvent it per component.
- Fill `surface`; `backdrop-filter: blur(20px) saturate(150%)` with its `-webkit-` twin, **always**; a 1px `border-glass` rim; `shadow-glass`; `radius`. Glass that lifts (hovered cards and pager blocks, the stuck navbar, the toast) swaps to `shadow-lift`.
- `shadow-glass` is a layered stack **tinted to the canvas hue**: an inset top line (the rim catching light) over warm-green drops in light, black in dark. Not a generic drop shadow.
- Blur scales with role: 6px hero stage, 10px chips, 14px pills and ghost buttons, 18px cards, 20px the primitive and the toast, 30px the navbar. Glass needs something behind it (the `.aurora`, the mesh gradient); over flat `bg` it reads as a pale box.

### Radius & Shape Scale
`radius-sm` code blocks; `radius` the glass primitive, pager blocks, prose images; `radius-lg` cards; `radius-xl` the hero stage. `radius-pill` for every interactive chip, button, the navbar and its links, tags, the theme switch and the toast. Circles (social chips, the corner circle) use 50%; inline code 0.4rem.

### Buttons
- The ghost button (`.btn.btn--ghost`) is **the only button style**.
- Pill-shaped, `0.7rem 1.25rem`, the `button` style, icon `1.05em`. Fill `surface-2`, `ink` text, `border-glass` rim, 14px blur, no shadow. It pages the blog list: "Newer" and "Older" either side of a `.pill` counter.
- **Tactile, not glowy:** hover lifts `translateY(-2px)` and brightens the fill to `#fff` (dark: `rgba(255, 255, 255, 0.14)`); active is `translateY(0) scale(0.98)`. **No outer glow, no custom cursor.** 0.35s on `--ease`.

### Pills & Tags
- `.pill`: raised glass (`surface-2`, `border-glass`, an inset top highlight), `ink-soft` text in the `pill` style. The blog list's "Page 2 / 3" counter.
- `.tag`: `pill-bg` with `sage-700` text, the `tag` style. Cards show up to three as plain spans (no link inside the card link); a post header lists all of them as links. The **active nav item shares this exact fill** so navigation and taxonomy read as one pill family.

### Navbar (inner pages: sticky glass pill)
- A floating pill on `nav-base` under two sage radials, 30px blur, `border-glass` rim and a tinted shadow, with a drifting frosted sheen (`hero-drift` 24s) clipped beneath the content and a persistent top rim reflection.
- **Scroll behaviour:** past `scrollY > 12` it gets `.is-stuck`: the base solidifies and the shadow deepens to `shadow-lift`. Sticky at `top: 0`, `z-index: 50`.
- The brand is Fraunces (`brand`), its `<b>` first word `sage-600`. Links are `nav-link` in `ink-soft`, hovering to `ink` on a faint white wash; the active link is the sage pill and keeps it on hover.
- **Mobile (760px and below):** the surname collapses to an initial ("N.") and the three-way switch becomes one cycle chip, so the bar stays one row. The home page has no navbar.

### Theme Switcher (3-way: light / system / dark)
- Three icon buttons (sun, monitor, moon) in a group labelled "Colour theme", `aria-pressed` tracked. The choice is stored in `localStorage`; System follows OS changes live.
- **Two surface treatments by context.** On the nav it is a **neutral frosted chip**: the selected (and hovered) option gets `surface-2` and a `sage-700` icon. On the **home hero** it is a **solid sage pill**: `sage-600` with white icons in light, `sage-500` with `#10161f` icons in dark, the selected option on a translucent white (dark: translucent navy) fill. Both are correct. Match the surface to the surroundings.
- **Mobile:** the nav shows one `.theme-cycle` chip with the current preference's icon, cycling light, system, dark; it hovers to `sage-invert`. The hero keeps the three-way pill at every width.
- The second hero stage carries the Labs pill in the same solid style: two links (github, flask) to Ayoo by Labs under one continuous selected fill. It is not a theme control.

### Social Chips
- Circular (`2.7rem`) chips with a **diagonal sheen** (a 140° white gradient), 10px blur, inset rim highlights and a soft lift shadow; the theme switch and cycle chip share this surface. Each chip gets its own GPU layer (`translateZ(0)`, `will-change: transform`) so Safari keeps painting the backdrop filter after the entrance.
- Hover lifts `translateY(-3px)` and the icon turns `sage-invert` (the paler green in light, the deeper green in dark). The glass stays put.

### Cards (glass, content)
- The glass recipe at `radius-lg`, `1.6rem` padding, 18px blur, with a hidden radial sage sheen from the top-right.
- Hover: lift `translateY(-6px)` onto `shadow-lift`, the fill rises to `surface-2`, the sheen fades in, the title turns **`sage-700`**, the foot arrow moves `translate(3px, -3px)`. 0.45s on `--ease`.
- Anatomy: `ink-faint` meta (date, reading time), a `card-title` in `ink`, an `ink-soft` summary, up to three tags, and a `sage-700` "Read post" foot pinned to the bottom. The whole card is one link; nothing clickable inside.

### Prose (long-form: blog post, About)
- Centred, `max-width: 44rem`, the `prose` style with paragraphs in `prose-ink`, rhythm `.prose > * + * { margin-top: 1.35rem }`, `prose-h2` and `prose-h3` in `ink`.
- **Links:** `sage-700`, underlined in `sage-300` that deepens to `sage-600` on hover (offset 3px, 1px thick).
- **Blockquote:** Fraunces italic behind a 3px `sage-400` rule. **Inline code:** `sage-700` on `sage-100`. **Code blocks:** `code-ink` on `code-bg`, `radius-sm`, `shadow-glass`.
- List markers are `sage-500`; images centred at `radius` with `shadow-glass`; `hr` a `border-soft` hairline.

### Article Head, Backlink & Pager
- Post headers are centred at `44rem`: backlink, the `sage-600` `article-title`, an `ink-faint` meta row (date, reading time, author), then the tags. A page swaps backlink and meta for an optional eyebrow and a `lead`.
- **Backlink:** `sage-700` in `link-strong`, led by arrow-left, which nudges `-3px` on hover. "All posts", "Back home". One per page, never underlined.
- **Post pager:** two glass blocks, an `ink-faint` label over an `ink` title. "← Newer" on the left goes to the newer post, "Older →" on the right to the older one (text arrows, not icons). The links are block-level, so the focus ring wraps the whole block; hover lifts a block `translateY(-3px)` onto `shadow-lift`.

### Toast
- A bottom-centre glass pill (`surface-2`, `border-glass`, `shadow-lift`, `ink` text) with `role="status"`. A `[data-coming-soon]` link shows "Coming soon"; it rises 1rem as it fades in and leaves after 2.6s. It takes no clicks or focus, so no links or errors in it.

### States
- **Focus (a11y):** `2px solid` `sage-500`, `3px` offset, `6px` radius on every link, button, input and `[tabindex]` via `:focus-visible`; elements with their own radius keep it, so the ring follows pills and cards. Never remove it.
- **Selection:** `sage-300` background, `sage-700` text.
- **Hover:** tactile: lift, `shadow-lift`, `surface-2`, a heading to `sage-700`. **Pressed:** buttons `scale(0.98)`. No visited states.
- **Empty:** a calm lead line, not an icon dump ("No posts yet, check back soon."). **Not ready:** the "Coming soon" toast.

---

## 5. Layout Principles

- **Container:** `.wrap` caps at `maxw`, centred, `padding-inline: clamp(1.1rem, 4vw, 2.5rem)`.
- **Section rhythm:** `padding-block: clamp(3.5rem, 8vw, 6.5rem)`; section heads (`60ch`) sit `2.75rem` above their content.
- **Grid over flex maths:** card grids are `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))`, `gap: 1.25rem`, collapsing to one column by themselves. **No `calc()` percentage hacks, no fixed "3 equal columns."** Two cards sit left-aligned, not stretched. The blog shows 9 cards a page; pagination appears only past that.
- **Hero composition (signature): the split two-stage hero.** The home page is one `.hero--split` on a `bg` band. One WebGL mesh-gradient canvas sits behind both stages, inside the band and rounded to the stage radius. Over it, two frosted glass stages at `radius-xl` stack one above the other:
  - **Diab Neiroukh** (personal): the theme switch, the name linking to About, the social row, and a "Field notes" corner to the blog. **Ayooby** (company): the Labs pill, email and GitHub chips, and a "Products and services" corner; its name and corner show the "Coming soon" toast for now.
  - Between them a `bg` seam carries four concave fills, so the inner corners stay rounded while the gradient reads as one field.
  - Each corner block is `bg` with two concave SVG masks, so it reads as cut out of the glass: a circle with arrow-up-right, a `corner-title` and an `ink-faint` subtitle. On hover the circle fills `sage-600` with a white icon. It is the stage's counterweight; keep the names centred.
  - Hover a stage with a pointer, or tap its background on touch, and it expands to about 60/40. A second tap collapses it; taps on links and buttons are left alone.
- **No-scroll home:** `body.is-home` is `height: 100dvh; overflow: hidden`, a flex column the hero fills. The landing page never scrolls; inner pages scroll under the sticky nav.
- **Full height uses `100dvh`.** **Never `h-screen` or `100vh`** (the iOS Safari toolbar jump).
- **No overlapping content.** Every element owns a clean zone; only the decorative aurora, gradient and sheens sit behind content, never text over text or text over image.
- **Responsive collapse:** at 760px and below the nav compacts. From 640px up the corner's cut radius grows from 2rem to 3rem. At 620px and below the stage radius and the corner's cut radius drop to 1.75rem and the corner's text hides, leaving the circle. Multi-column becomes single column. No horizontal scroll, ever.

---

## 6. Motion & Interaction

- **Signature easing:** `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, a quick start and a long, soft settle. Use it for *every* transition and animation. No linear easing.
- **Ambient loops** (always on, behind content):
  - **Aurora** (`.aurora`, `position: fixed; z-index: -1`): two blurred radial blobs (`blur(80px)`) drifting on `drift1` **26s** and `drift2` **32s**, `infinite alternate`, over the static washes and the `bg` to `bg-deep` gradient; dimmer in dark.
  - **Hero mesh gradient** (`.hero__gradient`, home only): a Stripe-style WebGL mesh gradient on a `<canvas>`, reading `gradient-color-1` to `gradient-color-4`. When the resolved theme changes it pauses, frees its GL context, respawns the canvas and restarts in the new colours.
  - **Drifting glass sheen:** `hero-drift` **24s** `infinite alternate` on each hero stage and the nav frost. It keeps glass alive without video.
- **Entrances:** `.enter` (`fade-up`, 22px, 0.9s) and `.enter--fade` (`fade-in`), **staggered** by inline `--d` delays (the hero cascades from 0.08s to 0.5s). CSS only, on the home hero and the 404 page. These two are the only entrances.
- **Scroll reveals:** `[data-reveal]` fades up 26px over 0.8s once 8% is in view (IntersectionObserver, observed once; without it everything shows). Grid cards stagger by `--d: (index mod 3) × 0.06s`. Content is hidden only when `html` has the `js` class, which `theme-init.js` sets before first paint, so **pages are fully usable without JavaScript**. Reveals animate the separate `translate` property, leaving `transform` free, so a revealed card still lifts on hover.
- **Micro-interactions:** hover lift (buttons 2px, social chips and pager blocks 3px, cards 6px); press `scale(0.98)` on buttons; arrows nudge (card foot `translate(3px, -3px)`, corner circle `translate(2px, -2px)`, backlink `-3px`, corner chevron `2px`).
- **Performance discipline:** move things **only with `transform` (or `translate`) and `opacity`**. Colour, background and shadow may cross-fade; never animate `top`, `left`, `width` or `height`. The one sanctioned layout animation is the split hero's `flex-grow` (0.45s). Blur and sheen layers get their own GPU layer.
- **Reduced motion (non-negotiable):** under `prefers-reduced-motion: reduce` every animation and transition is cut to `0.01ms`, entrances and reveals show in their final state, smooth scrolling turns off, and the hero sheen drift stops. `main.js` skips WebGL, so the canvas stays visible with its static CSS gradient. Ship this fallback every time.

---

## 7. Anti-Patterns (Banned)

**Universal (kept from the base discipline):**
- No emojis as UI furniture; no purple or blue "AI" neon; no oversaturated accents.
- **No pure black:** `ink` is an off-black in light, and the dark canvas is navy.
- No neon or outer-glow shadows; no gradient text on large headers; no custom mouse cursors.
- No broken Unsplash links: use real assets, `picsum.photos`, or inline SVG.
- No overlapping text or images; no fixed "3 equal cards" feature row; no `calc()` percentage layout hacks.
- No generic placeholder names ("John Doe", "Acme", "Nexus") or fake round stats ("99.99%").
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen"); no filler UI ("Scroll to explore", bouncing chevrons).
- No `h-screen` or `100vh` for full height: use `100dvh`.

**Sage-specific (these protect the identity: break one and it stops being Sage):**
- **Never a second accent hue.** Sage is the only accent hue; no other hues. Everything tonal flows from its ramp.
- **Never an opaque panel where glass belongs.** Panels, cards, chips and buttons use the glass recipe. Opaque fills are kept for the `bg` cut-outs, the `pill-bg` tags and active nav item, the solid hero pills and code blocks.
- **Never an untinted or neutral drop shadow.** Shadows are tinted to the canvas: warm green in light, black in dark. A flat grey `box-shadow` instantly reads as generic.
- **Never move anything with a property other than `transform`, `translate` or `opacity`** (the split hero's `flex-grow` is the one exception), and never ship without the full `prefers-reduced-motion` fallback.
- **Never hide content from readers without JavaScript.** Scope any hidden start state to `.js`, as `[data-reveal]` does.
- **Never drop the dark theme or break accent parity.** Both themes are complete and the sage accent survives the switch. Resolve the theme before first paint: no flash.
- **Never strip the `:focus-visible` sage ring** or the inset rim highlight that gives glass its edge.
- **Don't break the hero composition.** Two stages over one shared gradient, each name centred, each with one faux-cutout corner as its counterweight. No off-centre names, no third stage, no call-to-action button.

---

## 8. Voice & Content

The site speaks in the first person, plainly, in British English ("Colour theme", "Match system theme"). Sentences are short and concrete, with no marketing words.

- Headings are sentence case: "About me", "Field notes", "Products and services", "Browse by tag", "Page not found".
- Leads are one plain sentence: "Notes on building software, design decisions, and whatever I'm learning this week."
- Links and controls are short and literal: "Read post", "All posts", "Back home", "Newer" and "Older" around "Page 2 / 3", "← Newer" and "Older →" between posts.
- Errors are plain: "Error 404", "Page not found", "This page doesn't exist, or it moved." Unfinished destinations say "Coming soon".
- Dates are day, month, year. Cards abbreviate ("12 Nov 2026", "6 min"); post headers spell out ("12 November 2026", "6 min read").
- No exclamation marks. Use real names and real assets.

---

## 9. Iconography & Brand Mark

- **Icons** are 20 Lucide icons (ISC) on a 24px grid at `stroke-width` 1.8, round caps and joins, `stroke="currentColor"`, inlined by the theme's icon partial as `<svg class="ico" aria-hidden="true">`. Set `color`, never a fill; size them in `em` or `rem`.
- The set: social (github, linkedin, twitter, telegram, instagram, mail, globe, rss); theme (sun, monitor, moon); navigation (arrow-up-right, arrow-left, arrow-right, chevron-right); meta (calendar, clock, sparkles, tag); Labs (flask).
- Put the accessible name on the link or button, never the icon. No emoji as icons.
- **Brand mark:** a minimal monoline double-headed eagle after the Eagle of Saladin, with a faintly tinted heraldic shield body. Embed `eagle-mark.svg` inline and colour it with CSS (`sage-700` in light, `sage-600` in dark); the shield tint follows `currentColor`. `eagle-light.svg` and `eagle-dark.svg` are self-contained tiles; the vector is the source of truth for the PNGs. Below about 32px the feather and tail lines blur, but the heads and shield hold.
- The marks are trademarks of Ayooby Ltd and not openly licensed (`LICENCE.md`): reproduce them unmodified, in their own colours, at natural proportions, with clear space. Do not recolour, redraw or animate them.

---

## 10. Source Files

This repository is the single source for Sage.

- `tokens/tokens.json`: every token (31 colours in light and dark, type styles, radius, shadow, spacing) with its usage note. Edit tokens here and nowhere else.
- `tokens/tokens.css`: built from the JSON with `bun run build` (`bun run check` fails when it is stale): the `@font-face` rules, light values on `:root`, dark values on `:root[data-theme="dark"]`. ayoo.by carries this repository as its `branding` submodule and mounts `tokens/`, `fonts/` and `icons/` under `assets/sage/` (`favicons/` goes to the site root); the theme's `main.css` imports `tokens.css` from there.
- `fonts/`: Fraunces (roman and italic) and Inter as variable woff2, latin and latin-ext subsets, under the SIL Open Font Licence (`OFL-Fraunces.txt`, `OFL-Inter.txt`).
- `icons/`: the 20 Lucide SVGs, ISC (`icons/LICENSE`).
- `eagle-*.svg`, `png/` and `favicons/`: the brand mark and its exports.
- `DESIGN.md`: this document, the one prose reference, also published as the Design System's brand book.
