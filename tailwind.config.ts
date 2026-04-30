import type { Config } from 'tailwindcss';
import { theme } from './config/theme.config';
import { fontFamilies, fontWeights, typeScale } from './config/typography.config';

/**
 * Tailwind config — pulls every visual token from `/config`. Do not hardcode colors,
 * spacing, radii, or font metrics here; edit the source-of-truth files in `/config`.
 */

type FontSizeTuple = [string, { lineHeight: string; letterSpacing: string; fontWeight: number }];

const fontSizeFromScale: Record<string, FontSizeTuple> = Object.fromEntries(
  Object.entries(typeScale).map(([key, style]) => [
    key,
    [
      style.size,
      {
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        fontWeight: style.weight,
      },
    ],
  ]),
);

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: theme.colors as unknown as Config['theme'],
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      fontFamily: {
        sans: [...fontFamilies.sans],
        serif: [...fontFamilies.serif],
        mono: [...fontFamilies.mono],
      },
      fontWeight: {
        light: String(fontWeights.light),
        normal: String(fontWeights.regular),
        medium: String(fontWeights.medium),
        semibold: String(fontWeights.semibold),
        bold: String(fontWeights.bold),
        extrabold: String(fontWeights.extrabold),
      },
      fontSize: fontSizeFromScale,
    },
  },
  plugins: [],
};

export default config;
