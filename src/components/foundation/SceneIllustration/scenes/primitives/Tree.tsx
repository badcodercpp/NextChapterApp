import { G, Path, Rect } from 'react-native-svg';

import React from 'react';
import { ScenePalette } from '../types';

interface TreeProps {
  palette: ScenePalette;

  x: number;
  y: number;

  scale?: number;

  opacity?: number;
}

export function Tree({ palette, x, y, scale = 1, opacity = 1 }: TreeProps) {
  return (
    <G opacity={opacity} transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* Trunk */}
      <Rect
        x={-2}
        y={16}
        width={4}
        height={14}
        rx={1}
        fill={palette.foreground}
      />

      {/* Bottom */}
      <Path
        d="
          M-14 18
          L0 -4
          L14 18
          Z
        "
        fill={palette.foreground}
      />

      {/* Middle */}
      <Path
        d="
          M-11 8
          L0 -12
          L11 8
          Z
        "
        fill={palette.foreground}
      />

      {/* Top */}
      <Path
        d="
          M-8 -2
          L0 -22
          L8 -2
          Z
        "
        fill={palette.foreground}
      />
    </G>
  );
}
