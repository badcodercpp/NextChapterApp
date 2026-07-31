import { Cloud } from './cloud';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface CloudsProps {
  palette: ScenePalette;
}

export function Clouds({ palette }: CloudsProps) {
  return (
    <>
      {SceneLayout.clouds.map((cloud, index) => (
        <Cloud
          key={index}
          palette={palette}
          x={cloud.x}
          y={cloud.y}
          scale={cloud.scale}
          opacity={cloud.opacity}
        />
      ))}
    </>
  );
}
