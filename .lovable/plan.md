## Goal

Transform the current AM Enterprises site into a high-converting, AI-driven sales platform for US/Canada clients — **without redesigning from scratch**. The homepage will be rebuilt to **pixel-match the uploaded reference** (same hero, icons, sections, layout), with a **light theme as default** and a **dark/light toggle** (matching the reference exactly when in dark mode).

---

## Phase 1 — Theme System (light default + dark toggle)

- Rewrite `src/index.css` design tokens with **two complete palettes**:
  - **Light (default)**: white background `hsl(0 0% 100%)`, deep navy text, electric blue primary `hsl(217 91% 60%)`, soft glass surfaces
  - **Dark**: near-black navy `hsl(222 47% 6%)`, neon blue glow `hsl(217 91% 60%)`, glassmorphism cards (matches reference exactly)
- Add `next-themes` (or lightweight class toggle on `<html>`)
- Build a **ThemeToggle** component (sun/moon icon) placed in the Header — visible on every page
- All existing components keep working because they use semantic tokens (`bg-background`, `text-foreground`, etc.) — no per-component overrides

## Phase 2 — Homepage pixel clone of the reference

Rebuild `src/pages/Index.tsx` section-by-section to match the screenshot exactly. Every section uses semantic tokens so it auto-adapts to light/dark.

1. **Hero** — "AI-Powered Marketing Agency" pill, "We Generate Leads. You Get More Clients." (second line in blue), subhead with "USA & Canada" highlighted, two CTAs (Book Free Strategy Call + Get Free Audit), trust row (Google Partner, Meta Business Partner, Clutch 5.0, 100+ Happy Clients), animated dashboard mockup on the right with Google/Meta/AI floating icons
2. **Problems We Solve** — 3 cards (Wasted Ad Spend, No Quality Leads, No Tracking & Clarity) with neon icons
3. **Result-Focused Services** — 5 cards (Google Ads, Meta Ads, SEO Growth, Website Development, AI Marketing Automation) with the exact icons shown
4. **AI Systems That Give You An Unfair Advantage** — left list (5 AI systems) + right circular AI hub diagram with 5 orbiting nodes
5. **Real Results From Real Clients** — 4 metric cards with sparkline charts (+215%, -42%, +180%, +3.2x)
6. **Simple Process. Massive Results.** — 4 numbered steps (01–04) on the left, "Book Your Free Call" booking card on the right
7. **Footer** — 4-column with Quick Links / Services / Resources / Contact Us, social icons, repeat CTA

Generate any missing visuals (hero dashboard mockup, AI hub diagram, sparkline SVGs) via image-gen + inline SVG.

## Phase 3 — Wire up AI systems (working, not decorative)

- **AI Chatbot** — already exists (`ChatbotWidget` + `chatbot` edge function). Verify it's surfaced on every page and trained with current services + pricing in the system prompt.
- **AI Lead Qualification** — extend the chatbot edge function to score leads 0–100 and auto-tag in `chatbot_leads` (already partially there — finalize scoring rubric)
- **AI Ad Optimization Suggestions** — new edge function `ai-ad-suggestions` + admin panel widget that takes a campaign brief and returns optimization tips
- **AI Content & Ad Copy Generator** — new edge function `ai-copy-gen` + a public-facing "Free AI Ad Copy" lead magnet on the homepage (email gate → generates 3 variants)
- **AI CRM Automation** — DB trigger on new `chatbot_leads` → enqueue follow-up reminders in a new `crm_followups` table; surfaced in admin Dashboard
- All AI calls go through Lovable AI Gateway (`google/gemini-3-flash-preview` default, no extra API key)

## Phase 4 — Conversion & UX polish

- Sticky "Book Free Strategy Call" button in header on scroll
- WhatsApp floating button (already present) — verify number + visible on every page
- Booking calendar embed in the final hero card (Cal.com / native appointments table — uses existing `appointments` table)
- Smooth scroll between sections, fade-up animations on scroll (Intersection Observer, no heavy lib)
- Lead capture forms: validate, toast on success, write to `leads` table

## Phase 5 — QA pass

- **Performance**: lazy-load below-fold images, preload hero font, audit bundle
- **Responsive**: test 320 / 375 / 768 / 1280 / 1920 — fix any overflow
- **Functional**: every CTA goes somewhere, every form submits, chatbot opens, theme toggle persists across reload
- **Visual**: spacing rhythm (4/8/16/24), consistent radius, no orphaned colors
- **A11y**: alt text, focus rings, contrast in both themes

---

## Technical notes

- Theme: CSS variables on `:root` (light) and `.dark` selector; toggle adds/removes `.dark` on `<html>`; persisted via `localStorage`
- All AI features use existing Lovable Cloud + Lovable AI Gateway — no new API keys needed
- Icons stay **lucide-react** to match reference style
- The reference image is treated as design reference only, not embedded
- Existing admin panel, blog, services CMS, etc. remain untouched

---

## Out of scope for this round

- Server-side rendering
- Migrating to a new framework
- Building net-new admin modules beyond AI CRM follow-ups table
- Replacing the existing `.lovable/plan.md` royal-theme plan (this supersedes it for the homepage)

---

## Suggested execution order

Phase 1 (theme + toggle) → Phase 2 (homepage clone) → Phase 4 (conversion polish) → Phase 3 (AI systems) → Phase 5 (QA).

Phase 1+2 alone already delivers the visible "wow". Phase 3 makes the AI claim real.

---

**Reply `approved` to start with Phase 1 + 2 in one go**, or tell me which phases to skip / reorder. If you want me to do **only the pixel-clone homepage with light/dark toggle first** (fastest path to the visual you uploaded), say "homepage first".