import { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

interface SkyProps {
  palette: ScenePalette;
}

export function Sky({ palette }: SkyProps) {
  return (
    <>
      <Defs>
        <LinearGradient
          id="scene-sky-gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop offset="0%" stopColor={palette.skyTop} />

          <Stop offset="100%" stopColor={palette.skyBottom} />
        </LinearGradient>
      </Defs>

      <Rect
        x={0}
        y={0}
        width={SceneLayout.width}
        height={SceneLayout.height}
        fill="url(#scene-sky-gradient)"
      />

      <Rect
        x={0}
        y={0}
        width={SceneLayout.width}
        height={SceneLayout.height}
        fill={palette.atmosphere}
        opacity={0.15}
      />
    </>
  );
}
