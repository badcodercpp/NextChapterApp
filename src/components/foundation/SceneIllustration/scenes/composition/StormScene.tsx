import { Clouds } from '../primitives/Clouds';
import { Fog } from '../primitives/Fog';
import { Lake } from '../primitives/Lake';
import { Landscape } from '../primitives/Landscape';
import { Lightning } from '../primitives/Lightning';
import { Rain } from '../primitives/Rain';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';
import Svg from 'react-native-svg';

interface StormSceneProps {
  palette: ScenePalette;
}

export function StormScene({ palette }: StormSceneProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
    >
      <Sky palette={palette} />

      <Clouds palette={palette} />

      <Lightning palette={palette} />

      <Rain palette={palette} density={80} />

      <Landscape variant="back" palette={palette} />

      <Fog palette={palette} opacity={0.6} />

      <Landscape variant="middle" palette={palette} />

      <Lake palette={palette} />

      <Landscape variant="front" palette={palette} />
    </Svg>
  );
}
