/**
 * Typography tokens.
 * Tailwind's `theme.extend.fontSize` consumes `typeScale` in tuple form, exposing each entry
 * as a single utility (e.g. `text-h1`, `text-body`) that bundles size + line-height +
 * letter-spacing + weight together.
 */

export const fontFamilies = {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  serif: ['"Source Serif Pro"', 'Georgia', 'Cambria', 'serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export interface TypeStyle {
  /** CSS font-size — rem preferred. */
  size: string;
  /** Unitless line-height multiplier. */
  lineHeight: string;
  letterSpacing: string;
  /** Numeric font-weight value. */
  weight: number;
}

export const typeScale = {
  h1: { size: '3rem',     lineHeight: '1.1',  letterSpacing: '-0.02em', weight: fontWeights.bold },
  h2: { size: '2.25rem',  lineHeight: '1.15', letterSpacing: '-0.02em', weight: fontWeights.bold },
  h3: { size: '1.75rem',  lineHeight: '1.2',  letterSpacing: '-0.01em', weight: fontWeights.semibold },
  h4: { size: '1.375rem', lineHeight: '1.3',  letterSpacing: '-0.01em', weight: fontWeights.semibold },
  h5: { size: '1.125rem', lineHeight: '1.4',  letterSpacing: '0',       weight: fontWeights.semibold },
  h6: { size: '1rem',     lineHeight: '1.5',  letterSpacing: '0',       weight: fontWeights.semibold },
  body: { size: '1rem',     lineHeight: '1.6',  letterSpacing: '0',       weight: fontWeights.regular },
  small: { size: '0.875rem', lineHeight: '1.5',  letterSpacing: '0',       weight: fontWeights.regular },
  caption: { size: '0.75rem',  lineHeight: '1.4',  letterSpacing: '0.02em',  weight: fontWeights.medium },
} as const satisfies Record<string, TypeStyle>;

export type TypeScaleKey = keyof typeof typeScale;
