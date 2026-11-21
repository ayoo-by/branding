# ThemeSwitch

A three-way light, system and dark control, drawn as a frosted segmented pill in the nav and as a solid sage pill on the hero, that folds into a single cycle chip at phone width.

## Use it for

- Choosing the colour theme: inside `.nav__right` on inner pages, inside `.hero__topbar` on the home hero.
- `.theme-cycle`, which replaces the three-way pill inside the nav below 760px.
- `.labs-pill`, the same pill shell holding two links on the second hero stage. It is a link group, not a theme control.

## Markup

```html
<div class="theme-switch" role="group" aria-label="Colour theme">
  <button class="theme-switch__btn" type="button" data-theme-set="light" aria-label="Light theme" title="Light"><svg class="ico" ...>sun</svg></button>
  <button class="theme-switch__btn" type="button" data-theme-set="auto" aria-label="Match system theme" title="System"><svg class="ico" ...>monitor</svg></button>
  <button class="theme-switch__btn" type="button" data-theme-set="dark" aria-label="Dark theme" title="Dark"><svg class="ico" ...>moon</svg></button>
</div>

<button class="theme-cycle" type="button" data-theme-cycle aria-label="Change colour theme">
  <span class="theme-cycle__ico" data-for="light"><svg class="ico" ...>sun</svg></span>
  <span class="theme-cycle__ico" data-for="auto"><svg class="ico" ...>monitor</svg></span>
  <span class="theme-cycle__ico" data-for="dark"><svg class="ico" ...>moon</svg></span>
</button>

<div class="hero__topbar">
  <div class="theme-switch labs-pill" role="group" aria-label="Ayoo by Labs">
    <a class="theme-switch__btn is-active" href="https://github.com/ayoo-by-labs" target="_blank" rel="me noopener" aria-label="Ayoo by Labs on GitHub"><svg class="ico" ...>github</svg></a>
    <a class="theme-switch__btn is-active" href="https://github.com/ayoo-by-labs" target="_blank" rel="me noopener" aria-label="Ayoo by Labs"><svg class="ico" ...>flask</svg></a>
  </div>
</div>
```

- `.theme-switch` is an inline-flex pill: `0.2rem` padding, `0.1rem` gap, `radius-pill`. It shares the chip glass with `.social` and `.theme-cycle`: a 140deg sheen from `#ffffff8c` to `#ffffff2e` (`#ffffff24` to `#ffffff0a` in dark), `backdrop-filter: blur(10px) saturate(125%)`, a soft drop plus two inset rims (`0 4px 12px -8px #323c2338, inset 0 1px 1px #ffffffd9, inset 0 -5px 9px -7px #5a6e461f`) and its own GPU layer (`translateZ(0)`, `will-change: transform`). Its `::after` lays a top rim reflection over the whole pill.
- `.theme-switch__btn` is a 2rem circle with the icon at `1.05rem` in `ink`. The selected one takes `.is-active`: `surface-2` fill, `sage-700` icon, `0 1px 1px #ffffff80` inset.
- Inside `.hero__topbar` the pill goes solid: `sage-600` fill in light, `sage-500` in dark, with a `0 12px 26px -14px #51613fe6` shadow. Icons are `#ffffffb8` in light and `#10161f99` in dark. The selected one gets a `#ffffff3d` (light) or `#10161f2e` (dark) fill with a full `#fff` or `#10161f` icon and no inset.
- `.theme-cycle` is a 2.4rem chip with the icon at `1.1rem`. It holds all three icons; CSS shows only the span whose `data-for` matches `html[data-theme-pref]`, and the sun when the attribute is missing.
- `.labs-pill` drops the gap and squares the inner ends (first button `999px 0 0 999px`, last `0 999px 999px 0`). Both links carry `.is-active`, so they read as one lighter segment.
- You provide the markup, the Lucide-style icons at stroke 1.8, and the two scripts below.

## Behaviour

