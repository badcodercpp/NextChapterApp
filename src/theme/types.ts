export type ThemeName = 'light' | 'dark' | 'ocean';

export type ColorTokens = {
  /** Brand */
  primary: string;
  secondary: string;

  /** Background */
  background: string;
  surface: string;
  card: string;

  /** Text */
  text: string;
  textSecondary: string;
  textMuted: string;
  inverse: string;

  /** Border */
  border: string;
  divider: string;

  /** Status */
  success: string;
  warning: string;
  error: string;
  info: string;
};

export type SpacingTokens = {
  1: number;
  2: number;
  3: number;
  4: number;
  6: number;
  8: number;
};

export type RadiusTokens = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type TypographyTokens = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
};

export type FontTokens = {
  sans: string;
};

export type ColorVariant = keyof ColorTokens;
export type SpacingVariant = keyof SpacingTokens;
export type RadiusVariant = keyof RadiusTokens;
export type TypographyVariant = keyof TypographyTokens;
export type FontVariant = keyof FontTokens;
