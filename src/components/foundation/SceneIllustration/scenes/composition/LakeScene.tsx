import { Birds } from '../primitives/Birds';
import { Clouds } from '../primitives/Clouds';
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

interface LakeSceneProps {
  palette: ScenePalette;
}

export function LakeScene({ palette }: LakeSceneProps) {
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

      <Lake palette={palette} />

      <Reflection palette={palette} width={150} />

      <Landscape variant="front" palette={palette} />

      <Grass palette={palette} />

      <Birds palette={palette} />
    </Svg>
  );
}
