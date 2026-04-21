

## Portfolio v2 — Multi-Page Architecture + Content Refresh

### 1. Home Page Edits

**Bento Grid (`BentoGrid.tsx`)**
- Remove the "Discipline" box (6'2" / 80kg).
- Re-balance the asymmetric grid so it closes seamlessly. New layout (6-col):
  ```text
  ┌───────────────────────┬───────────────────────┐
  │ Academics (3x2)       │ Strategy / 1420 (3x1) │
  │                       ├───────────────────────┤
  │                       │ Recognition (3x1)     │
  ├───────────┬───────────┴───────────┬───────────┤
  │ Hardware  │ Process (terminal)    │ (auto)    │
  │ (2)       │ (3)                   │ (1 spacer)│
  └───────────┴───────────────────────┴───────────┘
  ```
  Final tiles: Academics (3×2), Strategy (3), Recognition (3), Hardware (2), Process (4). Verify on mobile stacking.

**Hero CTA (`Hero.tsx`)**
- Add a third primary CTA: a glowing cyan pill linking to `https://tradeky.in` (target `_blank`, rel `noopener`). Style: `bg-primary text-primary-foreground` with `cyan-glow-strong`, animated pulse ring, "↗" indicator. Label: `LIVE → tradeky.in`. Place as the first button in the CTA row so it dominates.

**Footer (`Footer.tsx`)**
- Add minimalist social dock: LinkedIn, GitHub, Instagram. Use lucide-react icons (`Linkedin`, `Github`, `Instagram`) inside square brutalist border buttons that glow cyan on hover. Replace the current `Terminal/Proof` button column with the social dock; keep the existing terminal-style address column. Add a subtle "tradeky.in ↗" highlight link in the brand block.
- URLs: placeholders `linkedin.com/in/rishabhshukla`, `github.com/rishabh-shukla`, `instagram.com/rishabh.shukla` (will note in chat that these need real handles).

### 2. Routing & Page Transitions

**Router (`App.tsx`)**
- Add routes:
  - `/projects/tradeky` → `TradeKyPage`
  - `/projects/regulon` → `RegulonPage`
  - `/projects/kyte` → `KytePage`
- Wrap `Routes` in a `PageTransition` wrapper using `key={location.pathname}` + CSS animation (`animate-fade-up` + scale 0.99→1 over 500ms with cubic-bezier(0.22,1,0.36,1)). Scroll-to-top on route change.

**Projects list (`Projects.tsx`)**
- Replace expand/collapse interaction with router links. Each card becomes a `<Link to="/projects/{id}">` with a "Open Dossier →" CTA on the right (replaces the Expand chip). Keep tilt + hover glow. Remove the expandable section (long copy now lives on the dedicated page).

### 3. Dedicated Project Page Architecture

Create one shared layout primitive `src/components/portfolio/ProjectLayout.tsx` that all three pages consume. It renders:

- Persistent `StatusBar` (already global-friendly) and `MiniRishabhTerminal` (mounted in the layout component used by every page route, so it floats on sub-pages too).
- **Back dock** (fixed, top-left under status bar): `← BACK_TO_TERMINAL` link to `/`, brutalist border, cyan hover. Uses scramble effect on mount.
- **Hero band**: scramble-decrypt header, role chip, breadcrumb (`HOME / PROJECTS / TRADEKY`), tag line ("DOSSIER 01 // INSTITUTIONAL"). Subtle `grid-pattern` background + small ParticleNetwork at 30% opacity.
- **Two-column technical body** (no blog-feel):
  - Left col (7/12): `THE PROBLEM` block (terminal-style `>` lead-in, monospace), then `WHAT I BUILT` rendered as numbered execution log entries (`[01]`, `[02]`, `[03]`) inside a bordered shell with a faux-terminal title bar (`~/build_log — zsh`). Each entry uses scramble-on-scroll for its title verb.
  - Right col (5/12): sticky stat block grid, tech stack as a pixel-grid of bordered tiles, and a primary outbound CTA when `link` exists.
- **Footer band**: "NEXT DOSSIER →" linking to the next project in cycle (Tradeky→Regulon→Kyte→Tradeky). Plus the same global `Footer`.

Each individual page file (`TradeKyPage.tsx`, `RegulonPage.tsx`, `KytePage.tsx`) is a thin wrapper that passes a typed `ProjectDossier` data object into `ProjectLayout`.

### 4. Dossier Content (verbatim from brief)

Stored as typed objects in `src/data/projects.ts`:

- **TradeKy** — Header "TradeKy — The Operating System for Modern Traders & RIAs" · Role "Founder & Lead Architect" · Problem + 3 build entries · Stack: Python, C++, FastAPI, AngelOne SmartAPI, NLP/LLMs, Pandas, NumPy · Link: `tradeky.in`. Stat block: `EXEC <50ms`, `BROKER AngelOne`, `MODE Paper+Live`, `TENANCY Multi`.
- **Regulon** — Header "Regulon — Zero-Leakage Regulatory Intelligence" · Role "Backend & Systems Architect" · Problem + 3 build entries · Stack: TypeScript, Express.js, Supabase (PostgreSQL), React, Deno, TanStack Query, Node.js, Cheerio. Stat block: `PORTALS 7`, `CRON_JOBS 12`, `ENDPOINTS 40+`, `PERSONAS 5`.
- **Kyte** — Header "Kyte — High-Concurrency Spatial Routing" · Role "Founder & Full-Stack Developer" · Problem + 3 build entries · Stack: JavaScript (Node.js), Express, MongoDB, Google Maps API. Stat block: `GEO_QUERY <150ms`, `NODES 500+`, `RADIUS 50km`, `MAPS Google`.

### 5. Animation & Vibe Consistency

- Scramble decryption on each page header + section eyebrows (reuse `useScramble`).
- Tilt on stat tiles (reuse `useTilt`).
- Page transition: 500ms fade + 4px translate-up + 0.005 scale via keyframe class added to `index.css` (`animate-page-enter`).
- Scanline overlay on the build-log shell.
- `MiniRishabhTerminal` stays mounted at the app root inside the router, so it persists across navigations without remounting (preserves chat history).

### 6. Files to Create / Modify

**Create**
- `src/data/projects.ts` — dossier content + types.
- `src/components/portfolio/ProjectLayout.tsx` — shared dossier layout.
- `src/components/portfolio/PageTransition.tsx` — route transition wrapper.
- `src/components/portfolio/SocialDock.tsx` — icon dock used in footer.
- `src/pages/projects/TradeKy.tsx`
- `src/pages/projects/Regulon.tsx`
- `src/pages/projects/Kyte.tsx`

**Modify**
- `src/App.tsx` — add 3 routes, lift `MiniRishabhTerminal` + `StatusBar` + `Footer` out of `Index` into a layout that wraps all routes; wrap `<Routes>` in `PageTransition`.
- `src/pages/Index.tsx` — remove components now in layout.
- `src/components/portfolio/BentoGrid.tsx` — delete Discipline tile, rebalance grid spans.
- `src/components/portfolio/Hero.tsx` — add `tradeky.in` CTA.
- `src/components/portfolio/Footer.tsx` — swap nav buttons for `SocialDock`, add `tradeky.in` highlight.
- `src/components/portfolio/Projects.tsx` — convert cards to `<Link>` route entries; drop expandable body.
- `src/index.css` — add `@keyframes page-enter` + `.animate-page-enter` utility, plus `.animate-fade-up` if not yet defined.

### 7. Open Items (will use placeholders, you can swap later)

- Real LinkedIn / GitHub / Instagram handles — currently using guesses; flag in chat after build so you can correct.

