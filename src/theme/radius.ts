export const Radius = {
  none: 'rounded-none',

  xs: 'rounded-sm',

  sm: 'rounded',

  md: 'rounded-lg',

  lg: 'rounded-xl',

  xl: 'rounded-2xl',

  '2xl': 'rounded-3xl',

  '3xl': 'rounded-[32px]',

  full: 'rounded-full',
} as const;

export type RadiusVariant = keyof typeof Radius;
