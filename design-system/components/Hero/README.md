# Hero

The home page's full-height composition: two frosted glass stages split by a seam over a slowly moving mesh gradient, each with a centred name and a faux cut-out corner link.

## Use it for

- The home page, once. The split hero is the whole page: it fills the viewport and the page does not scroll.
- Only in its split form, `.hero--split` inside `body.is-home`. The base `.hero` rules are not a complete composition on their own (see the last Behaviour item).

## Markup

```html
<body class="is-home">
  <div class="aurora" aria-hidden="true"></div>
  <main id="main">
    <section class="hero hero--split">
      <canvas id="hero-gradient" class="hero__gradient" data-hero-gradient aria-hidden="true"></canvas>
      <div class="hero__stage">
        <div class="hero__topbar"><!-- .theme-switch: sun, monitor, moon --></div>
        <div class="hero__head">
          <h1><a class="hero__name" href="/about/" title="About me" aria-label="About Diab Neiroukh"><span class="hero__fn">Diab</span> <span class="hero__ln">Neiroukh</span></a></h1>
          <div class="hero__socials"><div class="socials">...</div></div>
        </div>
        <a class="hero-corner" href="/blog/" aria-label="Field notes">
          <span class="hero-corner__mask hero-corner__mask--top" aria-hidden="true"><svg viewBox="0 0 56 56" preserveAspectRatio="none" fill="none"><path d="M56 56V0C56 30.9279 30.9279 56 0 56H56z" style="fill:var(--bg)"/></svg></span>
          <span class="hero-corner__mask hero-corner__mask--left" aria-hidden="true"><svg viewBox="0 0 56 56" preserveAspectRatio="none" fill="none"><path d="M56 56H0C30.9279 56 56 30.9279 56 0V56z" style="fill:var(--bg)"/></svg></span>
          <span class="hero-corner__circle"><svg class="ico" ...>arrow-up-right</svg></span>
          <span class="hero-corner__info">
            <span class="hero-corner__title">Field notes</span>
            <span class="hero-corner__sub">Latest posts <svg class="ico" ...>chevron-right</svg></span>
          </span>
        </a>
      </div>
      <div class="hero__seam" aria-hidden="true">
        <span class="hero__seam-fill hero__seam-fill--top-bl"></span>
        <span class="hero__seam-fill hero__seam-fill--top-br"></span>
        <span class="hero__seam-fill hero__seam-fill--bot-tl"></span>
        <span class="hero__seam-fill hero__seam-fill--bot-tr"></span>
      </div>
      <div class="hero__stage"><!-- .theme-switch.labs-pill, the "Ayooby" name, "Products and services" --></div>
      <div class="toast" data-toast role="status" aria-live="polite">Coming soon</div>
    </section>
  </main>
</body>
```

