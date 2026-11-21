# Navbar

A floating glass pill at the top of every inner page that holds the brand, the page links and the theme switch, and turns near-opaque once the page scrolls.

## Use it for

- The top of inner pages (Blog, About, a post). The home page has no navbar: its hero carries the theme switch and the links.
- Two or three top-level links. The current page gets the sage pill.

## Markup

```html
<nav class="nav" aria-label="Primary">
  <div class="wrap">
    <div class="nav__inner">
      <span class="nav__frost" aria-hidden="true"></span>
      <a class="nav__brand" href="/"><b>Diab</b> <span class="nav__brand-ln">N<span class="nav__brand-rest">eiroukh</span></span></a>
      <div class="nav__menu" id="nav-menu">
        <a href="/blog/" class="is-active" aria-current="page">Blog</a>
        <a href="/about/">About</a>
      </div>
      <div class="nav__right">
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
      </div>
    </div>
  </div>
</nav>
```

- `.nav` is sticky at top 0, z-index 50. The `.wrap` inside caps it at `maxw` (1180px) with `clamp(1.1rem, 4vw, 2.5rem)` side padding.
- `.nav__inner` is the pill: flex with space-between, a 1rem gap, `0.85rem` block margin, `0.5rem 0.6rem 0.5rem 1.25rem` padding, `radius-pill` and `isolation: isolate`. Its fill is two sage radial tints (`rgba(148, 166, 125, 0.26)` from the top right, `rgba(124, 144, 99, 0.18)` from the bottom left) over `nav-base`, frosted with `backdrop-filter: blur(30px) saturate(185%)`, a 1px `border-glass` rim, and a tinted shadow (`0 12px 36px -16px #323c236b` in light, `0 14px 38px -16px #0000008c` in dark).
- `.nav__frost` is an empty, `aria-hidden` span placed first. It sits behind the content (z-index -1, clipped to the pill) and carries the drifting frost (`::before`) and the rim reflection (`::after`, white at 0.5 fading out by 60% in light, 0.14 fading out by 64% in dark).
- `.nav__brand` is Fraunces 600 at `1.15rem`, `-0.02em` (the `brand` text style). The `<b>` first name takes `sage-600`. Wrap everything after the surname's initial in `.nav__brand-rest` so it can collapse.
- `.nav__menu a` is Inter 450 at `0.92rem` (the `nav-link` style) in `ink-soft`, padded `0.45rem 0.9rem` on `radius-pill`. The current page takes `.is-active` and `aria-current="page"`: `sage-700` text on `pill-bg`, weight 500.
- `.nav__right` (flex, `0.45rem` gap) holds the three-way `.theme-switch` and the mobile `.theme-cycle`. See ThemeSwitch for their markup and script.
- You provide the markup, the sun, monitor and moon icons, the link copy, a backdrop behind the page (the `.aurora`) and two scripts: the `.is-stuck` toggle below and the theme script described in ThemeSwitch.

## Behaviour

- Stuck: a passive scroll listener toggles `.is-stuck` on `.nav` whenever `window.scrollY > 12`, and runs once on load. Stuck sets `nav-base` to `rgba(251, 250, 245, 0.84)` in light and `rgba(17, 24, 37, 0.82)` in dark (from 0.48 and 0.40 at rest) and the shadow to `shadow-lift`. The shadow eases over 0.4s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`); the base is not in the transition list, so it changes at once.
- Frost: `.nav__frost::before` is two blurred sage blobs (`blur(18px)`, inset -120%) on `hero-drift`, 24s, `infinite alternate`, moving to `translate3d(4%, -3%, 0) scale(1.08)`.
- Link hover: `ink` text on `#fff9` in light, `#ffffff14` in dark; background and colour ease over 0.3s. The active link does not react: it keeps `pill-bg` and its `sage-700` text on hover.
- Switch hover inside the nav: `surface-2` fill, `sage-700` icon and a `0 1px 1px #ffffff80` inset, the same look as the selected button.
- Below 760px: `.nav__brand-rest` hides and `.nav__brand-ln::after` adds a full stop (Neiroukh becomes "N."), the three-way switch hides and the 2.4rem `.theme-cycle` chip shows, padding tightens to `0.4rem 0.55rem 0.4rem 1rem` with a `0.4rem` gap, the menu gap drops to `0.1rem` and links pad `0.4rem 0.7rem`. The bar stays on one row.
- Focus: the global ring, 2px solid `sage-500` at a 3px offset, on every link and button. Its 6px radius only shows on the brand link: the menu links, the switch buttons and the cycle chip set their own `radius-pill`, which outranks the global rule or comes after it in the stylesheet, so the ring keeps their pill or circle shape.
- Reduced motion: the global rule cuts every animation and transition to 0.01ms with one iteration, so the frost stops drifting and the stuck shadow changes at once.

## Do and don't

- Do keep a moving backdrop (the `.aurora`) behind the page. Without one the frost and the blur have nothing to work on and the pill reads as a flat bar.
- Do mark the current page with both `.is-active` and `aria-current="page"`.
- Don't add a menu button or a second row. Keep the links few enough to fit beside the brand at phone width.
- Don't swap the tinted shadow for a neutral grey one, and don't drop the rim reflection or the inset rims on the switch.
- Don't animate the pill's size or position when it sticks: only the base opacity and the shadow change.
- The "Diab" first name in `sage-600` fails 4.5:1 in light. Over the bare `nav-base` it reaches 4.23:1 (4.36:1 stuck); with the nav's own bottom-left tint and frost behind it, about 3.8:1; over the aurora's top-left blob, which sits right behind the brand, about 3.4:1. At `1.15rem` semibold it is just under the large-text size, so 4.5:1 applies. Dark stays between about 6.4:1 and 9:1.
- Menu links in `ink-soft` give about 5.5 to 6:1 in light and 7.1 to 8.3:1 in dark, depending on how much of the top-right tint is behind them. The active link (`sage-700` on the opaque `pill-bg`) gives 4.73:1 light and 9.12:1 dark.
- DESIGN.md lists the dark `pill-bg` as `#2b3a2c`. The stylesheet uses `#1f2a21` (the same value as dark `sage-100`), and this system follows the stylesheet.
