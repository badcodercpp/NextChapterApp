import { Animation } from './animation';
import { Colors } from './colors';
import { Gradients } from './gradients';
import { Radius } from './radius';
import { Shadows } from './shadows';
import { Spacing } from './spacing';
import { Typography } from './typography';

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  radius: Radius,
  typography: Typography,
  shadows: Shadows,
  gradients: Gradients,
  animation: Animation,
} as const;
