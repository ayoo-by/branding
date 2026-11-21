# Tag

A flat sage pill that names a post's topic, in the `pill-bg` fill the active nav item also uses.

## Use it for

- A post's topics on its card: the first three tags, as `span.tag` (`layouts/blog/section.html`). The cards on a tag's own page (`layouts/term.html`) leave the row out.
- Links to each topic's page in the post header: every tag, as `a.tag` (`layouts/blog/page.html`).
- The tag index (`layouts/taxonomy.html`): every tag on the site as a larger `a.tag` with its post count.
- Not for status, counts on their own or actions. A page counter is a Pill; actions are buttons.

## Markup

In a card, after the summary (raw front matter values, no whitespace between tags):

```html
<div class="tags"><span class="tag">nginx</span><span class="tag">security</span><span class="tag">networking</span></div>
```

In the post header, after `.article__meta`:

```html
<div class="tags" style="justify-content:center;margin-top:1.1rem">
  <a class="tag" href="/tags/nginx/">Nginx</a><a class="tag" href="/tags/security/">Security</a><a class="tag" href="/tags/networking/">Networking</a><a class="tag" href="/tags/performance/">Performance</a>
</div>
```

On the tag index, after the head (see SectionHead):

```html
<div class="tags" data-reveal style="gap:0.6rem">
  <a class="tag" href="/tags/networking/" style="font-size:0.9rem;padding:0.4rem 0.95rem">#Networking <span style="opacity:.6">1</span></a>
  <a class="tag" href="/tags/nginx/" style="font-size:0.9rem;padding:0.4rem 0.95rem">#Nginx <span style="opacity:.6">3</span></a>
  ...
</div>
```

- `.tag`: Inter 500 at `0.75rem` (the `tag` style), `0.28rem 0.7rem` padding, `radius-pill`, `pill-bg` fill, `sage-700` text. No border, shadow or blur.
- `.tags`: a wrapping flex row, `0.45rem` gap, `1rem` top margin. The post header overrides it inline to centre the row with `1.1rem` above; the index widens the gap to `0.6rem` inline.
- The index link sets `font-size: 0.9rem` and `padding: 0.4rem 0.95rem` inline. Its count is a `span` at `opacity: .6`, after a space.
- `pill-bg` is `#d3dcc4` in light (equal to `sage-200`) and `#1f2a21` in dark (equal to dark `sage-100`).
- Cards print the tag as written in front matter. The post header, the index and the term page print Hugo's term title, which is title-cased by default (`capitalizeListTitles` is not set in `hugo.toml`): `nginx` shows as "nginx" on a card and "Nginx" everywhere else, and `developer tools` becomes "Developer Tools". Capitals you write are kept, so write `MCP`, not `mcp`.
- The index lists terms in Hugo's default page order: the term with the most recent post first, ties by title. It is not alphabetical and not by count.
- The active nav link (`.nav__menu a.is-active`, with `aria-current="page"`) takes the same `pill-bg` fill, `sage-700` text and weight 500. Only size and padding differ: `0.92rem` with `0.45rem 0.9rem` (`0.4rem 0.7rem` at 760px and below). Keep both on the one token so they cannot drift apart.
- You provide the tags in each post's front matter. Hugo provides the term pages, links, names and counts.

## Behaviour

- No hover, pressed or transition rules, even where the tag is a link. Add none until the theme defines one.
- Focus, for the post header and index links: the global ring, 2px solid `sage-500` at a 3px offset. `.tag`'s `radius-pill` comes later than the ring's 6px radius at the same specificity, so the ring follows the pill.
- On the index the row carries `data-reveal`: once `theme-init.js` has set the `js` class on `<html>` it fades up from `opacity: 0` and `translate: 0 26px` over 0.8s on `--ease` when 8% of it is in view. Without JavaScript it simply shows. Reduced motion forces it to `opacity: 1` and `translate: none`, so it shows at once. The card and post header rows ride on their parent's reveal.
- Theme change swaps `pill-bg` and `sage-700` at once.
- Responsive: rows wrap and a tag never truncates. A two-word tag can break inside its pill on a very narrow row, so keep labels short.

## Do and don't

- Do keep to three or four tags per post. Cards show only the first three, in front matter order, so put the most useful first.
- Do keep tags as `span` inside a card. A link inside the card link is invalid HTML.
- Do use the `pill-bg` token, never a hard-coded sage, so tags and the active nav item stay one colour.
- Don't use a slash in a tag. Hugo turns `http/3` into the nested path `/tags/http/3/`.
- Don't give tags glass, a border or a shadow. Glass pills are Pill and Button; the tag is flat on purpose.
- Don't add a second hue for categories. Sage is the only accent.
- Contrast: `sage-700` on `pill-bg` is 4.73:1 in light, just over 4.5:1, and 9.12:1 in dark. The index count at `opacity: .6` blends to 2.32:1 in light and 4.26:1 in dark, both under 4.5:1 at `0.9rem`. The number is repeated on the term page ("3 posts tagged ..."), so it is supplementary, but don't rely on it alone.
- In dark, `pill-bg` is only 1.06:1 against card glass and 1.22:1 against `bg` (1.33:1 and 1.24:1 in light), so the pill shape fades and the text carries it. Don't rely on the fill to group or separate anything.
