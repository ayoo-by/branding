# Ayooby Branding

The single source of the Ayooby brand: the eagle mark, the favicons, and Sage, the
design system behind ayoo.by. Consumers (the ayoo.by site, the Sage Design System
artifact) take their values from here and never restate them.

| Path | What |
| --- | --- |
| `DESIGN.md` | Sage: intent, usage rules and anti-patterns. Values are named by token. |
| `tokens/tokens.json` | Every design token (colours in light and dark, type styles, radii, shadows, spacing), with a usage note on each. |
| `tokens/tokens.css` | Built from `tokens.json`. Custom properties plus the font faces; import it, don't edit it. |
| `fonts/` | Variable Fraunces and Inter (latin, latin-ext), SIL Open Font Licence. |
| `icons/` | The 20 Lucide icons Sage uses, stroke 1.8, ISC licence. |
| `eagle-*.svg`, `png/` | The brand mark. |
| `favicons/` | Favicon set for sites. |
| `design-system/` | Component guidelines and previews for the Design System artifact. |
| `scripts/` | The Bun build. |

## Build

```bash
bun run build
```

Regenerates `tokens/tokens.css` after a change to `tokens/tokens.json`. Commit both.

```bash
bun run check
```

Fails when `tokens/tokens.css` is stale or a token is invalid (bad name, duplicate,
unparseable colour, missing usage note, missing font file). Run it before tagging.

```bash
bun run design-system --theme ../ayoo.by/themes/sage
```

Assembles the Design System artifact's files in `dist/design-system/` from this
repository and the ayoo.by theme. Ask Claude Code to publish that folder to the
artifact; the page is read-only, so every change starts here.

## Use the tokens

Import `tokens/tokens.css` and use the custom properties (`var(--sage-600)`,
`var(--shadow-glass)`, `var(--font-display)`). It sets the light values on `:root`
and the dark ones on `:root[data-theme="dark"]`, and loads the fonts from
`../fonts/`, so keep `tokens/` and `fonts/` side by side.

ayoo.by does this through its `branding` submodule and Hugo mounts:

```toml
[[module.mounts]]
  source = 'branding/tokens'
  target = 'assets/sage/tokens'
[[module.mounts]]
  source = 'branding/fonts'
  target = 'assets/sage/fonts'
[[module.mounts]]
  source = 'branding/icons'
  target = 'assets/sage/icons'
```

Bump the submodule to pick up a change: `git submodule update --remote branding`.

## Brand mark: Saladin double-headed eagle

A minimal monoline double-headed eagle, after the **Eagle of Saladin** (the heraldic
eagle of Saladin's standard), recoloured to the site's two palettes. Two outward heads
with a crest-V, a heraldic **shield body with a subtle sage tint**, spread wings, and
a forked tail.

| File | Use |
|------|-----|
| `eagle-light.svg` | Eagle sage `#51613f` (`sage-700`) on beige `#f3f0e7` (`bg`); shield tint @ 0.10 (light scheme) |
| `eagle-dark.svg`  | Eagle sage `#a7bf8f` (`sage-600`) on navy `#0f1622` (`bg`); shield tint @ 0.13 (dark scheme) |
| `eagle-mark.svg`  | Transparent; eagle + tint use `fill="currentColor"` (tint @ 0.14): drop in anywhere |
| `png/eagle-{light,dark}-{32,64,180,256,512,1024}.png` | Raster exports (favicon → hero) |

`eagle-mark.svg` is the one to embed inline. Set the colour in CSS; the shield tint
follows automatically via `currentColor`:

```css
.brand-mark { color: var(--sage-700); }      /* light */
[data-theme="dark"] .brand-mark { color: var(--sage-600); }
```

- Vector is the source of truth; PNGs are regenerable from the SVGs.
- The shield tint is deliberately faint. It reads as a heraldic field, not a fill.
  At favicon sizes (≤ ~32px) the fine feather/tail lines and the tint blur; the
  heads + shield silhouette still hold.
- Provenance: art-directed across Gemini + Higgsfield + a hand SVG; final form traced
  (potrace) from the chosen "simpler" Gemini concept, then the shield tint was refined
  by hand (Illustrator) to fill the full shield field.

## Favicons

Generated with RealFaviconGenerator (realfavicon-mcp); ayoo.by serves `favicons/`
from its site root through the `branding` submodule, and its `<head>` links live in
`themes/sage/layouts/_partials/head.html`.

- Sources: `eagle-favicon-light.svg` (sage `#51613f`) + `eagle-favicon-dark.svg`
  (sage `#a7bf8f`): transparent marks derived from `eagle-mark.svg` (its `currentColor`
  replaced with the explicit per-scheme sage).
- `favicon.svg`: light/dark adaptive via `prefers-color-scheme`, transparent, cropped
  tight to the eagle.
- `favicon.ico`: 16, 32 and 48px frames in mid-sage `#7c9067` (between the light and
  dark eagles), transparent, cropped tight. It can't follow the colour scheme, so it
  takes the midpoint.
- `favicon-96x96.png`, `apple-touch-icon.png`, `web-app-manifest-{192,512}.png`: light
  sage `#51613f` on transparent.
- `site.webmanifest`: `background_color` and `theme_color` `#f3f0e7`.
- To regenerate: re-run `realfavicon_generate` with the same two sources →
  `output_dir static/`, `path /`, `background_color`/`theme_color #f3f0e7`, then
  re-crop `favicon.svg` tight to the eagle and rebuild `favicon.ico` in mid-sage:
  the generator's own output is neither.

## Licences

The brand mark, wordmark and other Ayooby brand assets are not openly licensed: see
`LICENCE.md`. Third-party files keep their own licences: `fonts/` (SIL Open Font
Licence 1.1, `fonts/OFL-*.txt`) and `icons/` (ISC, `icons/LICENSE`).
