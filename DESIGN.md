# Design System: Sage

> A calm, glassmorphic design language: warm beige-white by day, deep navy by night,
> with a single muted sage-green accent carried across both. Frosted-glass surfaces,
> a distinctive serif display face, soft tinted shadows, and slow perpetual motion
> (an animated aurora + a WebGL mesh gradient). Hand-built, zero-framework, fully
> usable without JavaScript.
>
> This document encodes the **ayoo.by** ("Sage") theme as a reusable system for other
> applications. The canonical token source is the theme's `main.css`; everything below
> is transcribed from it and verified against the live render in both modes.

---

## 1. Visual Theme & Atmosphere

Sage feels like a **well-lit ceramics studio on a warm afternoon**: quiet and unhurried.
Surfaces are frosted glass that you can almost feel the cold of; light catches their top
rim. Behind everything, a soft aurora of blurred sage-green blobs drifts in slow motion,
and the home hero carries a living WebGL mesh gradient that breathes. Nothing shouts.
Hierarchy comes from a confident editorial serif, a single desaturated green, and generous
negative space, never from neon or size alone.

The same identity holds in the dark: the warm beige canvas becomes a **deep navy**, but
the sage accent stays (lightened so it still glows against the dark), the glass becomes
a faint luminous film, and the mesh gradient shifts to navy with one muted sage
inflection. It reads as the same room with the lights down, not a different design.

- **Density: 3-4 (Gallery-airy → Daily-app balanced).** Large breathing room, one idea
  per zone, generous section padding. Content-dense pages (prose, card grids) tighten up
  but never crowd.
- **Variance: 4-5 (Composed, lightly asymmetric).** The hero is deliberately **centred**
  (RIVR-style) with one asymmetric counterweight: a faux-cutout corner block carved into
  the bottom-right. Inner pages are calm and centred. This is intentional symmetry, not a
  default; do not force off-axis splits onto it.
- **Motion: 5-6 (Fluid, perpetual, restrained).** Spring-like custom easing everywhere;
  two always-on ambient loops (aurora drift, mesh gradient); entrance fades and scroll
  reveals; tactile press feedback. Always `transform`/`opacity` only, always with a full
  reduced-motion fallback.

---

## 2. Colour Palette & Roles

One palette, two complete modes. **Light is the default**, resolved before first paint
(no flash). Dark keeps the sage accent. Lightening the ramp so green still reads against
navy is a **defining feature**, not an afterthought. Never introduce a second accent hue.

### Light Mode (default: warm beige)

**Surfaces & canvas**
- **Beige-White** (`#f3f0e7`): primary background / canvas
- **Warm Beige** (`#efe9da`): mid background stop (aurora gradient)
- **Deep Beige** (`#e9e2cf`): lowest background stop (aurora gradient)
- **Glass Surface** (`rgba(255,255,255,0.50)`): default frosted card/panel fill
- **Glass Surface Raised** (`rgba(255,255,255,0.68)`): hover/elevated glass, pills, ghost buttons
- **Solid Surface** (`#fbfaf5`): the one opaque off-white, for places glass can't go
- **Nav Glass Base** (`rgba(251,250,245,0.48)`): navbar pill fill (solidifies to `0.84` when stuck)
- **Glass Rim Border** (`rgba(255,255,255,0.70)`): 1px highlight border on all glass
- **Soft Border** (`rgba(60,70,45,0.10)`): hairline dividers, faint structural lines (green-tinted)

**Sage accent ramp** (the only accent: desaturated, saturation well under 80%)
- **Sage 100** (`#e8ecdf`): faintest tint: code-inline bg, subtle fills
- **Sage 200** (`#d3dcc4`): `--pill-bg`: active nav item + tag pills share this fill
- **Sage 300** (`#b6c3a2`): selection highlight, mesh gradient colour 1, underline rest-state
- **Sage 400** (`#94a67d`): blockquote rule, list markers, mesh gradient colour 3
- **Sage 500** (`#7c9063`): **primary accent** (focus rings, marker accents)
- **Sage 600** (`#687b52`): accent text on warm bg: eyebrows, headings, hero first-name, primary button fill
- **Sage 700** (`#51613f`): strongest accent: links, card foot, active pill text, code text