- Pre-paint script, inline in `<head>` before the stylesheet: first add the `js` class to `<html>` (scroll reveals hide their content only under it). Then, inside a try/catch, take `?theme=` from the URL, else `localStorage` key `"theme"`, else `"auto"`, so with no saved choice the theme follows the OS. Resolve `"auto"` through `prefers-color-scheme: dark`. Set `data-theme` (`light` or `dark`) and `data-theme-pref` (`light`, `auto` or `dark`) on `<html>`, and set `<meta name="theme-color">` to `#0f1622` in dark or `#f3f0e7` in light. This is what stops the flash of the wrong theme.
- Click script: each `.theme-switch__btn[data-theme-set]` applies its preference. It rewrites `data-theme`, `data-theme-pref`, `localStorage` `"theme"` and the `theme-color` meta, and toggles `.is-active` and `aria-pressed` on every switch button on the page. It also runs once on load with the current preference, so the server markup carries no `.is-active` and no `aria-pressed` on the theme buttons. While the preference is `"auto"` it follows live changes to the system scheme. When the resolved theme changes it dispatches a `sage:themechange` event (the hero gradient rebuilds on it).
- Cycle: each press of `[data-theme-cycle]` moves light, then system, then dark, then back to light.
- Hover: in the nav a button takes the selected look (`surface-2`, `sage-700`, inset). On the hero the icon goes to full `#fff` (light) or `#10161f` (dark). The cycle chip's icon turns `sage-invert`. The labs links do not change on hover, since they are already drawn in the selected style. Outside those contexts the buttons have no hover rule. Colour and background ease over 0.3s on `--ease`; the inset shadow is not in the transition list and appears at once.
- Focus: the global ring, 2px solid `sage-500` at a 3px offset. The buttons and the cycle chip set `radius-pill` after the global rule at the same specificity, so the ring follows their circle rather than the global 6px radius. On the labs pill it follows each link's half-pill shape.
- Responsive: below 760px `.nav .theme-switch` hides and `.nav .theme-cycle` shows. The hero pill stays three-way at every width; below 620px the topbar padding tightens to `0.9rem 1rem`.
- Entrance: on the hero the theme pill and the labs pill carry `.enter .enter--fade` and fade in over 0.9s on `--ease`, at `--d: .1s` and `--d: .42s`. In the nav nothing animates on its own.
- Reduced motion: transitions and the entrance drop to 0.01ms and `.enter` is forced to its final state, so the pills show at once.
- Without JavaScript nothing sets `data-theme`, so the base light palette on `:root` applies whatever the OS prefers, and the buttons do nothing.

## Do and don't

- Do match the surface to the surroundings: frosted on the nav, solid sage on the hero.
- Do keep `role="group"` with `aria-label="Colour theme"` on the pill and an `aria-label` on every icon button.
- Do run the pre-paint script before the stylesheet loads.
- Don't put `data-theme-set` on the labs links or use `.labs-pill` as a theme control.
- Don't add labels or a fourth option. The icons and their `title` carry the meaning.
- Solid pill contrast, light: inactive icons (`#ffffffb8` on `sage-600`) 3.25:1, selected (`#fff` on the `#ffffff3d` fill) 2.97:1, which is just under the 3:1 icon floor, hover 4.62:1. The labs pill shows both icons in the selected style, so both sit at 2.97:1. Dark: inactive (`#10161f99` on `sage-500`) 3.32:1, selected 5.29:1, hover 7.31:1.
- Frosted pill contrast: `ink` icons about 11.5 to 12:1 in light and 10 to 13.8:1 in dark; the selected `sage-700` icon about 6.5:1 in light and 5.4 to 7.5:1 in dark, depending on which end of the sheen sits behind it.
- The cycle chip's `sage-invert` hover is about 1.5:1 in light and 1.8 to 2.5:1 in dark on the chip glass: a deliberate flash below the 3:1 floor. On the site it is the chip's only hover cue (there is no lift), so pointer users get little feedback; keyboard users still get the focus ring.
