# Lewis Gomez — Portfolio

Personal portfolio site for Lewis Gomez, Senior Software Development Engineer at Amazon.

Live at: [https://lewgomz.com](https://lewgomz.com)

## Stack

- **React 18** + **TypeScript**
- **Vite 8** (migrated from CRA)
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion** — scroll-triggered and entrance animations
- **@dnd-kit** — drag-to-reorder skill tags
- **React Router v6**
- Deployed to **GitHub Pages** via `gh-pages`

## Project Structure

```
src/
  components/
    Header.tsx          # Nav bar with theme toggle
    Footer.tsx          # Slim footer
    Content.tsx         # Hero, bio, draggable skill tags
    Timeline.tsx        # Experience timeline
    blurp/
      LittleBlurbs.tsx  # Post preview cards
      LittleBlurb.tsx   # Individual post detail
      Blurbs.tsx        # Highlight cards
      BlurpConfigs.ts   # Static post/highlight data
  services/
    BlurbService.ts     # Data access layer
  lib/
    utils.ts            # shadcn cn() helper
```

## Commands

```bash
npm run dev       # Start dev server at localhost:5173
npm run build     # Production build -> dist/
npm run deploy    # Build + push to gh-pages branch
```

## Features

- Dark / light mode toggle
- Scroll-in and scroll-out section animations
- Draggable, reorderable skill badges
- Animated experience timeline with hover effects
- Post detail pages with back navigation
