import { Animation } from './animation';
import { Colors } from './colors';
import { Gradients } from './gradients';
import { Radius } from './radius';
import { Shadows } from './shadows';
import { Typography } from './typography';

export const Theme = {
  colors: Colors,
  typography: Typography,
  radius: Radius,
  shadows: Shadows,
  gradients: Gradients,
  animation: Animation,
};

export * from './animation';
export * from './colors';
export * from './gradients';
export * from './radius';
export * from './shadows';
export * from './typography';
