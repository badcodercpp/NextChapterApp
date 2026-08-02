export const ButtonVariants = {
  primary: {
    container: 'bg-primary active:opacity-80',
    text: 'text-text text-lg',
    gradient: {
      colors: [],
      start: {},
      end: {},
    },
  },

  secondary: {
    container: 'bg-surface border border-border active:opacity-80',
    text: 'text-text text-lg',
    gradient: {
      colors: [],
      start: {},
      end: {},
    },
  },

  outline: {
    container: 'bg-transparent border border-primary active:opacity-80',
    text: 'text-primary text-lg',
    gradient: {
      colors: [],
      start: {},
      end: {},
    },
  },

  ghost: {
    container: 'bg-transparent active:bg-white/5',
    text: 'text-text text-lg',
    gradient: {
      colors: [],
      start: {},
      end: {},
    },
  },

  danger: {
    container: 'bg-error active:opacity-80',
    text: 'text-text text-lg',
    gradient: {
      colors: [],
      start: {},
      end: {},
    },
  },

  success: {
    container: 'bg-success active:opacity-80',
    text: 'text-text text-lg',
    gradient: {
      colors: [],
      start: {},
      end: {},
    },
  },

  gradient: {
    container: '',
    text: 'text-text text-lg',
    gradient: {
      colors: ['#7C3AED', '#9333EA', '#C026D3'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
  },
} as const;

export type ButtonVariant = keyof typeof ButtonVariants;

export const ButtonSizes = {
  sm: {
    container: 'py-3',
    icon: 16,
  },

  md: {
    container: 'py-3',
    icon: 18,
  },

  lg: {
    container: 'py-3',
    icon: 20,
  },
} as const;

export type ButtonSize = keyof typeof ButtonSizes;
