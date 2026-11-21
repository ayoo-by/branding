# Glass

The frosted panel recipe every Sage surface is built from: a translucent fill, a backdrop blur, a 1px light rim and a tinted shadow.

## Use it for

- Learn this first. Cards, pills, ghost buttons, the toast, the navbar, the social chips and the hero stage all restate this recipe with their own blur, fill, shadow and radius (see the table below).
- A plain panel over the aurora or the hero gradient. On the site the pager blocks (`.pager .glass`) use `.glass` directly.
- A raised state. Inside `.pager` a hovered `.glass` block lifts 3px onto `shadow-lift` and keeps its `surface` fill. The card, which restates the recipe, also fills to `surface-2` on hover.

## Markup

```html
<body>
  <div class="aurora" aria-hidden="true"></div>
  ...
  <div class="glass">
    <!-- your content: .glass adds no padding -->
  </div>
</body>
```

- `.glass` sets `background: surface`, `backdrop-filter: blur(20px) saturate(150%)` with the `-webkit-` prefix, `border: 1px solid border-glass`, `border-radius: radius` (1.25rem) and `box-shadow: shadow-glass`.
- It adds no padding, layout or text colour. The consumer provides those (the pager uses `display: block` and `padding: 1rem 1.25rem`).
- Something must sit behind it to blur: the `.aurora` on every page, or the hero gradient on the home page.

Token values, light then dark:

- `surface`: `rgba(255, 255, 255, 0.5)`, `rgba(255, 255, 255, 0.055)`
- `surface-2`: `rgba(255, 255, 255, 0.68)`, `rgba(255, 255, 255, 0.1)`
- `border-glass`: `rgba(255, 255, 255, 0.7)`, `rgba(255, 255, 255, 0.12)`
- `shadow-glass`: `0 1px 1px rgba(255, 255, 255, 0.55) inset, 0 18px 50px -20px rgba(50, 60, 35, 0.3), 0 4px 14px -8px rgba(50, 60, 35, 0.25)`. Dark swaps the green tint for black: `0 1px 1px rgba(255, 255, 255, 0.06) inset, 0 18px 50px -20px rgba(0, 0, 0, 0.65), 0 4px 14px -8px rgba(0, 0, 0, 0.55)`.
- `shadow-lift`: `0 26px 60px -24px rgba(50, 60, 35, 0.38)`, `0 26px 60px -24px rgba(0, 0, 0, 0.72)`.

## Blur by component

| Surface | `backdrop-filter` | Fill | Shadow | Radius |
|---|---|---|---|---|
| `.glass` | `blur(20px) saturate(150%)` | `surface` | `shadow-glass` | `radius` |
| `.toast` | `blur(20px) saturate(150%)` | `surface-2` | `shadow-lift` | `radius-pill` |
| `.card` | `blur(18px) saturate(150%)` | `surface`, `surface-2` on hover | `shadow-glass`, `shadow-lift` on hover | `radius-lg` |
| `.pill` | `blur(14px) saturate(150%)` | `surface-2` | inset `0 1px 1px #fff9` only | `radius-pill` |
| `.btn--ghost` | `blur(14px) saturate(150%)` | `surface-2` | none | `radius-pill` |
| `.nav__inner` | `blur(30px) saturate(185%)` | `nav-base` under two sage radials | `0 12px 36px -16px #323c236b` (dark `0 14px 38px -16px #0000008c`), `shadow-lift` once stuck | `radius-pill` |
| `.social`, `.theme-switch`, `.theme-cycle` | `blur(10px) saturate(125%)` | 140deg white gradient, `#ffffff8c` to `#ffffff2e` (dark `#ffffff24` to `#ffffff0a`) | `0 4px 12px -8px #323c2338` plus two insets | 50% or `radius-pill` |
| `.hero__stage` | `blur(6px) saturate(140%)` | `#ffffff1f` in the split hero (dark `#0f162229`) | `shadow-glass` | `radius-xl` |

All of them keep the 1px `border-glass` rim except the chips, which draw their edge with inset shadows instead (`inset 0 1px 1px #ffffffd9, inset 0 -5px 9px -7px #5a6e461f`).

## Behaviour

- `.glass` has no hover or transition of its own. The component using it adds them: the pager lifts `translateY(-3px)` to `shadow-lift` over 0.4s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`); the card lifts `translateY(-6px)`, fills to `surface-2` and takes `shadow-lift` over 0.45s.
- Raising replaces `shadow-glass` with `shadow-lift`, so the inset top highlight goes while the panel is raised. That is how the site behaves.
- The chips also set `transform: translateZ(0)` and `will-change: transform` so Safari keeps painting the backdrop filter after their entrance animation.
- There is no `@supports` fallback. Where `backdrop-filter` is unsupported, the translucent fill, rim and shadow still render, unblurred.
- A theme change swaps the tokens at once; fill, rim and shadow do not transition.
- Reduced motion: nothing on the primitive animates. The global rule cuts any consumer transition to 0.01ms.

## Do and don't

- Do build panels from this recipe rather than an opaque fill.
- Do keep the `-webkit-backdrop-filter` line next to every `backdrop-filter`.
- Don't invent a new blur. Pick the row in the table that matches the job.
- Don't swap `shadow-glass` for a neutral grey shadow. It is tinted green-warm in light and black in dark on purpose.
- Don't set glass on flat `bg` alone. With nothing behind it the blur has nothing to show and the panel reads as a pale box.
- Text on `surface` over `bg`: `ink` is 12.0:1 in light and 13.18:1 in dark, `ink-soft` 6.14:1 and 7.28:1. `ink-faint` is 3.07:1 in light and 4.10:1 in dark, under 4.5:1, so keep it to metadata. `sage-600` is 4.33:1 in light, under 4.5:1 for small text such as the 0.78rem eyebrow.
