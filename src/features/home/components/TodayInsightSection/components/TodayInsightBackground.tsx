import Svg, {
  Defs,
  Ellipse,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import React from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '@/theme';

interface Props {
  borderRadius?: number;
}

export function TodayInsightBackground({ borderRadius = 28 }: Props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 400 220"
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        {/* Top Right Purple */}
        <RadialGradient
          id="purpleTop"
          gradientUnits="userSpaceOnUse"
          cx="340"
          cy="10"
          r="240"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionPurple}
            stopOpacity="0.85"
          />
          <Stop
            offset="65%"
            stopColor={Theme.colors.reflectionPurple}
            stopOpacity="0.35"
          />
          <Stop offset="100%" stopColor={Theme.colors.reflectionBackground} />
        </RadialGradient>

        {/* Center Purple */}
        <RadialGradient
          id="purpleCenter"
          gradientUnits="userSpaceOnUse"
          cx="210"
          cy="100"
          r="170"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionPurpleLight}
            stopOpacity="0.45"
          />
          <Stop offset="100%" stopColor={Theme.colors.reflectionBackground} />
        </RadialGradient>

        {/* Bottom Left Orange */}
        <RadialGradient
          id="orange"
          gradientUnits="userSpaceOnUse"
          cx="20"
          cy="200"
          r="180"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionOrange}
            stopOpacity="0.55"
          />
          <Stop offset="100%" stopColor={Theme.colors.reflectionBackground} />
        </RadialGradient>
      </Defs>

      <Rect
        width="400"
        height="220"
        rx={borderRadius}
        fill={Theme.colors.reflectionBackground}
      />

      {/* Purple */}
      <Ellipse cx="340" cy="10" rx="240" ry="180" fill="url(#purpleTop)" />

      {/* Center Glow */}
      <Ellipse cx="210" cy="100" rx="180" ry="130" fill="url(#purpleCenter)" />

      {/* Orange */}
      <Ellipse cx="20" cy="200" rx="180" ry="150" fill="url(#orange)" />
    </Svg>
  );
}
