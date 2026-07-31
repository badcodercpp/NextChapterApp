import { Clouds } from '../primitives/Clouds';
import { Flowers } from '../primitives/Flowers';
import { Grass } from '../primitives/Grass';
import { Lake } from '../primitives/Lake';
import { Landscape } from '../primitives/Landscape';
import React from 'react';
import { Reflection } from '../primitives/Reflection';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';
import { Sun } from '../primitives/Sun';
import Svg from 'react-native-svg';
import { Trees } from '../primitives/Trees';

interface ForestSceneProps {
  palette: ScenePalette;
}

export function ForestScene({ palette }: ForestSceneProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
    >
      <Sky palette={palette} />

      <Sun palette={palette} radius={20} />

      <Clouds palette={palette} />

      <Landscape variant="back" palette={palette} />

      <Landscape variant="middle" palette={palette} />

      <Lake palette={palette} width={240} height={50} />

      <Reflection palette={palette} width={90} />

      <Landscape variant="front" palette={palette} />

      <Trees palette={palette} density={10} />

      <Grass palette={palette} />

      <Flowers palette={palette} density={8} />
    </Svg>
  );
}
