# Card

A glass link panel for one post in a `.grid.grid--3`: date and reading time, a Fraunces title, a summary, up to three tags and a "Read post" foot.

## Use it for

- The blog list (`layouts/blog/section.html`): nine cards per page (`pagerSize = 9` in `hugo.toml`), with the pagination nav under the grid once there is more than one page. See Pager.
- A tag's own page (`layouts/term.html`) and any section without its own layout (`layouts/section.html`). Both use a variant, below.
- One destination per card. The whole card is the link.
- Not for static panels with no destination. Use `.glass` for those.

## Markup

The blog list card, as `blog/section.html` renders it:

```html
<div class="grid grid--3">
  <a class="card" href="/blog/running-http3-on-a-hardened-nginx/" data-reveal style="--d:0s">
    <div class="card__meta">
      <span class="mi"><svg class="ico" ...><!-- calendar --></svg> 12 Nov 2026</span>
      <span class="mi"><svg class="ico" ...><!-- clock --></svg> 6 min</span>
    </div>
    <h3>Running HTTP/3 on a hardened NGINX</h3>
    <p>What it took to turn on QUIC in zestginx, and the defaults I changed along the way.</p>
    <div class="tags"><span class="tag">nginx</span><span class="tag">security</span><span class="tag">networking</span></div>
    <span class="card__foot">Read post <svg class="ico" ...><!-- arrow-up-right --></svg></span>
  </a>
  <a class="card" href="..." data-reveal style="--d:0.06s">...</a>
  <a class="card" href="..." data-reveal style="--d:0.12s">...</a>
</div>
```

- Each icon is the theme's icon partial, `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` around the Lucide paths for `calendar`, `clock` and `arrow-up-right`. A space separates each icon from its text.
- The date is `.Date.Format "2 Jan 2006"`, so "12 Nov 2026", as plain text with no `<time>` element. The reading time is Hugo's `.ReadingTime` and " min", so "6 min". The post page writes "6 min read".
- The summary is `.Summary | plainify | truncate 140`. Past 140 characters Hugo cuts at a word boundary and appends " …" (a space and U+2026).
- The tags are the first three values of the post's `tags`, exactly as written in front matter, each a `span.tag`. The row is left out when a post has no tags. See Tag.
- `--d` is `(index mod 3) x 0.06s` on the page: `0s`, `0.06s`, `0.12s`, then `0s` again.

The term page card (`term.html`) is the same minus the `.tags` row, with the summary cut at 130 characters instead of 140.

The generic section card (`section.html`) has no meta, no tags and no `--d`, and its foot says "Open":

```html
<a class="card" href="/notes/first-note/" data-reveal>
  <h3>First note</h3>
  <p>Summary, cut at 140 characters.</p>
  <span class="card__foot">Open <svg class="ico" ...><!-- arrow-up-right --></svg></span>
</a>
```

The site has no section that uses it today. Its `h3` keeps the `0.85rem` top margin, so the title starts `2.45rem` inside the card's top rim.

Styles:

- `.card` is a column flexbox: `1.6rem` padding, `radius-lg` (2rem), `surface` fill, `backdrop-filter: blur(18px) saturate(150%)` with the `-webkit-` prefix, a 1px `border-glass` rim, `shadow-glass`, `overflow: hidden`. `a.card` sets `color: inherit`.
- `.card:after` is a hidden sheen over the whole card: `radial-gradient(60% 80% at 100% 0%, rgba(148, 166, 125, 0.18), transparent 60%)` at `opacity: 0`, `pointer-events: none`. The tint is light `sage-400` written as a literal, so dark mode keeps it too.
- `.card__meta` is a wrapping flex row with a `0.75rem` gap, Inter 400 at `0.82rem` (the `meta` style) in `ink-faint`. Each `.mi` is inline-flex with a `0.35rem` gap; its icon is `0.95em` square.
- `h3` is Fraunces 500 at `1.45rem` (the `card-title` style) in `ink`, with `0.85rem` above and `0.5rem` below.
- `p` is the summary, `ink-soft` at `0.96rem` (the `card-summary` style).
- `.card__foot` takes `margin-top: auto`, so it sits on the bottom edge and lines up across a row. `1.1rem` top padding, `0.5rem` gap, Inter 500 at `0.92rem` in `sage-700`, a `1em` icon.
- `.grid` is a grid with a `1.25rem` gap; `.grid--3` sets `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))`. Rows stretch, so cards in a row share a height.
- You provide the link, title, date, reading time, summary and tags. The theme's `main.js` provides the reveal.

