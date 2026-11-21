# Button

A pill-shaped ghost link on raised glass, which the theme uses only for the Newer and Older links that page through the blog list.

## Use it for

- Paging the blog list (`layouts/blog/section.html`): Newer with an `arrow-left` icon before it and Older with an `arrow-right` icon after it, either side of the `.pill` page counter.
- The nav appears only when the list has more than one page. `hugo.toml` sets `pagerSize = 9`, so it shows from the tenth post. Newer is left out on page 1 and Older on the last page.
- Not for moving between single posts. That is the Pager's glass blocks.
- `.btn--ghost` is the only variant the theme defines.

## Markup

```html
<nav class="pager" style="justify-content:center;gap:0.6rem;margin-top:2.5rem" aria-label="Pagination">
  <a class="btn btn--ghost" href="/blog/"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Newer</a>
  <span class="pill">Page 2 / 3</span>
  <a class="btn btn--ghost" href="/blog/page/3/">Older <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
</nav>
```

- The hrefs are the paginator's `$paginator.Prev.URL` and `$paginator.Next.URL`: page 1 is `/blog/`, then `/blog/page/2/` and on. Each link is written only when `HasPrev` or `HasNext` is true.
- The icons come from the icon partial (Lucide paths, stroke 1.8), separated from the word by a space.
- `.btn` is the base: `inline-flex`, `align-items: center`, `0.7rem 1.25rem` padding, `radius-pill`, Inter 500 at `0.95rem` (the `button` text style) and a `0.55rem` gap. It paints no fill by itself.
- `.btn--ghost` adds the glass: `surface-2` fill, `ink` text, a 1px `border-glass` rim and `backdrop-filter: blur(14px) saturate(150%)` with the `-webkit-` prefix. It has no shadow.
- `.btn .ico` sizes the icon to `1.05em` square.
- The nav reuses `.pager`; the inline style overrides three of its values: centred instead of `space-between`, a `0.6rem` gap instead of 1rem, and a `2.5rem` top margin instead of 3rem. `max-width: 44rem` and `margin-inline: auto` still apply.
- The copy is fixed in the template. The consumer provides only the page URLs.

## Behaviour

- Width: each button is a direct child of `.pager`, so `.pager a { flex: 1 }`, written for the post pager, applies here. The buttons share what the pill leaves in the 44rem row equally (293px each at the full 704px, beside a 100px pill), and the label sits at the left of each stretched pill because `.btn` sets no `justify-content`. On page 1 or the last page the one button takes all the remaining width. The post pager's `.pager > div > a { display: block; }` does not reach these links, which sit directly in the `nav`, so they stay `inline-flex`.
- Height: 48.7px. The pill beside it stretches to the same height.
- Hover: lifts `translateY(-2px)` and the fill brightens: to solid `#fff` in light, and to `rgba(255, 255, 255, 0.14)` in dark, which stays translucent.
- Active: `translateY(0) scale(0.98)`.
- Transform, background, box-shadow and colour transition over 0.35s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), with `will-change: transform`.
- Focus: the global ring, 2px solid `sage-500` with a 3px offset. The ring rule's 6px radius loses to `.btn`'s `radius-pill` (same specificity, later in the file), so the ring follows the pill.
- Reduced motion: transitions drop to 0.01ms, so lift and press happen at once.
- Responsive: no breakpoints. At a 320px viewport (285px row) the three items still share one row; the buttons sit at their minimum width and the pill's text wraps to two lines, so the row grows to about 62px. From 360px it fits on one line.

## Do and don't

- Do keep it tactile: lift and press, nothing else. No outer glow, coloured shadow or custom cursor.
- Do keep the icon on the outer edge: `arrow-left` before Newer, `arrow-right` after Older.
- Do put it over the `.aurora` or another glass layer, so the blur has something to show.
- Don't fill it with sage. The ghost glass is the only button style.
- Contrast holds: `ink` on `surface-2` is 12.28:1 in light and 11.48:1 in dark, and on the hover fill 12.80:1 and 10.03:1 (over flat `bg`).
