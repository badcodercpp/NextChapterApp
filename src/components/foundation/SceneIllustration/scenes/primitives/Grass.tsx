import { G, Path } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface GrassProps {
  palette: ScenePalette;

  y?: number;

  density?: number;

  opacity?: number;
}

export function Grass({
  palette,
  y = SceneLayout.foregroundY,
  density = 18,
  opacity = 1,
}: GrassProps) {
  const width = SceneLayout.width;
  const spacing = width / density;

  return (
    <G opacity={opacity}>
      {Array.from({ length: density }).map((_, index) => {
        const x = index * spacing + spacing / 2;
        const height = 10 + (index % 3) * 4;

        return (
          <Path
            key={index}
            d={`
              M ${x} ${y}
              Q ${x - 3} ${y - height * 0.6} ${x - 1} ${y - height}
              M ${x} ${y}
              Q ${x + 3} ${y - height * 0.6} ${x + 1} ${y - height + 2}
              M ${x} ${y}
              Q ${x} ${y - height * 0.4} ${x} ${y - height + 1}
            `}
            stroke={palette.foreground}
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
    </G>
  );
}
