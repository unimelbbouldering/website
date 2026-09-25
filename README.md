# UniMelb Bouldering website

Skeleton site for the University of Melbourne bouldering club. React + Vite + Tailwind v4 + shadcn/ui, with `motion` for animation and `react-router` for routing.

```sh
pnpm install
pnpm dev      # http://localhost:5173
pnpm build
```

## Design

The site uses the Tape design: a white gym wall, colour-coded holds and tags, and each team member pinned up by their favourite hold. It has eight pages: home, about, events, committee, partners, FAQ, contact and join.

## Deploying

The site is hosted on Vercel as the `unimelb-bouldering-tape` project (https://unimelb-bouldering-tape.vercel.app). Pushing to GitHub does not deploy; run:

```sh
pnpm deploy:prod
```

## Where things live

- `src/content/site.ts` — all copy and data (events, committee, sponsors, FAQ). Committee names are real; everything else (dates, venues, prices, sponsors, links) is placeholder.
- `src/site/` — the layout (`Layout.tsx`), every page (`pages.tsx`), the tape and hold graphics (`Tape.tsx`) and the page list (`routes.ts`).
- `src/components/shared/` — reusable pieces (image slot, page transitions, contact form, event filter, mobile menu).
- `src/components/ui/` — shadcn/ui components.
- `src/index.css` — theme tokens (colours, fonts, radius) under `:root`.

Images are empty `ImageSlot` boxes for now, apart from the home page hero (`public/hero.png`). Each event has an `images` array meant to be filled from its Instagram post; `EventCarousel` shows them as a swipeable carousel. The contact form has no backend yet and opens the visitor's email app instead.
