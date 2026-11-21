# Favicons

The site's favicon set, generated with RealFaviconGenerator from `eagle-favicon-light.svg` and `eagle-favicon-dark.svg`, and served from the site root.

- `favicon.svg`: cropped tight to the eagle. Adapts to the browser's scheme through `prefers-color-scheme`: `#51613f` in light, `#a7bf8f` in dark.
- `favicon-96x96.png`: 96px raster fallback, light sage `#51613f`, transparent.
- `apple-touch-icon.png`: 180px, light sage `#51613f` on a transparent background.
- `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`: maskable icons for the web app manifest, transparent at the corners.
- `site.webmanifest`: name, short name, maskable icons, `theme_color` and `background_color` `#f3f0e7`, standalone display.
- `favicon.ico` (16, 32 and 48px frames, mid-sage `#7c9067` on transparent, cropped tight) lives in the branding repository's `favicons/` folder only; this store does not take `.ico` files.

Link them in the head as the site does:

```html
<link rel="icon" href="/favicon.ico?v=4" sizes="32x32">
<link rel="icon" href="/favicon.svg?v=4" type="image/svg+xml">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4">
<link rel="manifest" href="/site.webmanifest?v=4">
<meta name="theme-color" content="#f3f0e7">
```

Switch the `theme-color` meta to `#0f1622` when the dark theme is active. To regenerate, rerun RealFaviconGenerator with the same two sources, `background_color` and `theme_color` `#f3f0e7`.
