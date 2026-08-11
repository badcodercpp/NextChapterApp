export const InputVariants = {
  container: {
    base: 'flex-row items-center rounded-2xl border border-border bg-surface px-4',

    focused: 'border-primary',

    error: 'border-error',

    disabled: 'opacity-50',

    readOnly: 'bg-card',
  },

  input: {
    base: 'flex-1 py-4 items-center text-text-secondary leading-none',

    multiline: 'min-h-[120px] py-4',

    disabled: 'text-text-secondary',
  },

  label: {
    base: 'mb-2 flex-row items-center',
  },

  helper: {
    container: 'mt-2 flex-row items-center justify-between',

    text: '',

    error: 'text-error',
  },

  icon: {
    left: 'mr-3',

    right: 'ml-3',
  },
} as const;