**Ink (text)**
- **Ink** (`#2e342a`): primary text & headings (off-black; **never pure `#000`**)
- **Ink Soft** (`#586051`): secondary text, descriptions, leads
- **Ink Faint** (`#8a917c`): metadata, timestamps, captions
- **Prose Ink** (`#3a4034`): long-form body paragraphs (slightly softened from Ink)
- **Sage Invert** (`#bcd2a2`): the *opposite* mode's accent, used only for social-icon hover

### Dark Mode (deep navy)

**Surfaces & canvas**
- **Deep Navy** (`#0f1622`): primary background / canvas (also `theme-color`)
- **Warm Navy** (`#121b29`): mid background stop
- **Deepest Navy** (`#0b111c`): lowest background stop
- **Glass Surface** (`rgba(255,255,255,0.055)`): default frosted fill (a luminous film, not white)
- **Glass Surface Raised** (`rgba(255,255,255,0.10)`): hover/elevated glass
- **Solid Surface** (`#161f2e`): the one opaque navy panel
- **Nav Glass Base** (`rgba(17,24,37,0.40)`): navbar pill (solidifies to `0.82` when stuck)
- **Glass Rim Border** (`rgba(255,255,255,0.12)`): 1px highlight border on glass
- **Soft Border** (`rgba(255,255,255,0.10)`): hairline dividers

**Sage accent ramp** (lightened so green stays legible on navy)
- **Sage 100** (`#1f2a21`) · **200** (`#2b3a2c`, `--pill-bg`) · **300** (`#41573f`) ·
  **400** (`#7e9770`) · **500** (`#94ac7d`, primary accent) ·
  **600** (`#a7bf8f`, **accent text on navy**) · **700** (`#bcd2a2`, strongest accent)
- **Sage Invert** (`#51613f`): light mode's deep green, for dark social-icon hover

**Ink (text)**
- **Ink** (`#e8ecdf`) · **Ink Soft** (`#a9b3a4`) · **Ink Faint** (`#79838c`) · **Prose body** (`#cdd4c5`)

### Status Colours (both modes)
- **OK / positive**: light `#5f8a55`, dark `#79b06a`
- **Warn**: light `#c79a3e`, dark `#d8b25a`
- **Down / error**: light `#c2654e`, dark `#d97a62`

### Mesh-Gradient Colour Sets (hero canvas; see §6)
- **Light:** `#b6c3a2` · `#e8ecdf` · `#94a67d` · `#efe9da` (three sage tints + one warm beige)
- **Dark:** `#131c2a` · `#0f1622` · `#1c2738` · `#33452b` (three navies + one muted sage inflection)

---

## 3. Typography Rules

A two-family system: an **editorial display serif** for presence, a **neutral grotesque**
for everything functional. (Note: this system endorses Inter as the UI/body face. It is
the real, intentional choice here, paired against a distinctive serif rather than used as
the headline face. The blanket "ban Inter" rule does not apply to this system.)

- **Display: `Fraunces`** (variable, optical-sizing on). Weights 400/500/600; italic 400.
  Headings, brand, hero name, blockquotes, card titles, hero-corner title.
  Track-tight (`letter-spacing: -0.02em`, hero `-0.035em`), tight leading (`1.05`; hero `1.02`),
  weight-driven hierarchy, **not screaming size**. Fallback: `Georgia, "Times New Roman", serif`.
- **Body / UI: `Inter`** (weights 400/450/500/600). All body copy, nav, buttons, meta, pills.
  Relaxed leading (`1.6`), antialiased. Fallback: `ui-sans-serif, system-ui, -apple-system, sans-serif`.
- **Mono: `ui-monospace, "SF Mono", Menlo, monospace`** (no webfont). Inline code, code blocks.

**Scale & measure**
- Hero `h1`: `clamp(2.9rem, 9.5vw, 6.8rem)`, fluid and dominant.
- `h1` (article): `clamp(2.2rem, 6vw, 3.6rem)`; `h2` (section): `clamp(1.9rem, 4.5vw, 3rem)`.
- Card `h3` `1.45rem`; prose `h2` `1.85rem` / `h3` `1.4rem`.
- Body base `1rem`/`1.6`; prose body `1.075rem`; lead `clamp(1.02rem, 1.6vw, 1.18rem)`.
- **Eyebrow:** `0.78rem`, weight 500, `letter-spacing: 0.14em`, uppercase, sage-600.
- **Measure caps:** prose `44rem`, leads/heads `60ch`. Keep body lines ≤ ~65 characters.
- Headline colour is part of the type system: section/article headings render in **sage-600**,
  not ink. The green *is* the hierarchy cue.

