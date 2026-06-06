# Deferred Work

Items intentionally deferred from the QA fix pass. These are known issues that require external input (real business data, photography, domain configuration) and cannot be resolved in code alone.

## Content Placeholders

- **`siteConfig` TODO values** — Address, phone, email, license number, and social URLs in `config/site.config.ts` use placeholder values. Pending real business information from the owner.
- **No real images** — All photo paths in content frontmatter (`coverImage`, `avatarPath`, `gallery`, `heroImage`) reference files that don't exist in `public/assets/`. The `resolvePublicImage()` helper returns SVG placeholders at runtime. Pending professional photography or stock photo selection.
- **Legal pages reference "pilotpainters.com"** — Privacy Policy and Terms of Service body copy reference the domain `pilotpainters.com`, but the site is currently deployed at `pilotpainters.github.io/pilotmainsite`. This resolves automatically when the custom domain swap happens.

## Performance

- **Lighthouse LCP** — Placeholder SVG images inflate Largest Contentful Paint times on image-heavy pages. Real optimized images (WebP/AVIF via Astro's `<Image>` component with imported assets) will improve scores significantly.
