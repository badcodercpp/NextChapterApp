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

export function ReflectionCardBackground({ borderRadius = 28 }: Props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 400 220"
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        {/* Top Right */}
        <RadialGradient
          id="purpleTop"
          gradientUnits="userSpaceOnUse"
          cx="320"
          cy="20"
          r="220"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionPurple}
            stopOpacity="0.7"
          />
          <Stop
            offset="60%"
            stopColor={Theme.colors.reflectionPurple}
            stopOpacity="0.3"
          />
          <Stop
            offset="100%"
            stopColor={Theme.colors.reflectionBackground}
            stopOpacity="1"
          />
        </RadialGradient>

        {/* Top Left */}
        <RadialGradient
          id="purpleLeft"
          gradientUnits="userSpaceOnUse"
          cx="40"
          cy="20"
          r="180"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionPurple}
            stopOpacity="0.18"
          />
          <Stop
            offset="100%"
            stopColor={Theme.colors.reflectionBackground}
            stopOpacity="1"
          />
        </RadialGradient>

        {/* Bottom Left */}
        <RadialGradient
          id="orangeBottom"
          gradientUnits="userSpaceOnUse"
          cx="40"
          cy="200"
          r="220"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionOrange}
            stopOpacity="0.65"
          />
          <Stop
            offset="60%"
            stopColor={Theme.colors.reflectionOrange}
            stopOpacity="0.25"
          />
          <Stop
            offset="100%"
            stopColor={Theme.colors.reflectionBackground}
            stopOpacity="1"
          />
        </RadialGradient>

        {/* Bottom Right */}
        <RadialGradient
          id="orangeRight"
          gradientUnits="userSpaceOnUse"
          cx="360"
          cy="200"
          r="180"
        >
          <Stop
            offset="0%"
            stopColor={Theme.colors.reflectionOrange}
            stopOpacity="0.15"
          />
          <Stop
            offset="100%"
            stopColor={Theme.colors.reflectionBackground}
            stopOpacity="1"
          />
        </RadialGradient>
      </Defs>

      <Rect
        width="400"
        height="220"
        rx={borderRadius}
        fill={Theme.colors.reflectionBackground}
      />

      <Ellipse cx="320" cy="20" rx="230" ry="170" fill="url(#purpleTop)" />

      <Ellipse cx="40" cy="20" rx="160" ry="130" fill="url(#purpleLeft)" />

      <Ellipse cx="40" cy="200" rx="220" ry="180" fill="url(#orangeBottom)" />

      <Ellipse cx="360" cy="200" rx="160" ry="130" fill="url(#orangeRight)" />
    </Svg>
  );
}
