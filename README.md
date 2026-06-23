# Brand Mark: Saladin Double-Headed Eagle

A minimal monoline double-headed eagle, after the **Eagle of Saladin** (the heraldic
eagle of Saladin's standard), recoloured to the site's two palettes. Two outward heads
with a crest-V, a heraldic **shield body with a subtle sage tint**, spread wings, and
a forked tail.

## Files

| File | Use |
|------|-----|
| `eagle-light.svg` | Eagle sage `#51613f` on beige `#f3f0e7`; shield tint `#51613f` @ 0.10 (light scheme) |
| `eagle-dark.svg`  | Eagle sage `#a7bf8f` on navy `#0f1622`; shield tint `#a7bf8f` @ 0.13 (dark scheme) |
| `eagle-mark.svg`  | Transparent; eagle + tint use `fill="currentColor"` (tint @ 0.14): drop in anywhere |
| `png/eagle-{light,dark}-{32,64,180,256,512,1024}.png` | Raster exports (favicon → hero) |

`eagle-mark.svg` is the one to embed inline. Set the colour in CSS; the shield tint
follows automatically via `currentColor`:

```css
.brand-mark { color: var(--sage-700); }      /* light */
[data-theme="dark"] .brand-mark { color: var(--sage-600); }
```

## Notes

- Vector is the source of truth; PNGs are regenerable from the SVGs.
- The shield tint is deliberately faint. It reads as a heraldic field, not a fill.
  At favicon sizes (≤ ~32px) the fine feather/tail lines and the tint blur; the
  heads + shield silhouette still hold.
- Provenance: art-directed across Gemini + Higgsfield + a hand SVG; final form traced
  (potrace) from the chosen "simpler" Gemini concept, then the shield tint was refined
  by hand (Illustrator) to fill the full shield field.

## Favicons

Generated with RealFaviconGenerator (realfavicon-mcp) into the site's root `static/`
(served at `/`, overriding the theme's old `favicon.ico`); `<head>` links live in
`themes/sage/layouts/_partials/head.html`.

- Sources: `eagle-favicon-light.svg` (sage `#51613f`) + `eagle-favicon-dark.svg`
  (sage `#a7bf8f`): transparent marks derived from `eagle-mark.svg` (its `currentColor`
  replaced with the explicit per-scheme sage).
- Output (`static/`): `favicon.svg` (light/dark adaptive via `prefers-color-scheme`),
  `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png` (eagle on beige
  `#f3f0e7`), `web-app-manifest-{192,512}.png`, `site.webmanifest`.
- To regenerate: re-run `realfavicon_generate` with the same two sources →
  `output_dir static/`, `path /`, `background_color`/`theme_color #f3f0e7`.