---

## 4. Component Stylings

### Glass Primitive (the core building block: learn this first)
Every surface is a variation of one frosted-glass recipe. Reuse it; don't reinvent per component.
- Fill: `--surface` (light `rgba(255,255,255,0.50)` / dark `rgba(255,255,255,0.055)`)
- `backdrop-filter: blur(20px) saturate(150%)` (+ `-webkit-` prefix, always)
- Border: `1px solid` rim highlight (`--border-glass`)
- Shadow: `--shadow-glass`, a layered, **bg-hue-tinted** stack, *not* a generic drop shadow:
  `0 1px 1px rgba(255,255,255,0.55) inset, 0 18px 50px -20px rgba(50,60,35,0.30), 0 4px 14px -8px rgba(50,60,35,0.25)`
  (dark swaps the warm green tint for black: `…rgba(0,0,0,0.65)…`).
- Lift shadow on elevation: `--shadow-lift` `0 26px 60px -24px rgba(50,60,35,0.38)` (dark: black).
- Radius: from the scale below.

### Radius & Shape Scale
`--radius-sm 0.75rem` · `--radius 1.25rem` · `--radius-lg 2rem` · `--radius-xl 2.75rem` ·
**pills/circles `999px`**. Cards use `lg`; the hero stage uses `xl`; all interactive
chips, buttons, nav, tags are fully pill-rounded.

### Buttons
- Pill-shaped (`999px`), Inter 500, `0.7rem 1.25rem`. Icon `1.05em` inline.
- **Primary:** sage fill (`--sage-600`), white text. **Ghost (`.btn--ghost`):** raised glass
  surface, ink text, glass rim border; hover → fills to solid `#fff` (dark: `rgba(255,255,255,0.14)`).
- Interaction: **tactile, not glowy.** Hover `translateY(-2px)`; active `translateY(0) scale(0.98)`.
  **No outer glow, no custom cursor.** Transitions `0.35s` on the signature easing.

### Pills & Tags
- `.pill`: raised-glass status chip, `0.5rem 1rem`, ink-soft text, inset top highlight.
- `.tag`: sage `--pill-bg` fill + sage-700 text, `0.28rem 0.7rem`, `0.75rem`/500. The
  **active nav item shares this exact fill** so navigation and taxonomy read as one pill family.

### Navbar (inner pages: sticky glass pill)
- A floating pill (`999px`), `isolation: isolate`, raised glass over a **two-radial sage-tinted
  base** + a drifting frosted sheen (`.nav__frost::before`, `hero-drift` 24s) clipped beneath the
  content, plus a persistent top **rim reflection** (`::after` white→transparent gradient).
- **Scroll behaviour:** JS adds `.is-stuck` past `scrollY > 12` → base solidifies (`0.84`/`0.82`
  opacity) and shadow deepens to `--shadow-lift`. Sticky at `top:0`, `z-index:50`.
- Brand in Fraunces; the `<b>` first word takes sage-600. Active menu item = sage pill.
- **Mobile (≤760px):** surname collapses to an initial (`Neiroukh`→`N.`), and the 3-way
  switch collapses to a single cycle chip: the whole bar stays one row.

### Theme Switcher (3-way: light / system / dark)
- Segmented pill of three icon buttons (sun / monitor / moon), `aria-pressed` tracked.
- **Two surface treatments by context:** on inner-page nav it's a **neutral frosted-glass**
  pill (selected option → raised glass + sage-700 icon); on the **home hero** it's a
  **solid sage-green** pill (`--sage-600`) with white icons (selected → translucent-white inset).
  Both are correct. Match the surface to the surroundings.
- **Mobile:** one `.theme-cycle` glass chip showing only the current preference's icon,
  cycling light → system → dark; hover tints to the inverse-mode sage.

### Social Chips
- Circular (`2.7rem`, `50%`) frosted-glass chips with a **diagonal sheen** (140° white gradient),
  inset rim highlights, and a soft lift shadow. Each gets its own GPU layer (`translateZ(0)`,
  `will-change: transform`) so Safari keeps painting the backdrop filter after entrance.
- Hover: lift `translateY(-3px)` + icon turns the **inverse mode's sage** (`--sage-invert`):
  light chips flash the brighter dark-green, dark chips the deeper light-green. Glass stays put.

