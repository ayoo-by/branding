# Icons

The theme's whole icon set, copied from its icon partial (`themes/sage/layouts/_partials/icon.html`): Lucide icons (ISC licence) on a 24px grid at `stroke-width` 1.8, round caps and joins, no fill. Each is single ink in `currentColor`: inline the SVG and set CSS `color` (`ink` at rest, `sage-700` for active or accent states). Shown through an image tag they render black.

- `github`, `linkedin`, `twitter`, `telegram`, `instagram`, `mail`, `globe`, `rss`: social chips. The site config names which ones appear; today that is mail, github, instagram, linkedin and telegram. `telegram` is a custom paper plane, not Lucide's `send`.
- `sun`, `moon`, `monitor`: the three theme-switch options (light, dark, system).
- `arrow-up-right`: the hero-corner circle and the card foot ("Read post", "Open").
- `arrow-left`, `arrow-right`: the backlink ("All posts", "Back home") and the blog list's "Newer" and "Older" buttons.
- `chevron-right`: the hero-corner subtitle ("Latest posts", "What we build").
- `calendar`, `clock`: the date and reading time in card and article meta.
- `sparkles`: the post author in article meta, and an About-style page's optional eyebrow.
- `tag`: the eyebrow on the tag index and tag pages.
- `flask`: Ayoo by Labs.

Render them the way the partial does: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`, and put the accessible name on the link or button around the icon.
