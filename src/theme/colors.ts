export const Colors = {
  // Brand
  primary: 'text-violet-500',
  secondary: 'text-indigo-400',

  // Text
  text: 'text-white',
  textSecondary: 'text-zinc-400',
  textMuted: 'text-zinc-500',
  inverse: 'text-black',

  // Background
  button: 'bg-violet-500',
  background: 'bg-[#141129]',
  surface: 'bg-[#1B1735]',
  card: 'bg-[#221D42]',
  overlay: 'bg-black/50',

  // Border
  border: 'border-zinc-800',
  divider: 'border-zinc-700',

  // Status
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  info: 'text-sky-500',
} as const;

export type ColorVariant = keyof typeof Colors;
