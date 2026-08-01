export const ButtonVariants = {
  primary: {
    container: 'bg-primary active:opacity-80',
    text: 'text-white',
  },

  secondary: {
    container: 'bg-surface border border-border active:opacity-80',
    text: 'text-white',
  },

  outline: {
    container: 'border border-primary bg-transparent active:opacity-80',
    text: 'text-primary',
  },

  ghost: {
    container: 'bg-transparent active:bg-white/5',
    text: 'text-white',
  },

  danger: {
    container: 'bg-red-500 active:opacity-80',
    text: 'text-white',
  },

  gradient: {
    container: '',
    text: 'text-white',
    gradient: ['#7C3AED', '#9333EA', '#C026D3'],
  },
} as const;

export const ButtonSizes = {
  sm: {
    container: 'h-10 px-4',
    typography: 'label',
    icon: 16,
  },

  md: {
    container: 'h-12 px-5',
    typography: 'bodyMedium',
    icon: 18,
  },

  lg: {
    container: 'h-14 px-6',
    typography: 'title',
    icon: 20,
  },
} as const;
