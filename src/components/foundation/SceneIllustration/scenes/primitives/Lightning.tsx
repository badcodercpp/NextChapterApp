import { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

import React from 'react';
import { ScenePalette } from '../types';

interface LightningProps {
  palette: ScenePalette;

  x?: number;
  y?: number;

  scale?: number;

  opacity?: number;
}

export function Lightning({
  palette,
  x = 285,
  y = 45,
  scale = 1,
  opacity = 1,
}: LightningProps) {
  const gradientId = `lightning-${x}-${y}`;

  return (
    <>
      <Defs>
        <LinearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={palette.light} />

          <Stop offset="100%" stopColor={palette.highlight} />
        </LinearGradient>
      </Defs>

      <G opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
        <Path
          d="
            M0 0
            L14 18
            L6 18
            L20 42
            L10 42
            L28 72
            L16 52
            L24 52
            L10 26
            L18 26
            Z
          "
          fill={`url(#${gradientId})`}
        />
      </G>
    </>
  );
}
