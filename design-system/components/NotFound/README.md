# NotFound

The 404 page body: one centred section with an "Error 404" eyebrow, a large `ink` title, a single lead line and a backlink home.

## Use it for

- The site's 404 page (`layouts/404.html`). Hugo writes it to `/404.html` and it is the only place this layout appears.
- Not for empty states inside a page. The blog list says "No posts yet, check back soon." as a lead under its SectionHead.

## Markup

As the template renders it, inside `main` under the navbar and over the `.aurora`, like every inner page:

```html
<section class="wrap section" style="text-align: center;">
  <p class="eyebrow">Error 404</p>
  <h1 class="enter" style="font-size: clamp(2.4rem, 7vw, 4rem); margin-top: 0.8rem;">Page not found</h1>
  <p class="lead enter" style="--d:.1s; margin: 1.25rem auto 0;">This page doesn't exist, or it moved.</p>
  <p class="enter" style="--d:.2s; margin-top: 1.75rem;">
    <a class="backlink" href="/"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Back home</a>
  </p>
</section>
```

- `section.wrap.section`: `.wrap` caps it at `maxw` (1180px) with `padding-inline: clamp(1.1rem, 4vw, 2.5rem)`; `.section` gives `padding-block: clamp(3.5rem, 8vw, 6.5rem)`. Unlike `.article`, the top padding is not cut to 1rem, so the full fluid padding sits between the navbar and the eyebrow. The inline `text-align: center` centres every line.
- The eyebrow is a `p` here, not the `span` the other templates use, and it has no icon. `.eyebrow` makes it inline-flex either way, so it shrinks to its text and centres on its line: Inter 500 at `0.78rem`, uppercase, `0.14em` tracking, `sage-600`.
- The `h1` takes the base heading rule only: Fraunces 500, line height 1.05, `-0.02em` tracking, in `ink`. It is not inside `.article__head`, so it does not get the `sage-600` of an article title. The inline style sets `font-size: clamp(2.4rem, 7vw, 4rem)` and `0.8rem` above.
- The lead is `.lead`: `ink-soft` at `clamp(1.02rem, 1.6vw, 1.18rem)`, `max-width: 60ch`. The inline `margin: 1.25rem auto 0` sets the space above and centres the 60ch box.
- The last `p` holds the Backlink, `1.75rem` below the lead, linking to the site root (`"/" | relLangURL`, rendered `/`).
- You provide nothing per page: the copy is fixed in the template and takes no front matter. To change it, edit `404.html`. The navbar comes from the `header.html` partial that `baseof.html` adds to every page except home; the preview shows only the section.

## Behaviour

- Entrance, CSS only: the title, the lead and the link's `p` carry `.enter`. Each starts at `opacity: 0` and plays `fade-up` (from `translateY(22px)` to rest) over 0.9s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), held with `forwards`, after its `--d` delay: 0s for the title, 0.1s for the lead, 0.2s for the link. The eyebrow has no `.enter` and shows at once. No script is involved, so it runs with JavaScript off.
- The preview drops the `.enter` classes, because each starts at `opacity: 0`, and keeps the inline styles as the template writes them. Without `.enter` the `--d` values do nothing. Keep both in real markup.
- Interaction is the backlink's alone: its arrow moves `translateX(-3px)` on hover over 0.35s, and focus shows the global ring (2px solid `sage-500`, 3px offset, 6px radius).
- Reduced motion: animations drop to 0.01ms and `.enter` is forced to `opacity: 1` with no transform, so everything shows at once.
- Responsive, with no breakpoints: the title is 38.4px below about 549px, 56px at 800px and 64px from about 914px. The section padding is 56px below 700px, 64px at 800px and 104px from 1300px. The lead's 60ch box is 617px wide at 800px. At 320px the title and the lead still fit on one line each; the lead wraps to two lines below a 315px viewport.
- Theme change swaps the colour tokens at once; nothing transitions.

## Do and don't

- Do keep the order: eyebrow, title, one lead line, one way home.
- Do keep the copy short and plain, as the template has it.
- Don't add more links or a search box. Getting the reader home is the page's only job.
- Don't colour the title in markup. DESIGN.md says section and article headings render in `sage-600`, but this template leaves its `h1` in `ink` and the code wins; change the theme if the 404 should match article titles.
- Don't drop `text-align: center` from the section. The eyebrow and backlink are inline-flex and only centre through it.
- Contrast: the `sage-600` "Error 404" eyebrow at `0.78rem` is 4.06:1 on `bg` in light, under 4.5:1, and lower over the aurora's lower stops (3.82:1 on `bg-warm`, 3.58:1 on `bg-deep`). It is 9.06:1 in dark. The `ink` title holds 11.23:1 in light and 15.11:1 in dark, the `ink-soft` lead 5.75:1 and 8.35:1, and the `sage-700` backlink 5.88:1 and 11.12:1.
