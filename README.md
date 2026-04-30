# Pilot Painters — Marketing Site

Static marketing site for Pilot Painters, built with **Astro + TypeScript + Tailwind**, deployed to **GitHub Pages**.

This repo is the **foundation**: a clean, scalable scaffold where every visible string, color, and font flows from a config layer. Page content (Home, Services, Gallery, Contact, About, etc.) is added in subsequent phases.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321/pilotmainsite/
npm run build    # outputs static site to ./dist
npm run preview  # serve the built dist/ locally
npm run lint     # ESLint over .ts / .astro
npm run format   # Prettier over the workspace
```

Node version is pinned in [`.nvmrc`](.nvmrc) (Node 22). Use `nvm use` if you have nvm installed.

---

## Project structure

```text
pilotmainsite/
├── .github/workflows/deploy.yml   # GH Pages CI
├── astro.config.mjs               # site, base, integrations
├── tailwind.config.ts             # imports tokens from /config
├── tsconfig.json                  # path aliases @/, @config/, @content/
├── config/                        # SOURCE OF TRUTH for visible content
│   ├── site.config.ts             # company info, contact, SEO defaults
│   ├── theme.config.ts            # colors, spacing, radii
│   ├── typography.config.ts       # fonts, weights, type scale
│   └── navigation.config.ts       # header nav, footer columns, CTAs
├── content/                       # Content Collections (Markdown/MDX)
│   ├── services/
│   ├── projects/
│   ├── testimonials/
│   └── pages/
├── public/
│   ├── assets/
│   │   ├── logos/                 # brand marks
│   │   └── images/                # general site imagery
│   └── robots.txt
└── src/
    ├── content/config.ts          # Zod schemas for content collections
    ├── components/
    │   ├── layout/                # Header, Footer, Container
    │   ├── ui/                    # Button, Card, Section
    │   └── seo/                   # SEOHead (+ LocalBusiness JSON-LD)
    ├── layouts/BaseLayout.astro
    ├── lib/url.ts                 # base-path-aware URL helpers
    ├── pages/index.astro          # blank scaffold page
    └── styles/global.css          # Tailwind entry
```

---

## Strict separation of concerns

### `/config` is the only source of truth for visible content

- **`config/site.config.ts`** — company name, tagline, phone, email, address, service areas, social links, business hours, license/insurance, and SEO defaults.
- **`config/theme.config.ts`** — design tokens (color palette, spacing scale, border-radius scale).
- **`config/typography.config.ts`** — font families, font weights, and a typographic scale (h1–h6, body, small, caption) where each entry carries `size`, `lineHeight`, `letterSpacing`, and `weight`.
- **`config/navigation.config.ts`** — header nav items, footer columns, primary/secondary CTA labels.

`tailwind.config.ts` reads from `theme.config.ts` and `typography.config.ts` directly. **Never** redefine colors, spacing, or font metrics in components or in Tailwind config — edit the config files instead.

### Updating theme tokens

Change the brand color, swap a font, or tweak the spacing scale by editing the relevant file in `/config`. Tailwind utilities like `bg-primary`, `text-h2`, `rounded-md`, etc., update automatically — no other touch points.

### `/content` for long-form / repeatable content

Content lives in Markdown/MDX under `/content/<collection>` and is type-checked at build time by Zod schemas declared in [`src/content/config.ts`](src/content/config.ts).

To add a service:

```bash
# /content/services/interior.md
---
title: Interior Painting
slug: interior
summary: Bedrooms, kitchens, trim — meticulous prep and a flawless finish.
features:
  - Drywall repair and patching
  - Premium low-VOC paints
  - Two-coat coverage standard
