# SectionHead

A sage Fraunces `h2` with an optional eyebrow above and an ink-soft lead or count line below, opening the blog list and the tag pages.

## Use it for

- The blog list (`layouts/blog/section.html`): "Blog" and the section's description. The same head opens any section that falls back to `layouts/section.html`.
- The tag index (`layouts/taxonomy.html`): a "Tags" eyebrow and "Browse by tag".
- One tag's page (`layouts/term.html`): a "Tag" eyebrow, the tag as `#Name` and a count line.
- Empty states: on the blog list, when there are no posts, a `p.lead` after the head says "No posts yet, check back soon." That is what the live blog shows today.
- Not for post or About page titles. Those are `h1`s in ArticleHead.

## Markup

Blog list, with the empty state:

```html
<section class="section wrap">
  <div class="head" data-reveal>
    <h2>Blog</h2>
    <div class="lead">Notes on building software, design decisions, and whatever I&#39;m learning this week.</div>
  </div>
  <p class="lead">No posts yet, check back soon.</p>
</section>
```

Tag index:

```html
<section class="section wrap">
  <div class="head" data-reveal>
    <span class="eyebrow"><svg class="ico" ...><!-- tag --></svg> Tags</span>
    <h2>Browse by tag</h2>
  </div>
  <div class="tags" data-reveal style="gap:0.6rem">...</div>
</section>
```

One tag's page:

```html
<section class="section wrap">
  <div class="head" data-reveal>
    <span class="eyebrow"><svg class="ico" ...><!-- tag --></svg> Tag</span>
    <h2>#Nginx</h2>
    <p>3 posts tagged "Nginx".</p>
  </div>
  <div class="grid grid--3">...</div>
</section>
```

- The blog head prints the section's `description` (or its content) as `div.lead`, and leaves it out when there is none. With posts, the card grid follows instead of the empty state. See Card.
- The eyebrow icon on both tag pages is the theme's `tag` icon, `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`, followed by a space. The index's label is the taxonomy title, "Tags"; the term page's is the fixed word "Tag".
- The count line is `{{ len .Pages }} post{{ if ne (len .Pages) 1 }}s{{ end }} tagged "{{ .Title }}".`: "1 post tagged ...", "3 posts tagged ...", with straight quotes. The tag name in the `h2` and the count line is Hugo's term title, title-cased by default, so `nginx` reads "Nginx". See Tag.
- `.section` sets `padding-block: clamp(3.5rem, 8vw, 6.5rem)`. `.wrap` centres the content at `maxw` (1180px) with `padding-inline: clamp(1.1rem, 4vw, 2.5rem)`.
- `.head` caps the measure at `60ch` and leaves `2.75rem` below it.
- `.head h2` is the `section-title` style: Fraunces 500, line height 1.05, `-0.02em` tracking, `clamp(1.9rem, 4.5vw, 3rem)`, in `sage-600`, no top margin.
- `.head p` and `.head .lead` are `ink-soft` with a `1.5rem` top margin. Size comes from the element: `.lead` is `clamp(1.02rem, 1.6vw, 1.18rem)` with its own `60ch` cap (the `lead` style), while the term page's plain `p` stays at the `1rem` body size.
- `.eyebrow` is the `eyebrow` style: Inter 500 at `0.78rem`, `0.14em` tracking, uppercased by CSS, in `sage-600`. It is inline-flex, vertically centred, with a `0.5rem` gap. No margin separates it from the `h2`; only its line box does.
- `.eyebrow .ico` sizes the icon to `1em` square, 12.48px at the eyebrow's size, so the tag icon sits `0.5rem` before the label in the same `sage-600`.
- You provide the section title and description in `content/<section>/_index.md`. Hugo provides the tag pages' titles and counts.

## Behaviour

- No hover, focus or pressed state. The head is static text.
- Reveal: `.head` carries `data-reveal`. `theme-init.js` adds the `js` class to `<html>` before first paint, and `.js [data-reveal]` holds the head at `opacity: 0` and `translate: 0 26px`. `main.js` adds `.is-visible` once 8% of it is in view (IntersectionObserver, `threshold: 0.08`, observed once), or straight away where IntersectionObserver is missing, and the head fades up over 0.8s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`). Without JavaScript the `js` class is never set and the head simply shows. The empty-state `p.lead` has no `data-reveal` and shows at once. The preview leaves `data-reveal` off.
- Reduced motion: animations and transitions drop to 0.01ms and `.js [data-reveal]` is forced to `opacity: 1` and `translate: none`, so the head shows at once.
- Responsive: both sizes are fluid. At an 800px viewport the heading is 36px and the lead 16.32px. The heading reaches its `1.9rem` floor at about 676px and its `3rem` cap at about 1067px; the lead stays at its `1.02rem` floor up to 1020px and reaches `1.18rem` at 1180px. The section padding is `3.5rem` up to 700px and `6.5rem` from 1300px.

## Do and don't

- Do keep one head per section: the heading in `sage-600`, the lead in `ink-soft`.
- Do write the eyebrow in sentence case and let CSS uppercase it.
- Do mark the eyebrow up as a `span` inside `.head`, as the templates do. A `p.eyebrow` there matches `.head p` and turns `ink-soft` with a `1.5rem` top margin. The 404 page's `p.eyebrow` ("Error 404") sits outside any `.head`, so it keeps its style.
- Do use a calm lead line for an empty state, not an illustration or an icon.
- Do load `main.js` on every page that runs `theme-init.js`. The init script's `js` class hides each `[data-reveal]` until `main.js` adds `.is-visible`.
- Don't put an `h1` in `.head`. The styles target `h2`; an `h1` falls back to the base heading (`ink`, browser default size).
- Don't colour the heading `ink` or add a second accent. The sage heading is the hierarchy cue.
- Contrast: the `sage-600` heading is 4.06:1 on `bg` in light, which passes as large text (it is never under 30.4px), and 9.06:1 in dark. The `0.78rem` eyebrow in `sage-600` is the same 4.06:1 on `bg` in light, under the 4.5:1 it needs at that size, and lower over the aurora's lower stops (3.82:1 on `bg-warm`, 3.58:1 on `bg-deep`); it passes in dark at 9.06:1. The lead and the count line in `ink-soft` are 5.75:1 in light and 8.35:1 in dark.
