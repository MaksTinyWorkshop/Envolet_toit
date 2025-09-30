import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      borderRadius: {
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    base: false,
    themes: [
      {
        mindleaf: {
          primary: 'var(--color-primary)',
          'primary-focus': 'var(--color-primary-dark)',
          'primary-content': '#ffffff',
          accent: 'var(--color-accent)',
          'accent-content': '#ffffff',
          neutral: 'var(--color-text)',
          'neutral-content': 'var(--color-background)',
          'base-100': 'var(--color-background)',
          'base-200': 'var(--color-surface)',
          'base-300': 'var(--color-surface)',
          'base-content': 'var(--color-text)',
          info: '#38bdf8',
          success: '#4ade80',
          warning: '#facc15',
          error: '#f87171',
        },
      },
    ],
  },
}
