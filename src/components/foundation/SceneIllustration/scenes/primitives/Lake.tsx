import { Defs, Ellipse, LinearGradient, Stop } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface LakeProps {
  palette: ScenePalette;

  y?: number;

  width?: number;

  height?: number;

  opacity?: number;
}

export function Lake({
  palette,
  y = SceneLayout.lakeY,
  width = 330,
  height = 70,
  opacity = 1,
}: LakeProps) {
  const gradientId = `lake-${y}`;

  return (
    <>
      <Defs>
        <LinearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={palette.highlight} stopOpacity={0.9} />

          <Stop offset="100%" stopColor={palette.water} />
        </LinearGradient>
      </Defs>

      <Ellipse
        cx={SceneLayout.width / 2}
        cy={y}
        rx={width / 2}
        ry={height / 2}
        fill={`url(#${gradientId})`}
        opacity={opacity}
      />
    </>
  );
}
