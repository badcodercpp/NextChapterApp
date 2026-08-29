export const PASSWORD_RULES = [
  {
    key: 'minLength',
    label: 'At least 8 characters long',
  },
  {
    key: 'uppercase',
    label: 'Include uppercase letter',
  },
  {
    key: 'lowercase',
    label: 'Include lowercase letter',
  },
  {
    key: 'number',
    label: 'Include at least one number',
  },
  {
    key: 'special',
    label: 'Include at least one special char',
  },
] as const;