### Cards (glass, content)
- Glass primitive at `--radius-lg` (`2rem`), `1.6rem` padding, column flex, `overflow:hidden`.
- A hidden radial sheen (`::after`, sage tint from the top-right) sits at `opacity:0`.
- Hover: lift `translateY(-6px)` → `--shadow-lift`, fill brightens to raised glass, the radial
  sheen fades in, and the `h3` shifts to **sage-700**; the foot arrow translates `(3px,-3px)`.
- Anatomy: `.card__meta` (icon + date, icon + reading-time, ink-faint) → Fraunces `h3` →
  ink-soft summary → `.tags` → `.card__foot` ("Read post ↗", sage-700, weight 500).

### Prose (long-form: blog post, About)
- Centred, `max-width: 44rem`, `1.075rem`. Vertical rhythm via `* + * { margin-top: 1.35rem }`.
- **Links:** sage-700, underlined with a sage-300 underline that deepens to sage-600 on hover
  (`text-underline-offset: 3px`, `1px` thickness).
- **Blockquote:** Fraunces italic `1.25rem`, ink-soft, `3px` sage-400 left rule.
- **Inline code:** sage-100 bg, sage-700 text, `0.4rem` radius. **Code blocks:** the
  one dark island: `#282c34` bg / `#abb2bf` text (One Dark; Hugo highlight style `onedark`),
  `--radius-sm`, soft glass shadow.
- List markers sage-500; images rounded (`--radius`) with glass shadow; `hr` is a soft-border hairline.

### Pager (prev/next)
- Two glass blocks (`.glass` primitive) side by side; hover lifts `translateY(-3px)` to `--shadow-lift`.
  `<small>` direction label in ink-faint, `<strong>` title in ink. Blog list uses ghost buttons
  + a `.pill` page counter instead.

### States
- **Empty:** a calm lead line, not an icon dump ("No posts yet, check back soon.").
- **Focus (a11y):** `2px solid sage-500` outline, `3px` offset, `6px` radius, on every
  interactive element via `:focus-visible`. Never remove it.

---

## 5. Layout Principles

- **Container:** `--maxw 1180px`, centred; `padding-inline: clamp(1.1rem, 4vw, 2.5rem)`.
- **Section rhythm:** `padding-block: clamp(3.5rem, 8vw, 6.5rem)`.
- **Grid over flex math:** card grid is `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))`,
  `gap: 1.25rem`. It self-collapses to one column on narrow viewports. **No `calc()` %
  hacks, no fixed "3 equal columns."** Two cards sit left-aligned, not stretched.
- **Hero composition (signature):** a single full-bleed glass **stage** at `--radius-xl`,
  `min-height: min(88vh, 780px)`, with a **centred** headline + social row, a top-right
  theme switch, and a **faux-cutout corner** carved into the bottom-right. Two small concave
  SVG masks filled with the page bg make a real corner block (linking to the blog) appear
  cut out of the glass. Keep the hero centred; the corner is its asymmetric counterweight.
- **No-scroll home:** `body.is-home` is `height: 100dvh; overflow: hidden`, flex-column, and
  the hero stage flexes to fill it. The landing page never scrolls. Inner pages scroll normally
  under the sticky nav.
- **Full-height uses `100dvh`** (`min-height` on body, the no-scroll home). **Never `h-screen`/`100vh`**
  (iOS Safari toolbar jump).
- **No overlapping content.** Every element owns a clean zone; the only "overlap" is the
  decorative aurora/sheen behind content (`z-index:-1`/`0`), never text over text or text over image.
- **Responsive collapse:** below ~760px the nav compacts (brand initial + cycle chip); below
  ~620px the hero radius shrinks to `1.75rem` and the corner's text label hides, leaving the icon.
  Multi-column → single column always. No horizontal scroll, ever.

---

## 6. Motion & Interaction

- **Signature easing:** `--ease: cubic-bezier(0.22, 1, 0.36, 1)`: a soft, weighty overshoot.
  Use it for *every* transition. No linear easing.
