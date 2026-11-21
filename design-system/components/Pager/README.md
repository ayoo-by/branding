# Pager

Two glass blocks at the foot of a blog post that link to its neighbouring posts by title, labelled "← Newer" and "Older →".

## Use it for

- The foot of a single blog post (`layouts/blog/page.html`), after the `.prose` body, inside `article.article.section.wrap`.
- Only when the post has a neighbour in the blog section: the template writes the nav inside `{{ if or .NextInSection .PrevInSection }}`.
- Not for the blog list. That pages with ghost Buttons and a Pill counter in a `nav.pager` with an inline style (see Button).

## Markup

```html
<nav class="pager" aria-label="Post navigation">
  <div class="prev">
    <a href="/blog/small-mcp-servers-for-claude-code/"><span class="glass"><small>← Newer</small><strong>Small MCP servers for Claude Code</strong></span></a>
  </div>
  <div class="next">
    <a href="/blog/building-quickna-me/"><span class="glass"><small>Older →</small><strong>Building quickna.me</strong></span></a>
  </div>
</nav>
```

- The template fills `div.prev` from `.NextInSection`, labelled "← Newer", and `div.next` from `.PrevInSection`, labelled "Older →", each with `.RelPermalink` and `.Title`. Posts sort newest first (`hugo.toml` sets no `nextPrevInSectionSortOrder`, so Hugo's default `desc` applies), which makes `.NextInSection` the newer post and `.PrevInSection` the older one. Both divs are always written; a missing neighbour leaves its div empty.
- `.pager > div > a { display: block; }` makes each post pager link block-level, so it wraps its glass block. The selector needs the div wrapper, so it leaves the blog list's pagination (`a.btn` straight inside `nav.pager`) alone.
- `.pager`: `display: flex`, `justify-content: space-between`, `gap: 1rem`, `margin-top: 3rem`, `max-width: 44rem`, `margin-inline: auto`. 44rem is the `.prose` measure, so the row lines up with the article.
- `.pager .glass` is the Glass primitive (`surface` fill, `blur(20px) saturate(150%)`, 1px `border-glass`, `radius` 1.25rem, `shadow-glass`) set to `display: block` with `1rem 1.25rem` padding.
- `small` is the direction label in `ink-faint`. The stylesheet gives it no size, so it renders at the browser's `smaller`, about 13.3px. Its ← and → fall outside the Inter subsets the theme loads and draw in the system fallback font.
- `strong` is the title: `display: block`, Inter 500, `ink`, `0.25rem` below the label, at the body size of 1rem.
- `.pager .next { text-align: right }` right-aligns the second block's text.
- The labels are fixed in the template. The consumer provides only the neighbouring posts.

## Behaviour

- Layout: the flex items are the two divs, not the links, so `.pager a { flex: 1 }` never takes effect. Each div is as wide as its block's content (the title on one line plus padding) and `space-between` pushes the two to opposite ends of the row, with free space between them. In the preview, titles of 33 and 19 characters give blocks of 315px and 197px with 192px between.
- When the two titles together need more than the row, both divs shrink in proportion to their width and the titles wrap. The blocks do not become equal halves, and a short title can wrap too.
- Height: each block is as tall as its own content. The divs stretch to the row's height, but the block-level link and its glass block keep their own height, so space under a shorter block is not part of the link.
- One neighbour: the empty div keeps its slot, so the lone block stays on its own side at its own width: left for "← Newer", right for "Older →". It does not fill the row.
- Direction: "← Newer" on the left always links to the newer post and "Older →" on the right to the older one, the same way round as the blog list's Newer and Older buttons.
- Hover: `.pager a:hover .glass` lifts the block `translateY(-3px)` and swaps `shadow-glass` for `shadow-lift`. `.pager .glass` transitions transform and box-shadow over 0.4s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), but only the lift eases. `shadow-glass` opens with an inset top highlight and `shadow-lift` has none, so the two cannot interpolate: the shadow swaps at once, and the highlight is gone while the block is raised. The fill and the text colours do not change.
- Focus: the global ring, 2px solid `sage-500` at a 3px offset, goes on the block-level link, so it wraps the whole glass block. The ring keeps the global 6px radius rather than the block's 1.25rem corners.
- There is no pressed state.
- Reduced motion: transitions drop to 0.01ms, so the lift happens at once.
- Responsive: no breakpoints. On a phone both blocks share the narrower row, shrink and wrap.

## Do and don't

- Do keep the template's order inside the block: `small` label first, then `strong` title.
- Do keep titles short enough to sit on one or two lines when the blocks share the row.
- Don't expect two equal halves. With the div wrappers the blocks sit at opposite ends at their own widths.
- Don't add icons. The labels carry text arrows and the stylesheet has no `.pager .ico` rule.
- Don't change the 3px lift. Cards lift 6px and buttons 2px; the pager sits between them.
- Contrast: the `ink-faint` labels miss 4.5:1. On the block's `surface` (over flat `bg`) they are 3.07:1 in light and 4.10:1 in dark; the same colour on flat light `bg` is 2.87:1. The title carries the meaning and holds 12.00:1 in light and 13.18:1 in dark.
