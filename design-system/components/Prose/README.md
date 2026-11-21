# Prose

The long-form reading column for posts and the About page: Inter body in prose-ink at 44rem, ink Fraunces headings, sage links and markers, and a One Dark code block.

## Use it for

- Rendered Markdown: the body of a blog post and of the About page.
- Anything read top to bottom. Keep cards, pagers and other interface outside the column.

## Markup

```html
<div class="prose">
  <p>I keep <a href="https://github.com/ayoo-by-labs/zestginx">zestginx</a> going, a hardened NGINX with HTTP/3.</p>
  <h2>Keeping it small</h2>
  <ul>
    <li>Small enough to read in an afternoon.</li>
  </ul>
  <blockquote>Software that stays small and runs for years.</blockquote>
  <p>Every change gets a dry run with <code>nginx -t</code>.</p>
  <pre><code>listen 443 quic reuseport;</code></pre>
  <hr>
</div>
```

- The column: `max-width: 44rem`, centred with auto inline margins, Inter at `1.075rem` (the `prose` style) with the body's 1.6 line height. Its base colour is `ink`.
- Rhythm: every direct child after the first gets `margin-top: 1.35rem`. `h2` raises that to `2.8rem`, `h3` to `2.2rem`, and `hr` takes `2.5rem` above and below. The heading margins apply even to a heading that opens the column, so a body that starts with an `h2` gets `2.8rem` above it.
- Paragraphs take `prose-ink` (`#3a4034` light, `#cdd4c5` dark), a step softer than `ink`. Only `p` does: list items and headings stay `ink`, so list text reads a little darker than paragraphs in light.
- `h2` is Fraunces 500 at `1.85rem` (`prose-h2`), `h3` at `1.4rem` (`prose-h3`), both in `ink` with line height 1.05 and `-0.02em` tracking.
- Links: `sage-700` text with a 1px underline, offset 3px, in `sage-300`.
- Lists: `1.4rem` left padding, `0.5rem` between items, markers in `sage-500`.
- Blockquote: a 3px `sage-400` rule on the left, padding `0.4rem 0 0.4rem 1.4rem`, Fraunces italic 400 at `1.25rem` (the `blockquote` style) in `ink-soft`.
- Inline code: the mono stack at `0.88em`, `sage-700` on `sage-100`, padding `0.12em 0.4em`, radius `0.4rem`.
- Code block: `code-ink` on `code-bg` (One Dark) in both themes, padding `1.2rem 1.35rem`, `radius-sm`, `0.9rem` at line height 1.6, `shadow-glass`, and `overflow-x: auto`. The `code` inside drops its own fill and padding and inherits the colour. The stylesheet has no highlight classes and sets only this base pair. Token colours come from Hugo: `hugo.toml` sets `[markup.highlight]` to `style = "onedark"` with `noClasses = true`, so the highlighter writes them as inline styles. The blog has no posts yet, so no highlighted block has been checked on the site.
- Images: `radius` corners, `shadow-glass`, centred. `hr`: a 1px line in `border-soft`.
- You provide the HTML, normally Markdown output. Write plain tags inside the column, no classes.

## Behaviour

- Link hover: the underline deepens from `sage-300` to `sage-600` over 0.3s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`). The text colour stays `sage-700` and nothing moves.
- Focus: links show the global ring, 2px solid `sage-500`, 3px offset, 6px radius.
- A long code line scrolls inside the block instead of widening the page.
- Reveal: on posts and the About page the column carries `data-reveal` with `--d:.1s`. Once `theme-init.js` has set the `js` class on `<html>`, it waits at `opacity: 0` and `translate: 0 26px` until `main.js` adds `.is-visible`, then fades up over 0.8s, 0.1s after the header. Without JavaScript it simply shows. Reduced motion drops animations and transitions to 0.01ms and forces `.js [data-reveal]` to `opacity: 1` and `translate: none`, so it shows at once. The preview leaves `data-reveal` off.
- Themes: the column changes only through its tokens. The code block keeps One Dark in both, so in light it is the one dark island on the page.

## Do and don't

- Do keep headings inside prose in `ink`. Sage headings belong to SectionHead and ArticleHead.
- Do put quote text straight inside `blockquote` when you want `ink-soft`. Markdown wraps it in a `p`, and `.prose p` then paints it `prose-ink` (still Fraunces italic), so that is what a Markdown quote shows on the site. The preview uses direct text, so it shows `ink-soft`.
- Do keep code blocks One Dark. Don't add a light code theme or a second highlight style.
- Do keep the link underline. It is the main cue that a link is a link: `sage-700` link text against `prose-ink` paragraph text is only 1.60:1 in light and 1.07:1 in dark.
- Do load `main.js` on every page that runs `theme-init.js`. The init script's `js` class hides the column until `main.js` adds `.is-visible`.
- `strong` asks for the browser's bold (700). Inter loads as a variable face over 400 to 600 only, so it renders at 600, here and on the site alike, with no synthetic bolding.
- Measure: the `44rem` column at `1.075rem` holds about 80 to 88 characters a line. Don't narrow the column per page.
- Contrast: paragraphs in `prose-ink` hold 9.39:1 on `bg` in light and 11.93:1 in dark; links in `sage-700` 5.88:1 and 11.12:1; the `ink-soft` quote 5.75:1 and 8.35:1; inline code `sage-700` on `sage-100` 5.59:1 and 9.12:1; `code-ink` on `code-bg` 6.57:1. The resting `sage-300` underline is faint, 1.63:1 on `bg` in light and 2.30:1 in dark; it rises to 4.06:1 and 9.06:1 on hover in `sage-600`. List markers in `sage-500` are 3.06:1 in light (7.30:1 in dark), and the `sage-400` quote rule 2.30:1 in light; both are decorative marks.
