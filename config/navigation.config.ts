/**
 * Navigation config — header nav, footer columns, CTA labels.
 * Hrefs use site-relative paths (no leading host); they are resolved against `import.meta.env.BASE_URL`
 * by components so they work correctly under the GitHub Pages base path.
 */

export interface NavLink {
  label: string;
  href: string;
  /** When true, render with `target="_blank"` + `rel="noopener noreferrer"`. */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
  /** When `services`, links are populated from the `services` content collection at build time. */
  source?: 'services';
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface NavigationConfig {
  headerNav: NavLink[];
  footerColumns: FooterColumn[];
  ctaButtons: {
    primary: CtaButton;
    secondary: CtaButton;
  };
}

export const navigation: NavigationConfig = {
  headerNav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],

  footerColumns: [
    {
      title: 'Services',
      links: [],
      source: 'services',
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about/' },
        { label: 'Our Process', href: '/process/' },
        { label: 'Gallery', href: '/gallery/' },
      ],
    },
    {
      title: 'Get in Touch',
      links: [
        { label: 'Request a Quote', href: '/contact/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
  ],

  ctaButtons: {
    primary: { label: 'Get a Free Quote', href: '/contact/' },
    secondary: { label: 'See Our Work', href: '/gallery/' },
  },
};
