# Aurora

The fixed ambient background behind every page: a warm vertical gradient, two soft sage washes and two large blurred blobs drifting slowly in opposite corners.

## Use it for

- Once per page, as the first child of `<body>`. Home, Blog and About all carry it.
- The backdrop that glass blurs. Without it, glass over flat `bg` has nothing to show.

## Markup

```html
<body>
  <div class="aurora" aria-hidden="true"></div>
  ...
</body>
```

- Pure CSS, no JS. The consumer provides only the empty element with `aria-hidden="true"`.
- `.aurora` is `position: fixed; inset: 0; z-index: -1; overflow: hidden`.
- Its background stacks three layers, top first:
  - `radial-gradient(120% 120% at 100% 0%, aurora-tint-1, transparent 55%)`, a wash from the top right
  - `radial-gradient(120% 120% at 0% 100%, aurora-tint-2, transparent 50%)`, a wash from the bottom left
  - `linear-gradient(180deg, bg 0%, bg-warm 60%, bg-deep 100%)`
- `::before` is blob 1: a 52vw circle at `top: -12vw; left: -8vw`, filled with `radial-gradient(circle, aurora-blob-1, transparent 70%)`.
- `::after` is blob 2: the same circle at `bottom: -14vw; right: -10vw`, filled with `aurora-blob-2`.
- Both blobs take `filter: blur(80px)`, `opacity: var(--aurora-blob-opacity)` and `will-change: transform`.

Token values, light then dark:

- `aurora-tint-1`: `rgba(124, 144, 99, 0.22)`, `rgba(124, 144, 99, 0.13)`
- `aurora-tint-2`: `rgba(148, 166, 125, 0.26)`, `rgba(148, 166, 125, 0.15)`
- `aurora-blob-1`: `rgba(148, 166, 125, 0.75)`, `rgba(148, 166, 125, 0.5)`
- `aurora-blob-2`: `rgba(124, 144, 99, 0.62)`, `rgba(124, 144, 99, 0.42)`
- `--aurora-blob-opacity`: `0.8`, `0.5` (declared in the theme stylesheet, not in tokens.json)
- `bg`, `bg-warm`, `bg-deep`: `#f3f0e7`, `#efe9da`, `#e9e2cf`; dark `#0f1622`, `#121b29`, `#0b111c`

## Behaviour

- Blob 1 runs `drift1 26s var(--ease) infinite alternate`: out to `translate(14vw, 10vh) scale(1.15)` and back.
- Blob 2 runs `drift2 32s var(--ease) infinite alternate`: out to `translate(-12vw, -8vh) scale(1.2)` and back. Each blob drifts towards the centre and back on its own period.
- `alternate` plays the return leg as the outward leg run backwards, easing included. With `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`) a blob leaves its start quickly, covers about 96% of the path in the first half of the leg and settles slowly at the far point, then eases out of it and speeds back, so it turns sharply at its start position and lingers near the far point. The full cycles are 52s and 64s, so the pair only repeats its arrangement every 832s.
- Only `transform` animates. Sizes and offsets are in vw (the drift also in vh), so the composition scales with the viewport.
- A theme change swaps the tokens at once; there is no cross-fade.
- Reduced motion: the global rule sets `animation-duration: 0.01ms` and `animation-iteration-count: 1`, so each blob finishes at once and rests at its start position. The washes are static either way.

## Do and don't

- Do keep exactly one, first in `<body>`, with `aria-hidden="true"`.
- Don't put content inside it or make it `position: absolute` on a page. The preview does that only to fit the aurora into a frame.
- Don't raise the blob opacity or add a hue. Dark is dimmer on purpose (0.5 against 0.8).
- Don't animate anything but `transform` on the blobs.
- Mind text that crosses a blob core in light. Measured at 1440 by 900, the top-left core is about `#c7cdb4`: `ink` 7.8:1, `ink-soft` 4.0:1, `sage-700` 4.1:1, `sage-600` 2.8:1, `ink-faint` 2.0:1. The bottom-right core (about `#c1c5aa`) is darker: `ink` 7.2:1, `sage-700` 3.8:1, `ink-soft` 3.7:1, `sage-600` 2.6:1, `ink-faint` 1.8:1. In dark the cores keep every ink above 4.5:1 except `ink-faint` (3.4:1).
