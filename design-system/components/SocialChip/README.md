# SocialChip

A round frosted chip that links to one profile, set in a `.socials` row under the hero name and at the foot of the About page.

## Use it for

- Contact and profile links. The personal stage shows Email, GitHub, Instagram, LinkedIn and Telegram in that order; the Ayooby stage shows Email and GitHub.
- Icon-only links where the mark alone is clear. Every chip needs an `aria-label`.

## Markup

```html
<div class="socials">
  <a class="social" href="mailto:you@example.com" aria-label="Email"><svg class="ico" ...>mail</svg></a>
  <a class="social" href="https://github.com/lzlrd" aria-label="GitHub" target="_blank" rel="me noopener"><svg class="ico" ...>github</svg></a>
  <a class="social" href="https://instagram.com/itslzlrd" aria-label="Instagram" target="_blank" rel="me noopener"><svg class="ico" ...>instagram</svg></a>
  <a class="social" href="https://www.linkedin.com/in/lzlrd" aria-label="LinkedIn" target="_blank" rel="me noopener"><svg class="ico" ...>linkedin</svg></a>
  <a class="social" href="https://t.me/lzlrd" aria-label="Telegram" target="_blank" rel="me noopener"><svg class="ico" ...>telegram</svg></a>
</div>
```

- `.socials` is an inline-flex row that wraps, with a `0.5rem` gap. On the hero it sits in `.hero__socials` (`1.8rem` under the name); on About it is centred in a `44rem` block `2.5rem` under the prose.
- `.social` is a `2.7rem` circle (`border-radius: 50%`) with the icon centred at `1.2rem` in `ink`.
- The glass is the chip recipe shared with `.theme-switch` and `.theme-cycle`: a 140deg diagonal sheen from `#ffffff8c` to `#ffffff2e` (`#ffffff24` to `#ffffff0a` in dark), `backdrop-filter: blur(10px) saturate(125%)`, a soft drop with two inset rims (`0 4px 12px -8px #323c2338, inset 0 1px 1px #ffffffd9, inset 0 -5px 9px -7px #5a6e461f`), and its own GPU layer (`transform: translateZ(0)`, `will-change: transform`) so Safari keeps painting the backdrop filter after the entrance animation. Only the sheen changes in dark; the shadow and rims are the same in both themes.
- You provide the links, the `aria-label`s and the Lucide-style icons at stroke 1.8 (mail, github, instagram, linkedin, telegram in the Icons group).

## Behaviour

- Hover: `transform: translateY(-3px) translateZ(0)`, the icon turns `sage-invert` (the other mode's accent: `#bcd2a2` in light, `#51613f` in dark), and the drop deepens to `0 11px 24px -10px #323c2357` with the same two inset rims. The glass fill does not change.
- Transitions: transform 0.4s, colour 0.3s, box-shadow 0.3s, all on `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`). There is no pressed state.
- Focus: the global ring, 2px solid `sage-500` at a 3px offset. The global rule (`:where(a, button, input, [tabindex]):focus-visible`) has the same specificity as `.social`, because `:where()` adds nothing and `:focus-visible` counts as one class, and it comes earlier in the stylesheet. So the chip's 50% radius beats the ring's 6px radius and the ring follows the circle.
- Entrance: on the hero the whole `.hero__socials` row fades up 22px with `.enter` (0.9s, `--d: .3s`). On About the row's wrapper carries `data-reveal`: once the pre-paint script has set `html.js` it sits at `opacity: 0`, shifted 26px down with `translate`, until 8% of it is in view, then animates up over 0.8s. Without JavaScript the row simply shows.
- Reduced motion: transitions drop to 0.01ms, so the lift and the colour change land at once, and `.enter` and `.js [data-reveal]` content shows in its final state.

## Do and don't

- Do give every chip an `aria-label` naming the destination, and `target="_blank" rel="me noopener"` on off-site profiles, as the site does.
- Do keep the row short. Five chips is the most the site shows.
- Don't fill chips with sage or colour the icons in brand colours. They stay `ink` until hover.
- Don't drop `translateZ(0)` or `will-change: transform` to save layers: Safari can stop painting the frost without them.
- The `sage-invert` hover is 1.43:1 against `bg` in light and 2.70:1 in dark (about 1.5:1 and 1.8 to 2.5:1 on the chip glass). It is a deliberate flash below the 3:1 floor for icons; the 3px lift is the second cue. Never use `sage-invert` for a resting icon.
- At rest the `ink` icons hold about 11.5 to 12:1 on the chip in light and 10 to 13.8:1 in dark.
