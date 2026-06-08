## Goal
Transform the portfolio into a polished, recruiter-grade site. Lock in **Emerald Prestige + Gold** palette, **Libre Baskerville + IBM Plex Sans** typography, and a **magazine** layout. Strip out the "sketchy" cyber-terminal styling (cyan glows, scanlines, ticker tapes, A.R.I.A. robot, scramble text, ASCII chrome) and replace with a clean editorial aesthetic.

## Content updates
- Rename **Regulon → Sannidh** everywhere (data, routes `/projects/regulon` → `/projects/sannidh`, page file, dossier id, links).
- Add live link **www.sannidh.in** to the Sannidh dossier.
- Add **InternPe — Software Development Intern** (Jun 2026 – Present) as a new experience entry surfaced in Hero subhead and a new "Experience" section.

## Design system (index.css + tailwind.config.ts)
- `--background: 40 30% 97%` (warm paper), `--foreground: 160 35% 8%` (deep emerald-black).
- `--primary: 160 78% 17%` (#064e3b emerald), `--primary-glow: 158 70% 26%`.
- `--accent: 43 56% 54%` (#c9a84c gold), `--surface: 40 25% 94%`, `--border: 40 15% 85%`.
- Fonts: `--font-display: "Libre Baskerville", serif` (headings), `--font-sans: "IBM Plex Sans"` (body), `--font-mono: "IBM Plex Mono"` (small labels only).
- Remove: cyan glow utilities, scanline, grid-pattern (replace w/ subtle paper texture), terminal greens/ambers, ticker animation.
- Add: `gold-rule` divider, refined `fade-up`, `editorial-drop-cap` for first paragraph, subtle shadow tokens.

## Page architecture (magazine layout)
1. **TopBar** (replaces StatusBar): minimal — name mark left, nav (Work · Experience · About · Contact) center, "Resume ↗" + "sannidh.in ↗" right. No live clock, no ticker.
2. **Hero**: editorial masthead. Left col (7/12) — small kicker "Portfolio · 2026", giant serif name "Rishabh Shukla.", one-line proposition, two-line bio mentioning JIIT + InternPe + TradeKy, primary CTA "View Work" + ghost "Download Résumé". Right col (5/12) — single professional portrait/avatar card with gold rule, caption "Bengaluru, IN · Currently @ InternPe". **Remove robot video, particles, scanlines.**
3. **Featured Work** (magazine grid): one large featured project (TradeKy) + two smaller (Sannidh, Kyte). Each card: serif title, role line, 2-sentence description, stack chips, "Read case →".
4. **Experience** (new section): timeline list — InternPe (Jun 2026 – Present, Software Dev Intern), TradeKy (Founder, 2025 – Present), plus an "Education — JIIT, B.Tech CSE" row.
5. **Capabilities** (replaces BentoGrid): 6 clean cards in a 3-col grid — Systems Architecture, Low-Latency Execution, Backend & APIs, Data Pipelines, Algorithmic Trading, Full-Stack Product. No tilt/cyber styling — flat editorial cards with gold accent line.
6. **Tech Stack** (replaces TechMarquee): static categorized grid (Languages · Backend · Data · Infra) — no marquee scroll.
7. **Contact**: large serif headline "Let's build something serious.", email + Calendly-style CTA, social links inline (GitHub, LinkedIn, X, Email). Remove ASCII art.
8. **Footer**: minimal — name, role, location, © year, build badge removed.

## Components to remove / retire
- `ParticleNetwork`, `MiniRishabhTerminal` (or hide behind a subtle "Ask AI" link in footer — recruiters won't engage), the cyber `StatusBar` ticker.
- `useScramble` usage in Hero (replace with static text or one-time fade-in).
- Robot video block entirely.

## Components to add
- `TopBar.tsx`, `Experience.tsx`, `Capabilities.tsx`, `TechStack.tsx` (replaces marquee).

## Project dossier page (`ProjectLayout`)
- Re-skin to editorial article style: serif title, gold horizontal rule, two-column body (problem | solution), stack as chips, stats as a clean 4-up row, "Visit live ↗" button using primary emerald. Keep prev/next nav with refined typography.

## Routes
- `/projects/regulon` → `/projects/sannidh`. Update `App.tsx`, file rename `pages/projects/Regulon.tsx` → `Sannidh.tsx`, all internal links in `Projects.tsx` + dossier `next` chain.

## Technical details
- Update `index.html`: swap Google Fonts link to load **Libre Baskerville (400, 700)**, **IBM Plex Sans (300, 400, 500, 600)**, **IBM Plex Mono (400, 500)**. Update `<title>` to `Rishabh Shukla — Software Engineer & Founder`. Update meta description to remove "skipping sleep" / "$10B" hype.
- `tailwind.config.ts`: change `fontFamily.sans` → `IBM Plex Sans`, `fontFamily.display` → `Libre Baskerville`, `fontFamily.mono` → `IBM Plex Mono`. Add `colors.gold` token.
- `App.tsx`: replace `StatusBar` import with `TopBar`. Drop `MiniRishabhTerminal` from shell (or wrap behind footer link).
- All component-level cyan/`cyan-glow*`/`scanline`/`grid-pattern`/`font-display`(Space Grotesk) references swept and replaced with the new tokens.
- Keep `PageTransition`, `useScramble` hook file (unused), `useTilt` (may reuse subtly or drop).

## Tone changes (copy)
- Replace "Architecting $10B Financial Infrastructure. Engineering Execution Edge." → "Software engineer and founder building low-latency systems for capital markets."
- Replace "sleep is optional", "Skipping sleep", "Talk to Mini-Rishabh" hype copy with measured professional phrasing.
- Hero bio: "Computer Science undergraduate at JIIT. Software Development Intern at InternPe. Founder of TradeKy, building NLP-driven execution infrastructure for RIAs."

## Out of scope
- Backend / database changes (none needed).
- New routes beyond Sannidh rename.
- The Mini-Rishabh edge function stays; it is just not surfaced on the homepage.