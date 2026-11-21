# ArticleHead

The centred header that opens a blog post or a standalone page: a sage Fraunces title with a backlink, meta row and tag links on a post, or an optional eyebrow and a lead on a page.

## Use it for

- The top of a blog post (`layouts/blog/page.html`): "All posts" backlink, title, date, reading time, author and the post's tags.
- The top of a standalone page (`layouts/page.html`): title and a lead. About is the only page on the site that uses it today ("About me", "Systems engineer in London, working close to the metal.").
- Not for list pages (the blog list and tag pages open with SectionHead) or the 404 page (NotFound).

## Markup

A post, as `blog/page.html` renders it:

```html
<article class="article section wrap">
  <header class="article__head" data-reveal>
    <a class="backlink" href="/blog/"><svg class="ico" ...><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> All posts</a>
    <h1>Running HTTP/3 on a hardened NGINX</h1>
    <div class="article__meta">
      <span class="mi"><svg class="ico" ...><!-- calendar --></svg> 12 November 2026</span>
      <span class="mi"><svg class="ico" ...><!-- clock --></svg> 6 min read</span>
      <span class="mi"><svg class="ico" ...><!-- sparkles --></svg> Diab Neiroukh</span>
    </div>
    <div class="tags" style="justify-content:center;margin-top:1.1rem">
      <a class="tag" href="/tags/nginx/">Nginx</a><a class="tag" href="/tags/security/">Security</a><a class="tag" href="/tags/networking/">Networking</a><a class="tag" href="/tags/performance/">Performance</a>
    </div>
  </header>
  <div class="prose" data-reveal style="--d:.1s">...</div>
  <nav class="pager" aria-label="Post navigation">...</nav>
</article>
```

A page, as `page.html` renders the About page:

```html
<article class="article section wrap">
  <header class="article__head" data-reveal>
    <h1>About me</h1>
    <p class="lead" style="margin-inline:auto">Systems engineer in London, working close to the metal.</p>
  </header>
  <div class="prose" data-reveal style="--d:.1s">...</div>
</article>
```

Each `svg` is the theme's icon partial: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`, Lucide paths at stroke 1.8, followed by a space and the text.

- `.article` sets `padding-top: 1rem` over `.section`'s `padding-block: clamp(3.5rem, 8vw, 6.5rem)`, so the header sits just under the navbar and the bottom padding stays fluid. `.wrap` caps the width at `maxw` (1180px) with `padding-inline: clamp(1.1rem, 4vw, 2.5rem)`.
- `.article__head` is `44rem` wide at most, centred with `margin-inline: auto`, `text-align: center`, and `2.6rem` below it before the prose.
- `h1` is the `article-title` style: Fraunces 500, line height 1.05, `-0.02em` tracking, `clamp(2.2rem, 6vw, 3.6rem)`, in `sage-600`, with `1rem` above and `0.9rem` below.
- The backlink is the Backlink component (`sage-700`, Inter 500 at `0.92rem`, arrow-left icon).
- `.article__meta` is an inline-flex row that wraps and centres, `1rem` between items, `ink-faint` at `0.9rem` (the `article-meta` style). Each `.mi` is inline-flex with a `0.4rem` gap and its `.ico` is `1em` square.
- Meta copy: the date is `.Date.Format "2 January 2006"`, printed as plain text with no `time` element. The reading time is Hugo's `.ReadingTime` followed by " min read". The author item appears only when the post's front matter sets `author`; the blog archetype (`archetypes/blog.md`) sets `author = "Diab Neiroukh"`, so posts made with `hugo new` show it. The site's `params.author` in `hugo.toml` is not read here.
- Tags render only when the post has any. Every tag is listed, not the first three as on cards, as `a.tag` links to `/tags/<term>/` with Hugo's title-cased term name. The inline style centres the row and sets `1.1rem` above it. See Tag.
- A post prints no lead: `blog/page.html` ignores `description` and `summary`. The card shows the summary, and the page's meta description takes `description`, then the summary.
- Page eyebrow: when the front matter sets `eyebrow`, `page.html` writes `<span class="eyebrow"><svg class="ico" ...><!-- sparkles --></svg> Your label</span>` before the `h1`. No page on the site sets it. `.eyebrow` is Inter 500 at `0.78rem`, uppercase, `0.14em` tracking, `sage-600`, inline-flex with a `0.5rem` gap, so it centres in the header. The theme has no `.eyebrow .ico` size rule, so the sparkles icon renders at 0 by 0 in Chromium and only the gap shows before the label.
- Page lead: `page.html` prints `description`, or `subtitle` when there is no description, as `p.lead` with `margin-inline:auto` inline. About uses `subtitle`. `.lead` is `ink-soft` at `clamp(1.02rem, 1.6vw, 1.18rem)` with a `60ch` cap. The inline margin centres that box; without it the text centres inside a box that hugs the left. A page has no backlink and no meta row.
- You provide the front matter: `title`, `date`, `tags` and `author` on a post; `title`, `subtitle` or `description`, and optionally `eyebrow` on a page. Hugo provides the reading time, the tag links and the term names.

