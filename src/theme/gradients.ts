export const Gradients = {
  primary: ['#7C3AED', '#A855F7'],

  background: ['#141129', '#1B1735'],

  hero: ['#141129', '#2D1B69'],

  overlay: ['rgba(20,17,41,0)', 'rgba(20,17,41,0.75)', '#141129'],

  success: ['#22C55E', '#16A34A'],

  danger: ['#EF4444', '#DC2626'],
} as const;

export type GradientVariant = keyof typeof Gradients;
