import { Ellipse, G } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface FogProps {
  palette: ScenePalette;

  opacity?: number;

  y?: number;
}

export function Fog({
  palette,
  opacity = 0.45,
  y = SceneLayout.middleLandscapeY,
}: FogProps) {
  return (
    <G opacity={opacity}>
      <Ellipse cx={70} cy={y} rx={60} ry={18} fill={palette.atmosphere} />

      <Ellipse cx={165} cy={y + 8} rx={75} ry={22} fill={palette.atmosphere} />

      <Ellipse cx={285} cy={y - 4} rx={65} ry={20} fill={palette.atmosphere} />

      <Ellipse cx={370} cy={y + 10} rx={55} ry={18} fill={palette.atmosphere} />
    </G>
  );
}
