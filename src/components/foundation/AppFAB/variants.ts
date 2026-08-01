export const FabVariants = {
  primary: {
    container: 'bg-primary',
    text: 'text-white',
  },

  secondary: {
    container: 'bg-surface border border-border',
    text: 'text-white',
  },
} as const;

export const FabSizes = {
  normal: {
    container: 'h-14 w-14 rounded-full',
    icon: 24,
  },

  extended: {
    container: 'h-14 rounded-full px-5',
    icon: 24,
  },
} as const;

export type FabVariant = keyof typeof FabVariants;
