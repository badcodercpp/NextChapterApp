export const AvatarSizes = {
  xs: {
    container: 'h-8 w-8',
    text: 'caption',
    icon: 14,
  },

  sm: {
    container: 'h-10 w-10',
    text: 'body',
    icon: 16,
  },

  md: {
    container: 'h-12 w-12',
    text: 'title',
    icon: 18,
  },

  lg: {
    container: 'h-16 w-16',
    text: 'h4',
    icon: 22,
  },

  xl: {
    container: 'h-24 w-24',
    text: 'h2',
    icon: 28,
  },
} as const;

export type AvatarSize = keyof typeof AvatarSizes;
