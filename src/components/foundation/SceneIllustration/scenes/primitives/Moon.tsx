import { Circle, Defs, Mask, RadialGradient, Stop } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface MoonProps {
  palette: ScenePalette;

  x?: number;
  y?: number;

  radius?: number;
  glowRadius?: number;
}

export function Moon({
  palette,
  x = SceneLayout.moon.x,
  y = SceneLayout.moon.y,
  radius = SceneLayout.moon.radius,
  glowRadius = SceneLayout.moon.glowRadius,
}: MoonProps) {
  const glowId = `moon-glow-${x}-${y}`;
  const maskId = `moon-mask-${x}-${y}`;

  return (
    <>
      <Defs>
        <RadialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={palette.light} stopOpacity={0.28} />

          <Stop offset="100%" stopColor={palette.light} stopOpacity={0} />
        </RadialGradient>

        <Mask id={maskId}>
          <Circle cx={x} cy={y} r={radius} fill="white" />

          <Circle
            cx={x + radius * 0.45}
            cy={y - radius * 0.15}
            r={radius}
            fill="black"
          />
        </Mask>
      </Defs>

      <Circle cx={x} cy={y} r={glowRadius} fill={`url(#${glowId})`} />

      <Circle
        cx={x}
        cy={y}
        r={radius}
        fill={palette.light}
        mask={`url(#${maskId})`}
      />
    </>
  );
}
