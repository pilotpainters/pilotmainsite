# Pilot Painters — QA Fix Pass Audit

Status legend: ✅ Fixed | ⏸️ Deferred | ❌ Open

## Critical (6/6 Fixed)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| C1 | "Our Process" footer link → 404 | ✅ Fixed | Removed from `navigation.config.ts`; link no longer appears in footer. |
| C2 | Aggregate rating conflict (hardcoded vs computed) | ✅ Fixed | Created `src/lib/reviews.ts` with `computeAggregateRating()`. Home + Reviews pages both use it. Home page hides rating when count < 5. JSON-LD updated accordingly. |
| C3 | Mobile header has no navigation | ✅ Fixed | New `MobileNav.astro` — slide-in drawer with focus trap, Escape key, backdrop dismiss, scroll lock, full ARIA. Inline vanilla JS (~40 lines). |
| C4 | Reviews page script outside `</html>` | ✅ Fixed | Script + style blocks moved inside `<BaseLayout>` with `is:inline`. Confirmed script is inside `<body>` in production output. |
| C5 | Contact form `novalidate` disabling validation | ✅ Fixed | Removed `novalidate={false}` attribute. Native browser validation now active. |
| C6 | Legal page titles doubled ("… Pilot Painters \| Pilot Painters") | ✅ Fixed | Stripped brand suffix from all `seo.title` fields in content. `SEOHead` now guards against double-append. All 11+ pages verified. |

## Medium (9/9 Fixed)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| M1 | Legal page section spacing broken (`[&+section]:mt-10`) | ✅ Fixed | Replaced with `space-y-10` on parent container in `LegalPageLayout.astro`. |
| M2 | Legal dates timezone shift | ✅ Fixed | `src/lib/dates.ts` now uses `{ timeZone: 'UTC' }` in all formatters. Added `formatFullDate()` helper used by legal pages. |
| M3 | Reviews filter ARIA mismatch (`role="radiogroup"` with buttons) | ✅ Fixed | Changed to `role="group"` with `aria-label`. Buttons retain `aria-pressed`. |
| M4 | Section component ignoring `aria-labelledby` attribute | ✅ Fixed | Section now accepts both `labelledby` prop and native `aria-labelledby`/`aria-label` attributes. |
| M5 | `Image` component misused with string URLs | ✅ Fixed | Replaced `<Image>` with `<img>` on reviews, home, projects index, project detail, services index, and about pages — anywhere `src` is a public-path string. Added `decoding="async"` to all. |
| M6 | `StarRating` non-deterministic IDs (`Math.random()`) | ✅ Fixed | Replaced with module-level counter (`sr0`, `sr1`, …). Two consecutive builds produce identical output (verified via `diff`). |
| M7 | Honeypot input missing `aria-hidden` | ✅ Fixed | Added `aria-hidden="true"` to the hidden spam-trap input. `tabindex="-1"` and `autocomplete="off"` preserved. |
| M8 | Founding year inconsistency | ✅ Fixed | Set `foundedYear: 2018` in `site.config.ts`. Trust strip shows "8+" dynamically. About page, footer copyright (`2018–2026`), and JSON-LD `foundingDate` all derive from this single value. |
| M9 | Canonical URL trailing-slash inconsistency | ✅ Fixed | `SEOHead` now normalizes all canonical URLs to always include a trailing slash. Verified across home, services, projects, about, contact, reviews, privacy, terms, cookies. |

## Structural Low Fixes (7/7 Fixed)

| # | Issue | Status | Notes |
|---|-------|--------|-------|
| L1 | Footer restructured to 4 columns | ✅ Fixed | Brand · Services · Company · Legal. Responsive: 1-col mobile → 2-col tablet → 4-col desktop. |
| L2 | 404 page created | ✅ Fixed | `src/pages/404.astro` + `content/pages/notfound.md`. Compass icon, "404", friendly message, two CTAs. `dist/404.html` generated at root. |
| L3 | Legal pages use Section/Container components | ✅ Fixed | `LegalPageLayout` now uses `<Section>` for hero and body areas instead of raw `<section>` elements. |
| L4 | `prose-legal` styles defined | ✅ Fixed | Added to `src/styles/global.css` under `@layer components`. Covers p, a, strong, em, ul, ol, li, blockquote, hr, code, pre, table, th, td. Uses Tailwind utilities (design token-based). |
| L5 | Stray `key=` attributes removed | ✅ Fixed | Removed from home page testimonial star icons. Grep confirms zero `key={` occurrences in `.astro` files. |
| L6 | External links open in new tabs | ✅ Fixed | Custom `marked` renderer in `LegalPageLayout` adds `target="_blank" rel="noopener noreferrer"` to all external links (href starting with `http`/`https` not matching site origin). |
| L7 | Footer social icons accessible naming | ✅ Fixed | Each social link now has `aria-label="Visit Pilot Painters on [Network]"`. |

## Deferred (Not Fixed This Phase)

| Issue | Status | Reason |
|-------|--------|--------|
| `siteConfig` TODO placeholder values | ⏸️ Deferred | Pending real business info. |
| No real images anywhere | ⏸️ Deferred | Pending photography phase. |
| Legal pages reference `pilotpainters.com` | ⏸️ Deferred | Resolves with custom domain swap. |
| Lighthouse LCP from placeholder images | ⏸️ Deferred | Real optimized images will resolve. |

See `DEFERRED-WORK.md` for full details.

## Build Verification

- `npm run build`: ✅ 20 pages built in ~1.5s, zero warnings
- Deterministic output: ✅ Two consecutive builds produce identical `dist/` (diffed)
- All routes generated: ✅ Including `/404.html`, all legal pages, all project/service pages
- Title format: ✅ `[Page Title] | Pilot Painters` — verified across 11 page types
- Canonical URLs: ✅ All have trailing slashes — verified across 11 page types

## Lighthouse Scores (headless Chrome, localhost preview)

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| `/` (Home) | 57 | 93 | 100 | 92 |
| `/services/interior-painting/` | 62 | 96 | 100 | 92 |

Performance scores are low due to placeholder SVG images inflating LCP — this is a known deferred item. Accessibility, Best Practices, and SEO are all 92+. Real optimized images will substantially improve Performance scores.
