import { Clouds } from '../primitives/Clouds';
import { Fog } from '../primitives/Fog';
import { Lake } from '../primitives/Lake';
import { Landscape } from '../primitives/Landscape';
import { Rain } from '../primitives/Rain';
import React from 'react';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';

interface RainSceneProps {
  palette: ScenePalette;
}

export function RainScene({ palette }: RainSceneProps) {
  return (
    <>
      <Sky palette={palette} />

      <Clouds palette={palette} />

      <Rain palette={palette} density={55} />

      <Landscape variant="back" palette={palette} />

      <Fog palette={palette} />

      <Landscape variant="middle" palette={palette} />

      <Lake palette={palette} />

      <Landscape variant="front" palette={palette} />
    </>
  );
}
