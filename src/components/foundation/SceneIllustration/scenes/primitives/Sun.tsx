import { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface SunProps {
  palette: ScenePalette;

  x?: number;
  y?: number;

  radius?: number;
  glowRadius?: number;
}

export function Sun({
  palette,
  x = SceneLayout.sun.x,
  y = SceneLayout.sun.y,
  radius = SceneLayout.sun.radius,
  glowRadius = SceneLayout.sun.glowRadius,
}: SunProps) {
  const gradientId = `sun-glow-${x}-${y}`;

  return (
    <>
      <Defs>
        <RadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={palette.light} stopOpacity={0.45} />

          <Stop offset="70%" stopColor={palette.light} stopOpacity={0.12} />

          <Stop offset="100%" stopColor={palette.light} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Circle cx={x} cy={y} r={glowRadius} fill={`url(#${gradientId})`} />

      <Circle cx={x} cy={y} r={radius} fill={palette.light} />
    </>
  );
}
