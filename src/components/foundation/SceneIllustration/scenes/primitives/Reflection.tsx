import { Ellipse, G } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface ReflectionProps {
  palette: ScenePalette;

  x?: number;
  y?: number;

  width?: number;
  height?: number;

  opacity?: number;
}

export function Reflection({
  palette,
  x = SceneLayout.width / 2,
  y = SceneLayout.lakeY - 8,
  width = 120,
  height = 10,
  opacity = 0.35,
}: ReflectionProps) {
  return (
    <G opacity={opacity}>
      <Ellipse
        cx={x}
        cy={y}
        rx={width / 2}
        ry={height / 2}
        fill={palette.highlight}
      />

      <Ellipse
        cx={x}
        cy={y + 14}
        rx={width * 0.35}
        ry={height * 0.35}
        fill={palette.highlight}
        opacity={0.6}
      />

      <Ellipse
        cx={x}
        cy={y + 26}
        rx={width * 0.18}
        ry={height * 0.18}
        fill={palette.highlight}
        opacity={0.45}
      />
    </G>
  );
}
