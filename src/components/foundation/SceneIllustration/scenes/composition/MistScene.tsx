import { Clouds } from '../primitives/Clouds';
import { Fog } from '../primitives/Fog';
import { Landscape } from '../primitives/Landscape';
import { Moon } from '../primitives/Moon';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';
import Svg from 'react-native-svg';

interface MistSceneProps {
  palette: ScenePalette;
}

export function MistScene({ palette }: MistSceneProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
    >
      <Sky palette={palette} />

      <Moon palette={palette} />

      <Clouds palette={palette} />

      <Landscape variant="back" palette={palette} />

      <Fog palette={palette} opacity={0.7} />

      <Landscape variant="middle" palette={palette} />

      <Fog palette={palette} y={220} opacity={0.45} />

      <Landscape variant="front" palette={palette} />
    </Svg>
  );
}
