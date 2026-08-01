import { Fonts } from './fonts';

export const Typography = {
  display: `text-5xl ${Fonts.bold}`,

  h1: `text-4xl ${Fonts.bold}`,
  h2: `text-3xl ${Fonts.bold}`,
  h3: `text-2xl ${Fonts.semiBold}`,
  h4: `text-xl ${Fonts.semiBold}`,

  title: `text-lg ${Fonts.semiBold}`,
  subtitle: `text-base ${Fonts.medium}`,

  bodyLarge: `text-lg ${Fonts.regular}`,
  body: `text-base ${Fonts.regular}`,
  bodyMedium: `text-base ${Fonts.medium}`,
  bodySemiBold: `text-base ${Fonts.semiBold}`,

  label: `text-sm ${Fonts.medium}`,
  caption: `text-sm ${Fonts.regular}`,
  small: `text-xs ${Fonts.regular}`,
} as const;

export type TypographyVariant = keyof typeof Typography;
