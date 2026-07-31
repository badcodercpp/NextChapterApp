import { Birds } from '../primitives/Birds';
import { Clouds } from '../primitives/Clouds';
import { Grass } from '../primitives/Grass';
import { Landscape } from '../primitives/Landscape';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';
import { Sun } from '../primitives/Sun';
import Svg from 'react-native-svg';

interface HillsSceneProps {
  palette: ScenePalette;
}

export function HillsScene({ palette }: HillsSceneProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
    >
      <Sky palette={palette} />

      <Sun palette={palette} />

      <Clouds palette={palette} />

      <Landscape variant="back" palette={palette} />

      <Landscape variant="middle" palette={palette} />

      <Landscape variant="front" palette={palette} />

      <Grass palette={palette} density={14} />

      <Birds palette={palette} />
    </Svg>
  );
}
