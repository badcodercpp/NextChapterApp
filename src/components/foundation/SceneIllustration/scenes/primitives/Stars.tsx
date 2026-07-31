import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Star } from './Star';

interface StarsProps {
  palette: ScenePalette;
}

export function Stars({ palette }: StarsProps) {
  return (
    <>
      {SceneLayout.stars.map((star, index) => (
        <Star
          key={index}
          palette={palette}
          x={star.x}
          y={star.y}
          radius={star.r}
          opacity={star.opacity}
        />
      ))}
    </>
  );
}