- `.hero--split`: `position: relative`, `bg` fill, and `--card-radius: radius-xl` (1.75rem at 620px and below).
- `.hero__gradient`: absolute, inset by `--pad-y` and `--pad-x`, `z-index: 0`, radius `--card-radius`. Its CSS background is the static fallback, `linear-gradient(135deg, gradient-color-3 0%, gradient-color-1 38%, gradient-color-4 70%, gradient-color-2 100%)`. `gradient-color-1` to `-4` are `#b6c3a2`, `#e8ecdf`, `#94a67d`, `#efe9da` in light and `#131c2a`, `#0f1622`, `#1c2738`, `#33452b` in dark.
- `.hero__stage`: centred column flex, `radius-xl`, `overflow: hidden`, `backdrop-filter: blur(6px) saturate(140%)`, 1px `border-glass`, `shadow-glass`. In the split it sits at `z-index: 1` on a `#ffffff1f` fill (dark `#0f162229`). Its `::before` sheen is two sage radials under `blur(30px)`.
- `.hero__topbar`: absolute across the top, right-aligned, `z-index: 4`, padding `clamp(1rem, 2.4vw, 1.6rem) clamp(1.2rem, 3vw, 2.2rem)`. A `.theme-switch` inside turns solid: `sage-600` fill (`sage-500` in dark) with a `0 12px 26px -14px #51613fe6` shadow. Its icons are `#ffffffb8`, white on hover; the active button takes a `#ffffff3d` fill and a white icon. In dark the icons are `#10161f99`, `#10161f` on hover and when active, with a `#10161f2e` active fill.
- `.labs-pill`: the same solid pill with `gap: 0` and square inner ends, holding two `a.theme-switch__btn.is-active` links (github and flask icons) to Ayoo by Labs.
- `.hero__head`: `z-index: 2`, `max-width: 60rem`, padding `0 clamp(1.25rem, 5vw, 2rem)`, centred. The h1 is Fraunces at `letter-spacing: -0.035em` and `line-height: 1.02`, sized `clamp(2.7rem, 6.5vw, 4.2rem)` in the split. `.hero__fn` is `sage-600`; `.hero__ln` is `ink`, italic 400, with `0.12em` right padding so the italic is not clipped. `.hero__name` never underlines.
- The second name is `<span class="hero__fn">Ayoo</span><span class="hero__ln">by</span>` with no space between the spans, so it reads "Ayooby" (its `aria-label`); "Diab Neiroukh" keeps a space.
- `.hero__socials`: `margin-top: 1.8rem` around a `.socials` row of 2.7rem chips.
- `.hero-corner`: absolute at the bottom right, `z-index: 3`, `bg` fill, top-left radius `--cr`, bottom-right radius `radius-xl`. The two masks sit above it and to its left, `--cr` square plus 1px of overlap, and paint concave `bg` curves so the block reads as cut out of the stage. Circle `clamp(2.4rem, 3vw, 3.2rem)` with a `#7c90631a` fill, `border-soft` rim and a 1.2rem `sage-700` arrow-up-right. Title in Fraunces 500 at `clamp(1.05rem, 1.4vw, 1.3rem)`, `ink`; sub line in Inter 0.82rem, `ink-faint`, with a 0.9rem chevron-right.
- `.hero__seam`: a `bg` strip, `flex: 0 0 clamp(0.85rem, 2.2vh, 1.6rem)`, `z-index: 1`. Its four `.hero__seam-fill` squares (`--card-radius` each) paint `bg` outside a quarter circle, so the stage corners next to the seam stay rounded over the continuous gradient.
- The consumer provides the markup, the icons (sun, monitor, moon, mail, github, instagram, linkedin, telegram, flask, arrow-up-right, chevron-right), the copy, `class="is-home"` on `<body>`, and the script for the theme switch, the gradient, the tap-to-expand and the toast. On the site the topbar pills, h1, socials and corner also carry `.enter` with inline `--d` delays for the entrance.

## Behaviour

