import { Colors } from './colors';
import { Radius } from './radius';
import { Spacing } from './spacing';
import { Typography } from './typography';

export type ThemeColor = keyof typeof Colors;

export type ThemeSpacing = keyof typeof Spacing;

export type ThemeRadius = keyof typeof Radius;

export type ThemeTypography = keyof typeof Typography;
