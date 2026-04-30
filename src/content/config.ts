import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections — schemas live here; the actual Markdown files live at the
 * root-level `/content/<collection>` directory (outside `src/`) per the project layout.
 * Each loader's `base` path is relative to the project root.
 */

const serviceFeatureSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const serviceProcessSchema = z.object({
  step: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      summary: z.string(),
      icon: z.string(),
      /** Site-relative public path for card/hero imagery; resolved via `resolvePublicImage` at build time. */
      image: z.string(),
      order: z.number().int().nonnegative(),
      featured: z.boolean().optional(),
      /** Optional imported asset (content collection image); prefer `image` for public paths. */
      heroImage: image().optional(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
      }),
      hero: z.object({
        headline: z.string(),
        subheadline: z.string(),
        eyebrow: z.string().optional(),
      }),
      featuresHeading: z.string().optional(),
      features: z.array(serviceFeatureSchema).min(3).max(8),
      processHeading: z.string().optional(),
      process: z.array(serviceProcessSchema).min(3).max(6),
      cta: z.object({
        headline: z.string(),
        subheading: z.string(),
        buttonLabel: z.string(),
        buttonHref: z.string().default('/contact/'),
        callCtaLabel: z.string().default('Call us'),
      }),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      projectType: z.string(),
      description: z.string(),
      beforeImage: image().optional(),
      afterImage: image().optional(),
      beforeImagePath: z.string().optional(),
      afterImagePath: z.string().optional(),
      /** Teaser image for cards/grids (falls back to before/after/placeholder). */
      imagePath: z.string().optional(),
      completedAt: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/testimonials' }),
  schema: z.object({
    author: z.string(),
    location: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    quote: z.string(),
    project: z.string().optional(),
    avatarPath: z.string().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),

    /** Home page structured content (`content/pages/home.md`). */
    home: z
      .object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          canonical: z.string().optional(),
        }),

        hero: z.object({
          eyebrow: z.string(),
          headline: z.string(),
          subheadline: z.string(),
          primaryCta: z.object({
            label: z.string(),
            href: z.string(),
          }),
          secondaryCta: z.object({
            label: z.string(),
            href: z.string(),
          }),
          trustLine: z.string(),
          rating: z.object({
            stars: z.number().min(0).max(5),
            reviewCount: z.number().int().nonnegative(),
            label: z.string(),
            summary: z.string(),
            readMoreLabel: z.string(),
            readMoreHref: z.string(),
          }),
          background: z.discriminatedUnion('type', [
            z.object({
              type: z.literal('solid'),
              color: z.string(),
            }),
            z.object({
              type: z.literal('gradient'),
              from: z.string(),
              to: z.string(),
              direction: z.string().optional(),
            }),
            z.object({
              type: z.literal('image'),
              src: z.string(),
              alt: z.string(),
            }),
          ]),
        }),

        trustStrip: z.object({
          tone: z.enum(['white', 'neutral']).default('neutral'),
          items: z
            .array(
              z.object({
                icon: z.string(),
                value: z.string(),
                label: z.string(),
              }),
            )
            .length(4),
        }),

        servicesOverview: z.object({
          heading: z.string(),
          lead: z.string(),
          learnMoreLabel: z.string(),
        }),

        process: z.object({
          heading: z.string(),
          lead: z.string(),
          steps: z
            .array(
              z.object({
                icon: z.string(),
                title: z.string(),
                description: z.string(),
              }),
            )
            .length(4),
        }),

        featuredProjects: z.object({
          heading: z.string(),
          lead: z.string(),
          viewAllLabel: z.string(),
          viewAllHref: z.string(),
          typeTagLabel: z.string(),
        }),

        testimonialSlice: z.object({
          heading: z.string(),
          readMoreLabel: z.string(),
          readMoreHref: z.string(),
          ratingAriaLabel: z.string(),
        }),

        ctaBand: z.object({
          tone: z.enum(['primary', 'dark']).default('dark'),
          heading: z.string(),
          subheading: z.string(),
          primaryCta: z.object({ label: z.string(), href: z.string() }),
          callCtaLabel: z.string(),
        }),
      })
      .optional(),

    /** Services index page (`content/pages/services.md`). */
    servicesIndex: z
      .object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          canonical: z.string().optional(),
        }),
        hero: z.object({
          heading: z.string(),
          lead: z.string(),
        }),
        intro: z
          .object({
            lead: z.string(),
          })
          .optional(),
        grid: z.object({
          learnMoreLabel: z.string(),
        }),
        ctaBand: z.object({
          tone: z.enum(['primary', 'dark']).default('dark'),
          heading: z.string(),
          subheading: z.string(),
          primaryCta: z.object({ label: z.string(), href: z.string() }),
          callCtaLabel: z.string(),
        }),
      })
      .optional(),
  }),
});

export const collections = { services, projects, testimonials, pages };
