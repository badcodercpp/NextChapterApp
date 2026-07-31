import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Tree } from './Tree';

interface TreesProps {
  palette: ScenePalette;

  density?: number;
}

export function Trees({ palette, density = 6 }: TreesProps) {
  const spacing = SceneLayout.width / density;

  return (
    <>
      {Array.from({ length: density }).map((_, index) => (
        <Tree
          key={index}
          palette={palette}
          x={spacing * index + spacing / 2}
          y={SceneLayout.foregroundY - 18}
          scale={0.75 + (index % 3) * 0.15}
          opacity={0.9}
        />
      ))}
    </>
  );
}
