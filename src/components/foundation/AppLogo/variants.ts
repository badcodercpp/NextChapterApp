export const LogoVariants = {
  default: require('@/assets/images/logo.png'),

  white: require('@/assets/images/logo.png'),

  dark: require('@/assets/images/logo.png'),

  icon: require('@/assets/images/logo.png'),
} as const;

export type LogoVariant = keyof typeof LogoVariants;