- No-scroll home: `body.is-home` is `height: 100dvh; overflow: hidden` and a flex column; `main` and `.hero` flex to fill it (`flex: 1; min-height: 0`). `.hero` sets `--pad-y: clamp(1rem, 3vh, 2.25rem)` and `--pad-x: clamp(1.25rem, 4vw, 3rem)` and pads by them, and each stage is `flex: 1`. The preview sets the same on a 720px wrapper.
- Stage grow: stages transition `flex-grow` over 0.45s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`). That animates layout, which the theme otherwise avoids; the stylesheet marks it as a deliberate exception. With a hover-capable pointer (`@media (hover: hover)`) the hovered stage grows to `flex-grow: 1.5`. On touch (`hover: none`) the script toggles `.is-expanded` on the tapped stage, collapses the other, and ignores taps on links, buttons and `[data-coming-soon]`; a second tap collapses it.
- Mesh gradient: unless `prefers-reduced-motion: reduce` matches, the script turns every `[data-hero-gradient]` canvas into a Stripe-style WebGL mesh gradient on its own requestAnimationFrame loop, reading `--gradient-color-1` to `--gradient-color-4` from the canvas's computed style. It skips frames while the tab is hidden. When the resolved theme changes, the theme switch dispatches `sage:themechange`; the gradient pauses, disconnects, calls `WEBGL_lose_context.loseContext()` to free the GPU slot, removes the canvas, inserts a fresh one as the first child of `.hero--split` and starts again with the new colours. Without WebGL or JS the CSS fallback gradient shows, as in the preview.
- Stage sheen: `.hero__stage::before` runs `hero-drift` 24s `infinite alternate` on `--ease`, out to `translate3d(4%, -3%, 0) scale(1.08)`.
- Corner hover: the circle fills `sage-600`, its icon turns white and it moves `translate(2px, -2px)` (fill and colour 0.3s, transform 0.35s); the sub line turns `sage-700` and its chevron nudges `translateX(2px)` (0.3s).
- Corner sizes: `--cr` is 2rem, and 3rem from 640px wide. At 620px and below `--cr` is 1.75rem, the gap 0, the padding 0.85rem and the bottom-right radius 1.75rem, and `.hero-corner__info` is hidden, leaving the circle (the link's `aria-label` still names it). At the same width the stage radius and `--card-radius` drop to 1.75rem and the topbar padding to `0.9rem 1rem`.
- Coming soon: the "Ayooby" name and "Products and services" are `href="#" data-coming-soon`. The click is prevented and the `.toast` shows for 2600ms (see Toast).
- Theme switch: the sun, monitor and moon buttons carry `data-theme-set="light|auto|dark"`. The script sets `data-theme` and `data-theme-pref` on `<html>`, `aria-pressed` and `.is-active` on the buttons, and stores the choice in `localStorage` under `theme`. With nothing stored the preference is `auto`, so the page follows the OS.
- Entrance (site markup): the h1, socials and corner use `.enter` (`fade-up`, 0.9s), the topbar pills `.enter--fade`, staggered by inline `--d` from 0.08s to 0.5s. The preview leaves these off.
- Reduced motion: every animation and transition is cut to 0.01ms, `.enter` content shows at once, the stage sheen stops (`animation: none`) and the WebGL gradient never starts, so the static CSS gradient shows.
- Focus: every link and button shows the global ring, 2px solid `sage-500` at a 3px offset.
- Base rules: without `.hero--split` the h1 falls back to the base `.hero h1` size, `clamp(2.9rem, 9.5vw, 6.8rem)`, and the stage has no fill and no `z-index`. `--card-radius` comes only from `.hero--split` and `--pad-x`/`--pad-y` only from `body.is-home .hero`, so without them the canvas gets no radius, and its top, left, width and height (all built from the pad variables) are dropped.

## Do and don't

- Do keep both heads centred. The corner block is each stage's one counterweight (the topbar pill sits at the top right as a control); don't add a second call to action.
- Do paint the masks, corner, seam and seam fills with `bg`, the same as `.hero--split`, or the cut-out shows its edges.
- Do use `100dvh`, never `100vh`.
- Don't set text straight on the gradient. It belongs on a stage.
- Don't remove the canvas's CSS background: it is the reduced-motion and no-WebGL fallback.
- The `sage-600` first names sit on the gradient. In light, sampled from the static fallback at 390, 960 and 1440px wide, "Diab" measures 2.2 to 2.7:1, under the 3:1 large-text minimum everywhere, and "Ayoo" 3.0 to 3.8:1, at the minimum in places; the WebGL mesh moves through the same colours. Dark measures 5.6 to 8.5:1.
- `hero-corner__sub` in `ink-faint` is 2.87:1 on `bg` in light at 0.82rem (4.70:1 in dark).
- The solid topbar pill in light: idle icons (`#ffffffb8` on `sage-600`) are 3.25:1, active icons on the `#ffffff3d` fill are 2.97:1, and the labs pill shows both of its buttons as active. Dark: idle `#10161f99` on `sage-500` is 3.32:1, active 5.29:1. These leave out the white sheen that `.theme-switch::after` paints over the top of the pill, icons included; under it the light idle icons fall to about 2.6:1 at their top edge.
- Corner circle hover: the white icon on `sage-600` is 4.62:1 in light but 2.0:1 in dark.
- Social chip hover turns icons `sage-invert`: 1.43:1 in light and 2.70:1 in dark against `bg`, and lower over the gradient.
