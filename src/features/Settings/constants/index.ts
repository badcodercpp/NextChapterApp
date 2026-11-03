import type { UniwindConfig } from 'uniwind';

export type AppTheme = UniwindConfig['themes'][number];

type Language = {
  code: string;
  label: string;
};

export const APP_SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en-US',
    label: 'English',
  },
  {
    code: 'hi-IN',
    label: 'Hindi',
  },
];

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
