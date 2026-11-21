# Backlink

A small sage text link led by a left arrow that takes the reader back: from a post to the blog list, or from the 404 page to home.

## Use it for

- The top of a blog post: "All posts", the first thing in the post header (`layouts/blog/page.html`). See ArticleHead.
- The 404 page: "Back home", under the lead (`layouts/404.html`). See NotFound.
- One per page. It is a quiet way back, not the page's main action.

## Markup

In the post header, as rendered:

```html
<header class="article__head" data-reveal>
  <a class="backlink" href="/blog/"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> All posts</a>
  <h1>...</h1>
  ...
</header>
```

On the 404 page, as rendered:

```html
<p class="enter" style="--d:.2s; margin-top: 1.75rem;">
  <a class="backlink" href="/"><svg class="ico" viewBox="0 0 24 24" ...><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Back home</a>
</p>
```

- The icon is arrow-left from the theme's icon partial (`_partials/icon.html`, Lucide at stroke 1.8), called with class `ico`. The template writes a space between the `svg` and the text. Inside the inline-flex link that space collapses, so the only space you see is the `0.45rem` gap.
- `.backlink` is inline-flex, vertically centred, with a `0.45rem` gap: `sage-700` text in Inter 500 at `0.92rem` (the `link-strong` text style), line height 1.6 from `body`. The global `a` reset removes the underline.
- `.backlink .ico` is `1em` square, 14.72px at this size, so the arrow scales with the text.
- The post header link points at the blog section (`site.GetPage "/blog"`, rendered `/blog/`); the 404 link at the site root (`"/" | relLangURL`, rendered `/`). Both centre because their parents set `text-align: center`.
- You provide the `href`, the copy and the arrow-left icon. Keep the space the template writes after the `svg`.

## Behaviour

- Hover: `.backlink:hover .ico` moves the arrow `translateX(-3px)`, 3px to the left, over 0.35s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`). The text colour does not change, nothing underlines and nothing lifts. The site's minified stylesheet writes the same value as `translate(-3px)`.
- Focus: the global ring, 2px solid `sage-500` at a 3px offset with a 6px radius. `.backlink` sets no radius of its own.
- There is no pressed or visited state.
- Entrance: in a post it rides on the header's `data-reveal` fade-up (0.8s once 8% is in view). That reveal hides the header only once `theme-init.js` has set the `js` class on `<html>`, so without JavaScript the link simply shows. On the 404 page its `p` is `.enter` with `--d:.2s`: it starts at `opacity: 0` and plays `fade-up` (from 22px low) over 0.9s on `--ease` after a 0.2s delay, in CSS alone. The preview shows the link without the post header and drops `.enter`, which starts at `opacity: 0`; it keeps the `p`'s inline style as written, and without `.enter` its `--d` does nothing.
- Reduced motion: transitions and animations drop to 0.01ms, so the arrow jumps the 3px at once. `.enter` is forced to `opacity: 1` and `transform: none`, and `.js [data-reveal]` to `opacity: 1` and `translate: none`, so the link shows at once on both pages.

## Do and don't

- Do keep the arrow before the text, so the leftward nudge points the way back.
- Do keep the copy short and name the destination: "All posts", "Back home".
- Don't underline it, put it in a pill or turn it into a button.
- Don't use it to move forward. The Pager and the ghost Buttons handle newer, older and paging.
- Don't put two on one page.
- Text contrast holds: `sage-700` is 5.88:1 on `bg` in light and 11.12:1 in dark.
- The focus ring is marginal in light. `sage-500` is 3.06:1 on flat `bg`, just over the 3:1 floor for non-text, and falls under it over the aurora's lower stops (2.88:1 on `bg-warm`, 2.70:1 on `bg-deep`). It is 7.30:1 in dark.
