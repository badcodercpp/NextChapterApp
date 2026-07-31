import { G, Line } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface RainProps {
  palette: ScenePalette;

  density?: number;

  angle?: number;

  opacity?: number;
}

export function Rain({
  palette,
  density = 55,
  angle = 12,
  opacity = 0.55,
}: RainProps) {
  const spacing = SceneLayout.width / density;

  return (
    <G opacity={opacity}>
      {Array.from({ length: density }).map((_, index) => {
        const x = index * spacing;
        const offset = (index % 5) * 18;

        return Array.from({ length: 8 }).map((__, row) => {
          const y = offset + row * 36;

          return (
            <Line
              key={`${index}-${row}`}
              x1={x}
              y1={y}
              x2={x + angle}
              y2={y + 18}
              stroke={palette.highlight}
              strokeWidth={1.3}
              strokeLinecap="round"
              opacity={0.75 - row * 0.04}
            />
          );
        });
      })}
    </G>
  );
}
