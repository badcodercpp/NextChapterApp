export const ChipVariants = {
  filled: {
    container: 'bg-primary',
    text: 'text-white',
  },

  outlined: {
    container: 'border border-border bg-transparent',
    text: 'text-white',
  },

  soft: {
    container: 'bg-card',
    text: 'text-white',
  },

  success: {
    container: 'bg-green-500',
    text: 'text-white',
  },

  danger: {
    container: 'bg-red-500',
    text: 'text-white',
  },
} as const;

export const ChipSizes = {
  sm: {
    container: 'h-8 px-3',
    text: 'caption',
    icon: 14,
  },

  md: {
    container: 'h-10 px-4',
    text: 'body',
    icon: 16,
  },

  lg: {
    container: 'h-12 px-5',
    text: 'title',
    icon: 18,
  },
} as const;

export type ChipVariant = keyof typeof ChipVariants;
export type ChipSize = keyof typeof ChipSizes;