## Behaviour

- The header has no states of its own. Its only interactive parts are the backlink, whose arrow moves `translateX(-3px)` on hover over 0.35s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), and the tag links, which have no hover rule.
- Focus: the global ring on both, 2px solid `sage-500` at a 3px offset with a 6px radius. On a tag the ring follows the pill's `radius-pill`.
- Reveal: the header carries `data-reveal`, so it starts at `opacity: 0` and `translateY(26px)`. `main.js` adds `.is-visible` once 8% of it is in view (`threshold: 0.08`, `rootMargin: 0px`) and it fades up over 0.8s on `--ease`. The prose follows with `--d:.1s`. Without IntersectionObserver the script reveals everything at once. The preview leaves `data-reveal` off.
- Reduced motion: transitions drop to 0.01ms and `[data-reveal]` is forced to `opacity: 1` with no transform, so the header shows at once.
- Responsive, with no breakpoints: the title is 35.2px below about 587px, 48px at 800px and 57.6px from 960px. A long title wraps and stays centred. The lead's `60ch` box is 617px at 800px and fills the 704px header from about 1164px. The meta row and tags wrap onto further centred lines on a phone (at 375px the meta row takes two lines).
- Theme change swaps every colour token at once; nothing transitions.

## Do and don't

- Do keep the title in `sage-600` and the header centred. Inner pages are calm and centred by design. The 404 page's title is in `ink` instead (see NotFound).
- Do keep the meta row to the template's three items: date, reading time, author.
- Do keep post titles short enough for two lines at 48px. The header is 44rem wide.
- Don't set `eyebrow` on a page and expect the sparkles icon to show. Give `.eyebrow .ico` a size in the theme first (for example `width: 1em; height: 1em`).
- Don't rely on the header without JavaScript. `[data-reveal]` holds it at `opacity: 0` until the script adds `.is-visible`, so with scripts off the title, meta and lead stay invisible.
- Don't bring in a second accent colour. Sage is the only one, in both themes.
- Contrast: the `sage-600` title is 4.06:1 on `bg` in light, a pass only as large text (it is never under 35.2px; it stays over 3:1 on the aurora's stops, 3.58:1 on `bg-deep`), and 9.06:1 in dark.
- The meta row in `ink-faint` at `0.9rem` fails 4.5:1 in light: 2.87:1 on `bg`, lower over the aurora. In dark it is 4.70:1 on flat `bg`, a narrow pass the aurora behind the header erodes: 4.48:1 on `bg-warm`, and 3.9 to 4.4:1 measured in this preview's render. Treat it as failing in both themes and keep it to metadata.
- An eyebrow in `sage-600` at `0.78rem` is 4.06:1 on `bg` in light, under 4.5:1, and lower over the aurora (3.82:1 on `bg-warm`, 3.58:1 on `bg-deep`). It is 9.06:1 in dark.
- Passing pairs: the `ink-soft` lead is 5.75:1 in light and 8.35:1 in dark, the `sage-700` backlink 5.88:1 and 11.12:1, and `sage-700` tag text on `pill-bg` 4.73:1 and 9.12:1.
