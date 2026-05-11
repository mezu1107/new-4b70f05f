## Goal
Make SEO instant + dynamic across all pages, add banners to every page, give every inner page a premium hero with background image, and revamp the whole site to a consistent royal premium theme.

---

## Phase 1 — Premium Royal Theme Revamp (site-wide consistency)

Update `src/index.css` + `tailwind.config.ts` design tokens:
- **Primary**: Royal deep blue `hsl(222 60% 18%)` with glow `hsl(220 80% 55%)`
- **Accent**: Royal gold `hsl(43 85% 55%)` for premium feel
- **Background**: Soft ivory `hsl(40 30% 98%)` instead of plain white
- **Gradients**: `--gradient-royal` (deep blue → indigo → gold shimmer), `--gradient-hero-royal` (blue with gold particle accents)
- **Shadows**: Deeper elegant shadows with blue tint
- **Fonts**: Add `Playfair Display` (headings, royal serif) + keep `Inter` (body). Loaded via `index.html` Google Fonts
- Apply to header, footer, all cards, buttons site-wide via tokens (no per-component color overrides)

---

## Phase 2 — Universal Page Hero Component

Create `src/components/layout/PageHero.tsx`:
- Props: `title`, `subtitle`, `backgroundImage` (default per-page royal image), `breadcrumb`
- Background: full-bleed image + dark royal blue overlay (`bg-gradient-to-br from-primary/90 via-primary/80 to-accent/40`) for white text contrast
- Text: white headings (Playfair), gold accent underline, fade-up animation
- Replace existing hero blocks on About, Services, Portfolio, Blog, Contact, FAQ, Careers, Pricing, Testimonials, Case Studies, Service Detail
- Generate 4-6 royal hero background images via imagegen (abstract royal blue + gold geometric/architectural) and reuse per page

---

## Phase 3 — Instant Real-time SEO Engine

**a) Migration**: Add columns to `page_seo`:
- `primary_keyword text`
- `secondary_keywords text[]`
- `long_tail_keywords text[]`
- `seo_tags text[]` (auto-generated if empty)
- `auto_generate boolean default true`
- Add to `supabase_realtime` publication with `REPLICA IDENTITY FULL`

**b) New hook** `src/hooks/useSeo.ts`:
- Subscribes to `page_seo` realtime channel filtered by current `route`
- Auto-generates missing fields client-side from title + primary keyword (description ≤160 chars, tags from keywords, OG image fallback)
- Returns merged SEO object

**c) New component** `src/components/SeoHead.tsx`:
- Uses `react-helmet-async` to inject: `<title>`, meta description, keywords, OG tags, Twitter card, JSON-LD (Organization + WebPage schema), canonical
- Drop into every public page replacing inline Helmet usage
- Updates instantly (no reload) on admin save thanks to Realtime

**d) Update `PageSeoAdmin.tsx`**: add inputs for primary keyword, secondary keywords (comma list), long-tail keywords, auto-generate toggle, live preview of Google snippet

---

## Phase 4 — Site-wide Dynamic Banners

**a) Migration**: extend `popups` table OR create `page_banners` table:
- `page_route text` (or `*` for all)
- `position text` (top/middle/bottom)
- `title`, `subtitle`, `cta_text`, `cta_url`, `background_image`, `is_active`, `sort_order`
- Realtime enabled

**b) Component** `src/components/PageBanner.tsx`: renders banner slot, queries by route + position
**c) Inject** `<PageBanner position="top|middle|bottom" />` into `PageLayout` (top/bottom auto) — middle slot opt-in per page
**d) New admin** `BannersAdmin.tsx` + route `/admin/banners` in sidebar

---

## Phase 5 — Sitemap + SEO polish
- Auto-regenerate `public/sitemap.xml` build script entry
- robots.txt verified
- Add JSON-LD breadcrumbs in `PageHero`
- Lazy-load all hero images, add `alt` from title

---

## Out of scope
- No SSR (Vite SPA — meta tags injected client-side via Helmet, which Google now indexes fine)
- No payment changes
- No new admin modules beyond Banners

---

## Approval
Reply **approved** to start with Phase 1 (theme) → Phase 2 (heroes) → Phase 3 (SEO engine) → Phase 4 (banners) → Phase 5 (polish), or tell me which phase to do first / skip.