order: 1
---
Long-form description here…
```

Same pattern for `projects/`, `testimonials/`, and `pages/`. See [`src/content/config.ts`](src/content/config.ts) for the exact schema of each collection.

---

## Brand palette

Defined in [`config/theme.config.ts`](config/theme.config.ts):

| Token             | Hex       | Usage                                 |
| ----------------- | --------- | ------------------------------------- |
| `primary`         | `#0BA5EC` | Signature cyan (logo swoosh) — CTAs, links, accents |
| `primary-dark`    | `#0284C7` | Hover states for primary              |
| `primary-light`   | `#7DD3FC` | Subtle backgrounds, on-dark accents   |
| `brand-black`     | `#0A0A0A` | Wordmark / deep contrast              |
| `brand-white`     | `#FFFFFF` | Page background                       |
| `neutral-{50…900}`| slate     | Surfaces, body copy, headings         |
| `accent`          | `#F97316` | Sunset orange — high-conversion CTAs  |
| `success`         | `#10B981` | Confirmation states                   |
| `warning`         | `#F59E0B` | Cautions                              |
| `error`           | `#EF4444` | Errors / destructive actions          |

Default surface treatment: white / `neutral-50` backgrounds, `neutral-900` headings, `neutral-700` body text.

---

## SEO foundation

[`src/components/seo/SEOHead.astro`](src/components/seo/SEOHead.astro) handles `<title>`, meta description, canonical URL, full Open Graph + Twitter card tags, and emits a default `LocalBusiness` JSON-LD block built from `siteConfig` (NAP, hours, areaServed, sameAs).

Pass an extra `jsonLd` prop on a per-page basis to append `Service`, `Review`, `FAQPage`, etc., schema once those pages are built.

`@astrojs/sitemap` generates `sitemap-index.xml` automatically; [`public/robots.txt`](public/robots.txt) points at it.

---

## Navigation

The header **Services** item links to [`/services/`](src/pages/services/index.astro). On **desktop** (`md` and up), a **CSS-only** hover / `:focus-within` submenu lists every entry from the `services` content collection (no client-side JavaScript). On **smaller viewports**, the primary nav is collapsed in the current layout; users still reach every service via the **Services** link to the index page, where the full grid is listed. The footer **Services** column is built from the same collection at build time (`source: 'services'` in [`config/navigation.config.ts`](config/navigation.config.ts)).

---

## Deployment

A push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which:

1. Installs deps (`npm ci`)
2. Builds the site (`npm run build`)
3. Publishes `./dist` to the **`gh-pages`** branch via `peaceiris/actions-gh-pages@v4`

In GitHub repo settings → **Pages**, set the source to **Deploy from a branch → `gh-pages` / `(root)`**.

### Switching to a custom domain

1. In [`astro.config.mjs`](astro.config.mjs), set `site` to your domain (e.g. `https://pilotpainters.com`) and remove `base` (or set it to `'/'`).
2. In [`config/site.config.ts`](config/site.config.ts), update `seo.siteUrl` to the same value.
3. Update the `Sitemap:` URL in [`public/robots.txt`](public/robots.txt).
4. Add `public/CNAME` containing the bare domain (e.g. `pilotpainters.com`).
5. Configure the DNS A/CNAME records and enable the custom domain in the repo's **Pages** settings.

---

## Tech stack

- [Astro 5](https://astro.build/) — zero-JS by default, file-based routing, native MD/MDX
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS 3](https://tailwindcss.com/) via `@astrojs/tailwind`
- [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) for rich content
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) for `sitemap-index.xml`
- ESLint 8 + Prettier + EditorConfig (consistent formatting)

> Note on ESLint: this repo uses the legacy `.eslintrc.cjs` config format with ESLint 8. To migrate to ESLint 9 flat config later, replace `.eslintrc.cjs` with `eslint.config.js` and bump `eslint` accordingly.

---

## Before going live (checklist)

- Update `config/site.config.ts`:
  - Replace all `TODO:` placeholders (address, service areas, phone/email, license #, social links).
  - Set a real `seo.siteUrl` matching your deployed URL.
  - Replace `seo.defaultOgImage` with a dedicated Open Graph image (logo is a temporary fallback).
- Add real photos under `public/assets/images/` matching the paths in `/content` frontmatter.
- Validate Lighthouse + accessibility in Chrome DevTools.
