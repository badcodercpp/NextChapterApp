import { G, Path } from 'react-native-svg';

import React from 'react';
import { ScenePalette } from '../types';

interface BirdProps {
  palette: ScenePalette;

  x: number;
  y: number;

  scale?: number;

  opacity?: number;
}

export function Bird({ palette, x, y, scale = 1, opacity = 1 }: BirdProps) {
  return (
    <G opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
      <Path
        d="M-8 0 Q-4 -5 0 0"
        stroke={palette.bird}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="M0 0 Q4 -5 8 0"
        stroke={palette.bird}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </G>
  );
}
