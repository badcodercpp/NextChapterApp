import { Clouds } from '../primitives/Clouds';
import { Lake } from '../primitives/Lake';
import { Landscape } from '../primitives/Landscape';
import { Moon } from '../primitives/Moon';
import React from 'react';
import { Reflection } from '../primitives/Reflection';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';
import { Sky } from '../primitives/Sky';
import { Stars } from '../primitives/Stars';
import Svg from 'react-native-svg';

interface MoonSceneProps {
  palette: ScenePalette;
}

export function MoonScene({ palette }: MoonSceneProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
    >
      <Sky palette={palette} />

      <Stars palette={palette} />

      <Moon palette={palette} />

      <Clouds palette={palette} />

      <Landscape variant="back" palette={palette} />

      <Landscape variant="middle" palette={palette} />

      <Lake palette={palette} />

      <Reflection palette={palette} />

      <Landscape variant="front" palette={palette} />
    </Svg>
  );
}
