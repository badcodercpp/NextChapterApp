import { Ellipse, G } from 'react-native-svg';

import React from 'react';
import { ScenePalette } from '../types';

interface CloudProps {
  palette: ScenePalette;

  x: number;
  y: number;

  scale?: number;
  opacity?: number;
}

export function Cloud({ palette, x, y, scale = 1, opacity = 1 }: CloudProps) {
  return (
    <G opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* Left */}
      <Ellipse cx={-22} cy={0} rx={18} ry={10} fill={palette.cloud} />

      {/* Center */}
      <Ellipse cx={0} cy={-6} rx={26} ry={14} fill={palette.cloud} />

      {/* Right */}
      <Ellipse cx={24} cy={0} rx={20} ry={11} fill={palette.cloud} />

      {/* Base */}
      <Ellipse cx={0} cy={6} rx={42} ry={12} fill={palette.cloud} />
    </G>
  );
}