- **Two perpetual ambient loops** (always on, behind content):
  - **Aurora** (`.aurora`, `position:fixed; z-index:-1`): two large blurred radial blobs
    (`blur(80px)`) drifting on `drift1` **26s** and `drift2` **32s**, both `infinite alternate`,
    over a static radial+linear bg. Intensity is tuned per mode via `--aurora-*` vars (stronger
    in light, dialled back in dark).
  - **Hero mesh gradient** (`.hero__gradient`, home only): a Stripe-style **WebGL mesh gradient**
    on a `<canvas>`, animated via its own rAF loop, reading its four `--gradient-color-1..4`
    CSS vars (distinct light/dark sets). On theme change it tears down (pauses, force-loses the
    GL context to free the GPU slot) and re-inits with the new colours. Server-rendered canvas is
    reused on first paint.
- **Drifting glass sheen:** `hero-drift` **24s** `infinite alternate` on the hero stage `::before`
  and the nav frost. Keeps glass feeling alive without video.
- **Entrance animations:** `fade-up` (0.9s), `scale-in`, `fade-in` via `.enter` / `.enter--scale`
  / `.enter--fade`, **staggered** with inline `--d` delays (hero elements cascade `.08s → .62s`).
- **Scroll reveals:** `[data-reveal]` starts at `opacity:0; translateY(26px)` and transitions to
  visible (`is-visible`) via an **IntersectionObserver** (`threshold: 0.08`, observe-once). Cards
  stagger by column with `--d: {col * 0.06}s` for a waterfall.
- **Micro-interactions:** hover **lift** `translateY(-2px … -6px)` on buttons/chips/cards;
  **tactile press** `scale(0.98)` on active; arrows nudge on hover (`translate(3px,-3px)` /
  `translateX(±2-3px)`); card heading shifts to sage on hover.
- **Performance discipline:** animate **only `transform` and `opacity`**. Blur/sheen layers get
  their own GPU layer (`transform: translateZ(0)`, `will-change: transform`). Never animate
  `top/left/width/height`.
- **Reduced motion (non-negotiable):** `@media (prefers-reduced-motion: reduce)` cuts all
  animation/transition to `0.01ms`, forces `.enter`/`[data-reveal]` to their final visible state,
  **hides the WebGL canvas** (the static radial bg shows instead), and stops the drift sheen.
  JS skips WebGL init entirely under reduced motion. Ship this fallback every time.

---

## 7. Anti-Patterns (Banned)

**Universal (kept from the base discipline):**
- No emojis as UI furniture; no purple/blue "AI" neon; no oversaturated accents.
- **No pure black**: Ink is `#2e342a` (light) / canvas is navy `#0f1622` (dark).
- No neon or outer-glow shadows; no gradient text on large headers; no custom mouse cursors.
- No broken Unsplash links: use real assets, `picsum.photos`, or inline SVG.
- No overlapping text/images; no fixed "3 equal cards" feature row; no `calc()` % layout hacks.
- No generic placeholder names ("John Doe", "Acme", "Nexus") or fake round stats ("99.99%").
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen"); no filler UI
  ("Scroll to explore", bouncing chevrons).
- No `h-screen`/`100vh` for full-height: use `100dvh`.

**Sage-specific (these protect the identity: break one and it stops being Sage):**
- **Never a second accent hue.** Sage is the only accent; everything tonal flows from its ramp.
  Status colours (ok/warn/down) are the *only* other hues, and only for status.
- **Never a solid opaque surface where a glass one belongs.** Default to the glass primitive
  (`--surface` + `backdrop-filter`); the lone solid surface tokens exist for genuine exceptions.
- **Never an untinted/neutral drop shadow.** Shadows are tinted to the bg hue: green-warm in
  light, black in dark. A flat grey `box-shadow` instantly reads as generic.
- **Never animate a property other than `transform`/`opacity`.** And never ship without the full
  `prefers-reduced-motion` fallback (including hiding the WebGL canvas).
- **Never drop the dark mode or break accent parity.** Both modes are complete and the sage
  accent must survive the switch (lightened on navy). Resolve theme pre-paint: no flash.
- **Never strip the `:focus-visible` sage ring** or the inset rim highlight that gives glass its edge.
- **Don't force the hero off-centre** or add a second primary CTA: the centred hero + single
  faux-cutout corner *is* the composition.

> **Dual-mode by design:** every token ships in two complete sets, **light (warm beige)** and
> **dark (deep navy)**, sharing one lightness-adapted sage accent. The canonical, authoritative
> source for all tokens, components, and motion is the theme's `themes/sage/assets/css/main.css`.
