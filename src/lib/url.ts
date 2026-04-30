/**
 * URL helpers that respect Astro's `base` (so links and asset paths work under
 * the GitHub Pages project sub-path as well as a custom domain root).
 */

const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

/** Join the configured base path with a site-relative path. */
export function withBase(path: string): string {
  if (/^https?:\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

/** Build a fully-qualified URL using the public site URL. */
export function absoluteUrl(path: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = siteUrl.replace(/\/$/, '');
  const tail = path.startsWith('/') ? path : `/${path}`;
  return `${base}${tail}`;
}
