/**
 * Site-wide config — the single source of truth for company info, contact, and SEO defaults.
 * Update values here; nothing should be hardcoded in components or pages.
 */

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  google?: string;
  yelp?: string;
}

export interface BusinessHour {
  /** Day name as it should appear to humans (e.g. "Monday"). */
  day: string;
  /** ISO day-of-week tokens accepted by schema.org openingHoursSpecification. */
  schemaDay: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  /** "08:00" 24h, or null when closed. */
  opens: string | null;
  /** "17:00" 24h, or null when closed. */
  closes: string | null;
}

export interface Address {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface SeoDefaults {
  /** Used as the literal <title> on the home page and as the `siteName` in Open Graph. */
  defaultTitle: string;
  /** Pattern for inner pages, where %s is replaced by the page-level title. */
  titleTemplate: string;
  defaultDescription: string;
  /** Path relative to the deployed site root, e.g. "/assets/images/og-default.png". */
  defaultOgImage: string;
  locale: string;
  /** Public, fully-qualified URL where the site is served, no trailing slash. */
  siteUrl: string;
  twitterHandle?: string;
}

export interface SiteConfig {
  company: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  phone: string;
  /** E.164 / tel: link form, e.g. "+15555550100". */
  phoneTel: string;
  email: string;
  serviceAreas: string[];
  address: Address;
  socials: SocialLinks;
  businessHours: BusinessHour[];
  license: string;
  insurance: string;
  /** Year the business was founded — used for footer copyright ranges. */
  foundedYear: number;
  seo: SeoDefaults;
}

export const siteConfig: SiteConfig = {
  company: 'Pilot Painters',
  legalName: 'Pilot Painters LLC',
  tagline: 'Precision painting, smooth landings.',
  shortDescription:
    'Professional interior, exterior, cabinet, and commercial painting with a meticulous prep-first process.',
  phone: '(872) 310-7709',
  phoneTel: '+18723107709',
  email: 'info@pilotpainters.com',
  serviceAreas: ['TODO: Service Area 1', 'TODO: Service Area 2', 'TODO: Service Area 3'],
  address: {
    street: '',
    city: 'Chicago',
    region: 'IL',
    postalCode: '60646',
    country: 'US',
  },
  socials: {
    facebook: 'https://facebook.com/pilotpainters',
    instagram: 'https://instagram.com/pilotpainters',
    google: 'https://g.page/pilotpainters',
  },
  businessHours: [
    { day: 'Monday', schemaDay: 'Monday', opens: '08:00', closes: '17:00' },
    { day: 'Tuesday', schemaDay: 'Tuesday', opens: '08:00', closes: '17:00' },
    { day: 'Wednesday', schemaDay: 'Wednesday', opens: '08:00', closes: '17:00' },
    { day: 'Thursday', schemaDay: 'Thursday', opens: '08:00', closes: '17:00' },
    { day: 'Friday', schemaDay: 'Friday', opens: '08:00', closes: '17:00' },
    { day: 'Saturday', schemaDay: 'Saturday', opens: '09:00', closes: '14:00' },
    { day: 'Sunday', schemaDay: 'Sunday', opens: null, closes: null },
  ],
  license: '',
  insurance: 'Fully insured',
  foundedYear: 2018,
  seo: {
    defaultTitle: 'Pilot Painters — Professional Painting Services',
    titleTemplate: '%s | Pilot Painters',
    defaultDescription:
      'Pilot Painters delivers precise interior, exterior, cabinet, and commercial painting with a meticulous prep-first process.',
    // TODO: Replace with a dedicated OG image once brand assets are finalized.
    // Temporary fallback: use the logo PNG.
    defaultOgImage: '/assets/logos/pilot-painters-logo-nbg.png',
    locale: 'en-US',
    siteUrl: 'https://pilotpainters.github.io/pilotmainsite',
  },
};
