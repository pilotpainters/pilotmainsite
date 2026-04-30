/**
 * Design tokens — colors, spacing, radii.
 * `tailwind.config.ts` consumes this file directly so these are the single source of truth
 * for visual design. Do not redefine these values anywhere else in the codebase.
 */

export const theme = {
  colors: {
    primary: {
      DEFAULT: '#0BA5EC',
      dark: '#0284C7',
      light: '#7DD3FC',
    },
    brand: {
      black: '#0A0A0A',
      white: '#FFFFFF',
    },
    /** Tailwind slate scale subset, per spec. */
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      300: '#CBD5E1',
      500: '#64748B',
      700: '#334155',
      900: '#0F172A',
    },
    accent: '#F97316',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },

  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
    32: '8rem',
    48: '12rem',
    64: '16rem',
    96: '24rem',
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
