// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

/**
 * GitHub Pages deployment.
 *
 * Default: project site at https://pilotpainters.github.io/pilotmainsite/
 *   site: 'https://pilotpainters.github.io'
 *   base: '/pilotmainsite'
 *
 * Custom domain (e.g. pilotpainters.com):
 *   1. Set `site` to your full domain (https://pilotpainters.com).
 *   2. Set `base` to '/' (or remove it).
 *   3. Add a `public/CNAME` file containing the bare domain.
 *
 * Also remember to mirror `site` in `config/site.config.ts → seo.siteUrl`.
 */
export default defineConfig({
  site: 'https://pilotpainters.github.io',
  base: '/pilotmainsite',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
    icon({
      include: {
        // Lucide icons used by home + seeded content. Keep this list tight for fast dev.
        lucide: [
          'arrow-right',
          'badge-check',
          'brush',
          'building',
          'calendar-check',
          'calendar-clock',
          'clipboard-check',
          'clock',
          'cloud-rain',
          'door-open',
          'droplets',
          'fan',
          'file-text',
          'hammer',
          'heart-handshake',
          'home',
          'chevron-down',
          'lamp',
          'layers',
          'mail',
          'map-pin',
          'messages-square',
          'moon',
          'paint-bucket',
          'paint-roller',
          'paintbrush',
          'palette',
          'phone',
          'send',
          'shield',
          'shield-check',
          'sparkles',
          'spray-can',
          'star',
          'sun',
          'thumbs-up',
          'users',
          'wind',
        ],
      },
    }),
  ],
});
