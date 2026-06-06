# Placeholders to Replace Before Launch

Every item below must be swapped with real data before the site goes live.

## Site Config (`config/site.config.ts`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `phone` | `(555) 555-0100` | Real business phone number (display format) |
| `phoneTel` | `+15555550100` | Same number in E.164 / `tel:` format |
| `email` | `hello@pilotpainters.example` | Real monitored business email |
| `serviceAreas` | `TODO: Service Area 1`, `TODO: Service Area 2`, `TODO: Service Area 3` | Actual towns/regions served (feeds JSON-LD + footer) |
| `address.street` | `TODO: 123 Main Street` | Real street address |
| `address.city` | `TODO: City` | Real city |
| `address.region` | `TODO: ST` | Real state abbreviation (e.g. `IL`) |
| `address.postalCode` | `TODO: 00000` | Real ZIP code |
| `socials.facebook` | `https://facebook.com/pilotpainters` | Real Facebook page URL (or remove) |
| `socials.instagram` | `https://instagram.com/pilotpainters` | Real Instagram profile URL (or remove) |
| `socials.google` | `https://g.page/pilotpainters` | Real Google Business page URL (or remove) |
| `license` | `TODO: License # 0000000` | Actual license text/number |
| `insurance` | `Fully insured` | Specific accurate wording (carrier, limits) |
| `seo.defaultOgImage` | `/assets/logos/pilot-painters-logo-nbg.png` | Dedicated 1200×630 branded OG share image |
| `seo.siteUrl` | `https://pilotpainters.github.io/pilotmainsite` | Final production origin (e.g. `https://pilotpainters.com`) |

## Astro Config (`astro.config.mjs`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `site` | `https://pilotpainters.github.io` | Production site origin |
| `base` | `/pilotmainsite` | `/` when on a custom domain |

## Robots (`public/robots.txt`)

| Line | Current Value | What Goes Here |
|------|---------------|----------------|
| `Sitemap:` | `https://pilotpainters.github.io/pilotmainsite/sitemap-index.xml` | Sitemap URL on final domain |

## Custom Domain (`public/CNAME`)

| Item | Current Value | What Goes Here |
|------|---------------|----------------|
| CNAME file | Does not exist | Create with bare custom domain (e.g. `pilotpainters.com`) |

## Contact Form (`src/pages/contact.astro`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `form action` | `REPLACE_WITH_FORM_HANDLER_URL` | Real form endpoint (Formspree, Web3Forms, etc.) |

## Contact Page Content (`content/pages/contact.md`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `name.placeholder` | `Jane Smith` | Keep or replace with preferred hint text |
| `email.placeholder` | `jane@example.com` | Keep or replace (e.g. `you@email.com`) |
| `phone.placeholder` | `(555) 555-0100` | Example in real area code |
| `address.placeholder` | `123 Main St, Naperville, IL 60540` | Neutral example or shorter hint |

## Home Page Content (`content/pages/home.md`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `seo.image` | `/assets/logos/pilot-painters-logo-nbg.png` | Dedicated social preview image |
| `trustStrip.items[0].value` | `8+` (years) | Substantiated marketing stat |
| `trustStrip.items[1].value` | `900+` (projects) | Substantiated project count |
| `trustStrip.items[2].value` | `98%` (satisfaction) | Substantiated satisfaction rate |

## Reviews Page Content (`content/pages/reviews.md`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `seo.description` | Claims "4.9-star average" | Update to match computed average (currently 4.8 from 12 testimonials) or use vague wording |

## Legal Pages (`content/pages/privacy.md`, `terms.md`, `cookies.md`)

| Field / Location | Current Value | What Goes Here |
|------------------|---------------|----------------|
| `legalReviewBanner.enabled` (all 3 files) | `true` | Set to `false` after attorney review |
| `legalReviewBanner.message` (all 3 files) | Template disclaimer | Remove or update per counsel |
| Domain references in body copy (`privacy.md` line 38, `terms.md` line 38) | `pilotpainters.com` | Final production domain |
| Contact info in body copy (`privacy.md` lines 120–121, `terms.md` lines 101/117–118, `cookies.md` lines 108–109) | `hello@pilotpainters.example`, `(555) 555-0100` | Real contact info |
| Cookie descriptions (`cookies.md` lines 48, 61–65, 75) | Notes analytics not yet active | Accurate description once analytics/embeds are added |

## About Page (`content/pages/about.md`)

| Field | Current Value | What Goes Here |
|-------|---------------|----------------|
| `story.image` | `/assets/images/about/team-at-work.jpg` | Real team photo at this path in `public/` |
| Story body copy (lines 68–72) | Marketing narrative | Verify matches actual company history |

## Missing Images — All Placeholder SVGs

None of the `.jpg` paths referenced in content exist in `public/`. The `resolvePublicImage()` helper silently serves SVG placeholders. Add real photos at these paths.

### Services (`content/services/*.md` → `image` field)

| Service | Expected Path |
|---------|---------------|
| Interior Painting | `/assets/images/services/interior-painting.jpg` |
| Exterior Painting | `/assets/images/services/exterior-painting.jpg` |
| Cabinet Refinishing | `/assets/images/services/cabinet-refinishing.jpg` |
| Commercial Painting | `/assets/images/services/commercial-painting.jpg` |

### Projects (`content/projects/*.md` → `coverImage` + `gallery[].src`)

| Project | Cover + Gallery Count |
|---------|----------------------|
| `bungalow-exterior-oak-park` | 1 cover + 5 gallery images |
| `dental-clinic-schaumburg` | 1 cover + 4 gallery images |
| `kitchen-cabinets-naperville` | 1 cover + 4 gallery images |
| `master-bedroom-evanston` | 1 cover + 5 gallery images |
| `office-suite-rolling-meadows` | 1 cover + 4 gallery images |
| `whole-house-exterior-wheaton` | 1 cover + 6 gallery images |

### Testimonial Avatars (`content/testimonials/*.md` → `avatarPath`)

12 testimonial files each reference a unique avatar JPG under `/assets/images/testimonials/`. Add real photos or leave as placeholder SVGs.

### Home Hero

| Field | Expected Path |
|-------|---------------|
| `hero.background` (if switched to `type: image`) | Currently uses gradient — no image needed unless changed |

## Legal Banner Component (`src/components/layout/LegalPageLayout.astro`)

| Item | Current Value | What Goes Here |
|------|---------------|----------------|
| Hardcoded heading | "Placeholder Content — Lawyer Review Required" | Update or remove after legal review |
