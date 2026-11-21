# Pill

A small raised-glass chip that the theme uses only as the blog list's page counter, "Page 2 / 3".

## Use it for

- The page counter between the Newer and Older ghost buttons in the blog list's pagination nav (`layouts/blog/section.html`). It is written whenever that nav is, which is when the list has more than one page at 9 posts per page, including the first and last page.
- That counter is the theme's only `.pill`.
- Not for actions. A pill has no hover, focus or press state; use the ghost Button.
- Not for post topics. Those are Tags.
- Not the "Ayoo by Labs" control in the home hero top bar. That is a `.theme-switch.labs-pill` group of two links, documented with ThemeSwitch and Hero.

## Markup

```html
<nav class="pager" style="justify-content:center;gap:0.6rem;margin-top:2.5rem" aria-label="Pagination">
  <a class="btn btn--ghost" href="/blog/">...</a>
  <span class="pill">Page 2 / 3</span>
  <a class="btn btn--ghost" href="/blog/page/3/">...</a>
</nav>
```

- The template writes `Page {{ $paginator.PageNumber }} / {{ $paginator.TotalPages }}`: the word "Page", the current number, a slash with a space either side, and the total.
- `.pill` is `inline-flex`, vertically centred, with a `0.55rem` gap and `0.5rem 1rem` padding at `radius-pill`.
- Fill and edge: `surface-2`, `backdrop-filter: blur(14px) saturate(150%)` with the `-webkit-` prefix, a 1px `border-glass` rim and an inset top highlight, `box-shadow: 0 1px 1px rgba(255, 255, 255, 0.6) inset`. It has no drop shadow.
- Text: Inter 450 at `0.85rem` (the `pill` text style) in `ink-soft`.
- The glass recipe is the ghost Button's (`surface-2`, blur 14px, the same rim), so the counter and the buttons read as one set. The pill is smaller, quieter (`ink-soft` against `ink`) and does not move.
- The copy comes from the paginator; the consumer provides nothing. Keep it text only: the stylesheet has no `.pill .ico` rule, so an icon would need a size rule in the theme first.

## Behaviour

- Static: no hover, focus, pressed or transition rules.
- Size: about 100px by 40px on its own. In the nav it is a flex item under the default `align-items: stretch`, so it grows to the buttons' 48.7px height and its own `align-items: center` keeps the text in the middle. `.pager a { flex: 1 }` targets links, so the pill keeps its content width while the buttons stretch either side.
- The number is rendered per page on the server; nothing changes it live, so it needs no live region.
- Theme change swaps the fill, rim and text at once. The inset highlight is white at 60% in both themes: the stylesheet has no dark override, so in dark the pill's top edge is brighter than the 6% inset in `shadow-glass` on cards.
- Reduced motion: nothing to reduce.
- Responsive: no breakpoints and no `white-space: nowrap`. At a 320px viewport the buttons reach their minimum width and the counter wraps to two lines inside the pill; from 360px it stays on one line.

## Do and don't

- Do keep the counter's format exactly: "Page 2 / 3", not "Page 2 of 3".
- Do keep the pill over the `.aurora` or another glass layer, so the blur has something to show.
- Don't make a pill a link or a button, and don't add a hover lift to fake one.
- Don't fill a pill with sage. A sage fill means a tag or the active nav item.
- Don't add a dot or an icon from a page stylesheet. The theme has no rules for either inside a pill.
- Contrast holds: `ink-soft` on `surface-2` is 6.28:1 in light and 6.35:1 in dark (over flat `bg`).
