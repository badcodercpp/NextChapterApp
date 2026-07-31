import { Birds } from '../primitives/Birds';
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

interface SunriseSceneProps {
  palette: ScenePalette;
}

export function SunriseScene({ palette }: SunriseSceneProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
    >
      {/* Background */}
      <Sky palette={palette} />

      <Sun palette={palette} />

      <Clouds palette={palette} />

      {/* Landscape */}
      <Landscape variant="back" palette={palette} />

      <Landscape variant="middle" palette={palette} />

      {/* Water */}
      <Lake palette={palette} />

      <Reflection palette={palette} />

      {/* Foreground */}
      <Landscape variant="front" palette={palette} />

      <Trees palette={palette} density={4} />

      <Grass palette={palette} />

      <Flowers palette={palette} density={6} />

      <Birds palette={palette} />
    </Svg>
  );
}
