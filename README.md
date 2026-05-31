# Lewis Gomez — Portfolio

Personal portfolio site for Lewis Gomez, Senior Software Development Engineer at Amazon.

Live at: **[https://lewgomz.com](https://lewgomz.com)**

---

## Tech Stack

| Layer | Tooling |
|---|---|
| Framework | [React 18](https://react.dev/) + [TypeScript 5.6](https://www.typescriptlang.org/) |
| Build tool | [Vite 8](https://vitejs.dev/) (`@vitejs/plugin-react`) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` |
| UI primitives | [shadcn/ui](https://ui.shadcn.com/) + [@base-ui/react](https://base-ui.com/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Animation | [framer-motion](https://www.framer.com/motion/) |
| Drag & drop | [@dnd-kit](https://dndkit.com/) (sortable skill tags) |
| Diagrams | [@xyflow/react](https://reactflow.dev/) (project architecture diagrams) |
| Icons | [lucide-react](https://lucide.dev/) |
| Fonts | `@fontsource-variable/geist` |
| Hosting | [GitHub Pages](https://pages.github.com/) (via Actions) |
| DNS | [Cloudflare](https://www.cloudflare.com/) |

---

## Project Structure

```
portolio-ui/
├── .github/workflows/deploy.yml   # CI/CD: builds + deploys to GitHub Pages on push to main
├── public/
│   ├── CNAME                      # Custom domain marker (lewgomz.com) — required for GitHub Pages
│   ├── lew-avatar.JPG
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.tsx                    # Root component: theme state, routes, layout
│   ├── index.tsx                  # React entrypoint, mounts <BrowserRouter>
│   ├── index.css                  # Tailwind directives + shadcn theme variables
│   ├── components/
│   │   ├── Header.tsx             # Nav bar with theme toggle
│   │   ├── Footer.tsx
│   │   ├── Content.tsx            # Hero, bio, draggable skill tags
│   │   ├── Timeline.tsx           # Experience timeline (scroll-triggered)
│   │   ├── blurp/                 # Blog-style preview cards + detail page
│   │   │   ├── Blurbs.tsx
│   │   │   ├── LittleBlurbs.tsx
│   │   │   ├── LittleBlurb.tsx
│   │   │   └── BlurpConfigs.ts
│   │   ├── projects/              # Architecture diagram pages
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   ├── DiagramRenderer.tsx (xyflow)
│   │   │   └── ProjectConfigs.ts
│   │   └── ui/                    # shadcn primitives (button, card, badge, avatar, separator)
│   ├── data/TimelineConfigs.ts
│   ├── services/                  # Thin data-access layer over static configs
│   │   ├── BlurbService.ts
│   │   └── ProjectService.ts
│   └── lib/utils.ts               # shadcn `cn()` helper
├── components.json                # shadcn config
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Routing

| Path | Component |
|---|---|
| `/` | `Content` (home: hero + bio + skills + timeline + blurbs + projects) |
| `/post/:id` | `LittleBlurb` (blog-style detail page, lazy-loaded) |
| `/projects/:id` | `ProjectDetail` (architecture diagram, lazy-loaded) |
| `*` | `NotFound` |

### Vite config notes

- `base: '/'` — site is served from the apex (`lewgomz.com`), not a subpath
- Path alias: `@` → `./src`
- Manual chunk splitting in [vite.config.ts](vite.config.ts) for `@xyflow`, `framer-motion`, `@dnd-kit`, and React — keeps the initial bundle slim

---

## Local Development

Requires Node 20+ and npm.

```bash
npm install --legacy-peer-deps   # Tailwind v4 / shadcn need this flag
npm run dev                      # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc` typecheck + `vite build` → `dist/` |
| `npm run preview` | Serve `dist/` locally for smoke-testing the prod build |

---

## Deployment

### Pipeline (GitHub Actions → GitHub Pages)

Every push to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

1. **build** job — checks out the repo, installs deps (`npm ci --legacy-peer-deps`), runs `npm run build`, uploads `dist/` as a Pages artifact.
2. **deploy** job — publishes the artifact to the `github-pages` environment via `actions/deploy-pages@v4`.

There is no `gh-pages` branch push step anymore; the workflow uses GitHub's first-party Pages deployment (configured under **Repo → Settings → Pages → Source: GitHub Actions**).

### Custom domain (lewgomz.com)

The custom domain is wired up across three places:

1. **`public/CNAME`** — contains `lewgomz.com`. Vite copies it into `dist/` at build time; GitHub Pages reads it on each deploy and sets the site's custom domain.
2. **GitHub Pages settings** — under **Repo → Settings → Pages**, the custom domain is set to `lewgomz.com` and **Enforce HTTPS** is enabled.
3. **Cloudflare DNS** — the `lewgomz.com` zone proxies traffic to GitHub Pages.

#### Cloudflare DNS records

Follow GitHub's official guide for [configuring an apex domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain):

- Four `A` records on `@` pointing to GitHub's published Pages IPs (see the link above for the current list).
- One `CNAME` on `www` pointing to your `<username>.github.io` host.

> **Important:** keep the Cloudflare proxy **disabled** (grey cloud, DNS-only) for these records. GitHub Pages issues its own Let's Encrypt cert from the CNAME; turning on the orange-cloud proxy puts Cloudflare's edge cert in front, which breaks GitHub's cert provisioning and SSL verification under "Enforce HTTPS."

If a future Cloudflare-proxied setup is desired, switch GitHub Pages to **HTTPS off**, enable the orange cloud, and configure Cloudflare SSL mode to **Full** with an origin certificate.

### Deploying manually

You shouldn't need to — pushing to `main` is the deploy. If the workflow fails, fix and re-push (or re-run the failed job from the Actions tab).

### Rollback

Revert the offending commit on `main` and push; the workflow redeploys the previous state. There's no separate hotfix branch — `main` is always live.

---

## Configuration Notes

- **`--legacy-peer-deps`** is required because Tailwind v4 + shadcn currently have peer-dep mismatches with React 18. The CI workflow uses the same flag.
- **Dark mode** is implemented by toggling a `dark` class on `<html>` from `App.tsx`; Tailwind v4 reads this via its class-based dark variant. Default is dark.
- **Lazy routes** (`LittleBlurb`, `ProjectDetail`) are code-split via `React.lazy` to keep the initial payload small.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Site returns 404 after deploy | `public/CNAME` was deleted — GitHub Pages reset the custom domain. Re-add it and push. |
| `https://lewgomz.com` shows SSL error | Cloudflare proxy got turned on. Toggle DNS records back to grey-cloud (DNS only). |
| `npm install` fails with ERESOLVE | Missing `--legacy-peer-deps` flag. |
| Routes work locally but 404 on direct load in prod | SPA fallback — for GitHub Pages this is handled because the 404 page falls back to `index.html` via the Pages SPA convention. If broken, ensure `dist/404.html` exists (Vite emits it for SPA routing). |
