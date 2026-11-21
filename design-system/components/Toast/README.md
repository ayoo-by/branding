# Toast

A glass pill that rises at the bottom centre of the viewport to say "Coming soon" when someone clicks a link that has nowhere to go yet.

## Use it for

- Answering a click on a placeholder link (`[data-coming-soon]`). On the site these are the "Ayooby" name and the "Products and services" corner, both on the home page.
- One short, passive message at a time. It takes no input.

## Markup

```html
<div class="toast" data-toast role="status" aria-live="polite">Coming soon</div>

<a class="hero-corner" href="#" data-coming-soon aria-label="Products and services">...</a>
```

- One `.toast`, marked `data-toast`, on any page that has `[data-coming-soon]` links: the script takes the first `[data-toast]` and does nothing if either is missing. On the site only the home page has one, inside `.hero--split`; Blog and About have none.
- `.toast` is `position: fixed`, `left: 50%`, `bottom: clamp(1.1rem, 4vh, 2.2rem)`, `z-index: 80` and `pointer-events: none`.
- The pill: padding `0.7rem 1.25rem`, `radius-pill`, `surface-2` fill, `backdrop-filter: blur(20px) saturate(150%)` with the `-webkit-` prefix, a 1px `border-glass` rim, `shadow-lift`, and `ink` text in Inter 500 at 0.95rem (the `button` text style).
- Hidden at rest: `opacity: 0`, `visibility: hidden`, `transform: translate(-50%) translateY(1rem)`.
- `.is-visible`: `opacity: 1`, `visibility: visible`, `transform: translate(-50%) translateY(0)`.
- The consumer provides the element, the copy and the script that adds and removes `.is-visible`.

## Behaviour

- On a click of any `[data-coming-soon]` element the script calls `preventDefault()`, adds `.is-visible`, clears any pending timer and sets a new 2600ms timeout that removes the class. Another click restarts the 2600ms.
- `opacity`, `transform` and `visibility` transition over 0.4s on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), so it rises 1rem as it fades in and sinks as it fades out.
- `z-index: 80` keeps it above the sticky nav (50) and the hero layers.
- No hover, focus or press state: `pointer-events: none` lets clicks pass through and it never takes focus.
- Reduced motion: the transitions drop to 0.01ms, so it appears and disappears in place.

## Do and don't

- Do keep the copy to a few plain words. "Coming soon" is the only message on the site.
- Don't put links or buttons in it. They cannot be clicked and they vanish after 2600ms.
- Don't use it for errors or anything the reader must act on, and don't stack toasts.
- Don't rely on it alone for screen readers. It has `role="status"` and `aria-live="polite"`, but the script only toggles visibility and never changes the text, so whether it is announced depends on the screen reader. If the message must be heard, write it into the element as you show it.
- Contrast holds: `ink` on `surface-2` is 12.28:1 in light and 11.48:1 in dark over `bg` (12.20:1 over dark `bg-deep`). Where it shows on the home page, over the bottom stage (`#ffffff1f`, dark `#0f162229`) and the hero gradient colours, it stays between 10.08:1 and 12.17:1 in light and 7.07:1 and 11.48:1 in dark.
