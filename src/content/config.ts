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

const serviceTypeEnum = z.enum([
  'interior-painting',
  'exterior-painting',
  'cabinet-refinishing',
  'commercial-painting',
]);

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const projectInfoSchema = z.object({
  scope: z.string(),
  duration: z.string().optional(),
  squareFootage: z.string().optional(),
  colors: z.array(z.string()).optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    location: z.string(),
    serviceType: serviceTypeEnum,
    completedDate: z.coerce.date(),
    coverImage: z.string(),
    gallery: z.array(galleryImageSchema).min(1).max(12),
    info: projectInfoSchema,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    galleryHeading: z.string().optional(),
    detailsHeading: z.string().optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        ogImage: z.string().optional(),
      })
      .optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/testimonials' }),
  schema: z.object({
    author: z.string(),
    location: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    quote: z.string(),
    serviceType: serviceTypeEnum,
    projectSlug: z.string().optional(),
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

    /** Legal pages — shared structure for privacy, terms, cookies (`content/pages/{privacy,terms,cookies}.md`). */
    legal: z
      .object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
          noindex: z.boolean().default(false),
          ogImage: z.string().optional(),
        }),
        hero: z.object({
          eyebrow: z.string().optional(),
          headline: z.string(),
          subheadline: z.string(),
        }),
        lastUpdated: z.coerce.date(),
        effectiveDate: z.coerce.date(),
        legalReviewBanner: z.object({
          enabled: z.boolean().default(true),
          message: z.string(),
        }),
        tableOfContents: z.object({
          enabled: z.boolean().default(true),
          heading: z.string().default('Contents'),
        }),
        sections: z
          .array(
            z.object({
              id: z.string(),
              heading: z.string(),
              body: z.string(),
            }),
          )
          .min(1),
        crossLinks: z
          .array(
            z.object({
              label: z.string(),
              href: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),

    /** Reviews page (`content/pages/reviews.md`). */
    reviews: z
      .object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
          ogImage: z.string().optional(),
        }),
        hero: z.object({
          eyebrow: z.string().optional(),
          headline: z.string(),
          subheadline: z.string(),
        }),
        aggregateRating: z.object({
          heading: z.string(),
          subheading: z.string(),
          displayMode: z.enum(['auto', 'manual']).default('auto'),
          manualRating: z.number().min(0).max(5).optional(),
          manualReviewCount: z.number().int().nonnegative().optional(),
        }),
        filters: z.object({
          heading: z.string(),
          allLabel: z.string(),
        }),
        cta: z.object({
          headline: z.string(),
          subheading: z.string(),
          buttonLabel: z.string(),
          buttonHref: z.string().default('/contact/'),
          callCtaLabel: z.string().default('Call us'),
        }),
      })
      .optional(),

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

    /** Contact page (`content/pages/contact.md`). */
    contact: z
      .object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
          ogImage: z.string().optional(),
        }),
        hero: z.object({
          eyebrow: z.string().optional(),
          headline: z.string(),
          subheadline: z.string(),
        }),
        info: z.object({
          heading: z.string(),
          subheading: z.string(),
          phoneLabel: z.string(),
          emailLabel: z.string(),
          responseNote: z.string(),
        }),
        form: z.object({
          heading: z.string(),
          subheading: z.string(),
          submitLabel: z.string(),
          successMessage: z.string(),
          privacyNote: z.string().optional(),
          fields: z.object({
            name: z.object({
              label: z.string(),
              placeholder: z.string(),
              required: z.boolean().default(true),
            }),
            email: z.object({
              label: z.string(),
              placeholder: z.string(),
              required: z.boolean().default(true),
            }),
            phone: z.object({
              label: z.string(),
              placeholder: z.string(),
              required: z.boolean().default(true),
            }),
            service: z.object({
              label: z.string(),
              placeholder: z.string(),
              required: z.boolean().default(true),
            }),
            address: z.object({
              label: z.string(),
              placeholder: z.string(),
              required: z.boolean().default(true),
              helpText: z.string().optional(),
            }),
            message: z.object({
              label: z.string(),
              placeholder: z.string(),
              required: z.boolean().default(true),
              rows: z.number().int().min(2).max(20).default(5),
            }),
          }),
        }),
        cta: z
          .object({
            tone: z.enum(['primary', 'dark']).default('dark'),
            heading: z.string(),
            subheading: z.string(),
            primaryCta: z.object({ label: z.string(), href: z.string() }),
            callCtaLabel: z.string(),
          })
          .optional(),
      })
      .optional(),

    /** About page (`content/pages/about.md`). */
    about: z
      .object({
        seo: z.object({
          title: z.string(),
          description: z.string(),
          ogImage: z.string().optional(),
        }),
        hero: z.object({
          eyebrow: z.string().optional(),
          headline: z.string(),
          subheadline: z.string(),
        }),
        story: z.object({
          heading: z.string(),
          image: z.string().optional(),
          imageAlt: z.string().default(''),
        }),
        valuesHeading: z.string().optional(),
        values: z
          .array(
            z.object({
              icon: z.string(),
              title: z.string(),
              description: z.string(),
            }),
          )
          .min(3)
          .max(6),
        serviceArea: z.object({
          heading: z.string(),
          subheading: z.string(),
          description: z.string(),
          cities: z
            .array(
              z.object({
                name: z.string(),
                featured: z.boolean().default(false),
              }),
            )
            .min(8),
        }),
        cta: z.object({
          headline: z.string(),
          subheading: z.string(),
          buttonLabel: z.string(),
          buttonHref: z.string().default('/contact/'),
          callCtaLabel: z.string().default('Call us'),
        }),
      })
      .optional(),

    /** Projects index page (`content/pages/projects.md`). */
    projectsIndex: z
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
        ctaBand: z.object({
          tone: z.enum(['primary', 'dark']).default('dark'),
          heading: z.string(),
          subheading: z.string(),
          primaryCta: z.object({ label: z.string(), href: z.string() }),
          callCtaLabel: z.string(),
        }),
        /** Shared CTA copy reused across all project detail pages. */
        detailCtaBand: z
          .object({
            tone: z.enum(['primary', 'dark']).default('dark'),
            heading: z.string(),
            subheading: z.string(),
            primaryCta: z.object({ label: z.string(), href: z.string() }),
            callCtaLabel: z.string(),
          })
          .optional(),
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
