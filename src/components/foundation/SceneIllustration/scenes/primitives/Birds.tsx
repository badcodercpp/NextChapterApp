import { Bird } from './Bird';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface BirdsProps {
  palette: ScenePalette;
}

export function Birds({ palette }: BirdsProps) {
  return (
    <>
      {SceneLayout.birds.map((bird, index) => (
        <Bird
          key={index}
          palette={palette}
          x={bird.x}
          y={bird.y}
          scale={bird.scale}
        />
      ))}
    </>
  );
}
