import { Circle, G } from 'react-native-svg';

import React from 'react';
import { ScenePalette } from '../types';

interface FlowerProps {
  palette: ScenePalette;

  x: number;
  y: number;

  scale?: number;

  opacity?: number;
}

export function Flower({ palette, x, y, scale = 1, opacity = 1 }: FlowerProps) {
  const r = 2 * scale;
  const petal = 1.5 * scale;

  return (
    <G opacity={opacity}>
      {/* Top */}
      <Circle cx={x} cy={y - petal * 2} r={petal} fill={palette.highlight} />

      {/* Bottom */}
      <Circle cx={x} cy={y + petal * 2} r={petal} fill={palette.highlight} />

      {/* Left */}
      <Circle cx={x - petal * 2} cy={y} r={petal} fill={palette.highlight} />

      {/* Right */}
      <Circle cx={x + petal * 2} cy={y} r={petal} fill={palette.highlight} />

      {/* Center */}
      <Circle cx={x} cy={y} r={r} fill={palette.light} />
    </G>
  );
}
