import type { UniwindConfig } from 'uniwind';

export type AppTheme = UniwindConfig['themes'][number];

export const APP_SUPPORTED_THEMES: { value: AppTheme; label: string }[] = [
  {
    value: 'light',
    label: 'Light',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
  {
    value: 'ocean',
    label: 'Ocean',
  },
];
