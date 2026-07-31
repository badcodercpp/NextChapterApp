import { Flower } from './Flower';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface FlowersProps {
  palette: ScenePalette;

  density?: number;
}

export function Flowers({ palette, density = 12 }: FlowersProps) {
  const spacing = SceneLayout.width / density;

  return (
    <>
      {Array.from({ length: density }).map((_, index) => {
        const x = spacing * index + spacing / 2;

        const y = SceneLayout.foregroundY - (index % 2 === 0 ? 8 : 14);

        return (
          <Flower
            key={index}
            palette={palette}
            x={x}
            y={y}
            scale={0.8 + (index % 3) * 0.2}
            opacity={0.9}
          />
        );
      })}
    </>
  );
}
