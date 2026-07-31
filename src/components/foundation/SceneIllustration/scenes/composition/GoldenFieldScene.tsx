import { Birds } from '../primitives/Birds';
import { Clouds } from '../primitives/Clouds';
import { Flowers } from '../primitives/Flowers';
import { Grass } from '../primitives/Grass';
import { Landscape } from '../primitives/Landscape';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';
import { Sun } from '../primitives/Sun';
import Svg from 'react-native-svg';
import { Trees } from '../primitives/Trees';

interface GoldenFieldSceneProps {
  palette: ScenePalette;
}

export function GoldenFieldScene({ palette }: GoldenFieldSceneProps) {
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

      <Trees palette={palette} density={3} />

      <Grass palette={palette} density={24} />

      <Flowers palette={palette} density={20} />

      <Birds palette={palette} />
    </Svg>
  );
}
