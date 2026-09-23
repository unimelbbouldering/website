# UniMelb Bouldering website

Skeleton site for the University of Melbourne bouldering club. React + Vite + Tailwind v4 + shadcn/ui, with `motion` for animation and `react-router` for routing.

```sh
pnpm install
pnpm dev      # http://localhost:5173
pnpm build
```

## Two design directions

`/` is a picker for comparing the directions. Both designs have all eight pages
(home, about, events, committee, partners, FAQ, contact, join), and the
"Switch design" button in the corner jumps between them on the same page.

| Route    | Direction |
|----------|-----------|
| `/chalk` | Professional: cool grey and graphite with magenta, blue, amber and teal route colours, wide Archivo headlines |
| `/tape`  | Creative: white gym wall, colour-coded holds and tags, each team member pinned up by their favourite hold |

## Where things live

- `src/content/site.ts` — all copy and data (events, committee, sponsors, FAQ). Committee names are real; everything else (dates, venues, prices, sponsors, links) is placeholder.
- `src/designs/<name>/` — each design's `Layout.tsx` and `pages.tsx`.
- `src/designs/registry.ts` — page list and design metadata.
- `src/components/shared/` — pieces shared by all designs (image placeholder, page transitions, contact form, event filter).
- `src/components/ui/` — shadcn/ui components.
- `src/index.css` — theme tokens; each design sets its own under `[data-design="…"]`.

Images are empty `ImageSlot` boxes for now. Each event has an `images` array meant to be filled from its Instagram post; `EventCarousel` shows them as a swipeable carousel. The contact form has no backend yet and opens the visitor's email app instead.