## Behaviour

- Hover, as the site shows it: the fill rises to `surface-2` and `shadow-glass` gives way to `shadow-lift`, both at once; the sheen fades to `opacity: 1` over 0.45s, the title turns `sage-700` over 0.3s and the foot arrow moves `translate(3px, -3px)` over 0.35s, all on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`). The card does not move.
- Why: `.card:hover` also sets `translateY(-6px)`, and `.card` transitions transform, box-shadow and background over 0.45s. But every card the templates render carries `data-reveal`, and the reveal rules come later in the stylesheet at equal specificity. `[data-reveal]` replaces the card's `transition` with `opacity 0.8s` and `transform 0.8s`, so the shadow and fill swap with no transition, and `[data-reveal].is-visible` sets `transform: none`, which beats `.card:hover`, so the lift never shows. Measured in Chromium on a Hugo build of the theme. DESIGN.md describes the 6px lift; the code wins.
- A rule that outranks the reveal, such as `.card.is-visible:hover { transform: translateY(-6px); }`, brings the lift back. It then runs on the reveal's 0.8s transform transition, after the card's `--d` delay.
- Focus: the global ring, 2px solid `sage-500` at a 3px offset. Its 6px radius and `.card`'s `radius-lg` have the same specificity and `.card` comes later, so the ring follows the 2rem corners.
- Reveal: `[data-reveal]` starts at `opacity: 0` and `translateY(26px)`. `main.js` adds `.is-visible` once 8% of the card is in view (IntersectionObserver, `threshold: 0.08`, `rootMargin: 0px`, observed once), or straight away where IntersectionObserver is missing. The fade-up takes 0.8s after `transition-delay: var(--d, 0s)`. The delay follows list position, not the column, so it reads as a left to right cascade only when three columns show.
- Reduced motion: every transition drops to 0.01ms and `[data-reveal]` is forced to `opacity: 1` and `transform: none` with `!important`, so cards never fade in, never lift (even with the rule above) and the other hover changes land at once.
- Responsive: no breakpoints of its own. Columns appear as the container allows: one below 37.25rem, two from 37.25rem, three from 56.5rem. A single column fills the width.

## Do and don't

- Do write a `summary` under 140 characters in the post's front matter, so nothing is cut. Under 130 keeps it whole on the term page too.
- Do keep tags as `<span>` inside the card. A link inside the card link is invalid HTML.
- Do keep the summary to two or three lines. The whole card is one link, so a screen reader announces the meta, title, summary, tags and "Read post" as its name.
- Do put the grid on the `.aurora` page background, so the blur has something to show.
- Don't fix the grid to three equal columns or add `calc()` widths. Let `auto-fill` decide, so two cards sit at their natural width.
- Don't add a second link or a button inside the card.
- Don't add a glow. The hover stays tactile: a brighter fill, `shadow-lift`, the sheen and the sage title.
- Don't count on the 6px lift in `.card:hover` or DESIGN.md. On the site the reveal rule cancels it, as above.
- DESIGN.md says to animate only `transform` and `opacity`. The stylesheet also transitions `box-shadow` and `background` on `.card`, though on the site `data-reveal` overrides that, as above. The code is the source.
- `ink-faint` meta text misses 4.5:1: 2.87:1 on `bg` and 3.07:1 on the card's `surface` in light (3.14:1 on `surface-2` in hover); 4.10:1 on `surface` and 3.57:1 on `surface-2` in dark. Keep only the date and reading time there, never anything the reader needs.
- The rest holds on `surface` over `bg`: `ink` title 12.00:1 light and 13.18:1 dark; `ink-soft` summary 6.14:1 and 7.28:1; `sage-700` foot 6.29:1 and 9.70:1; the hovered `sage-700` title 6.44:1 and 8.45:1 on `surface-2`. The aurora behind the glass shifts these slightly.
