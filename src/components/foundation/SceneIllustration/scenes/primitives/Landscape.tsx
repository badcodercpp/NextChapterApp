import { G, Path } from 'react-native-svg';

import { LandscapePaths } from '../paths/LandscapePaths';
import React from 'react';
import { SceneLayout } from '../SceneLayout';
import { ScenePalette } from '../types';

type LandscapeVariant = 'back' | 'middle' | 'front';

interface LandscapeProps {
  palette: ScenePalette;

  variant: LandscapeVariant;

  offsetY?: number;

  scale?: number;

  opacity?: number;
}

const VARIANT_CONFIG = {
  back: {
    color: 'mountainBack',
    path: LandscapePaths.back,
    y: SceneLayout.backLandscapeY,
  },
  middle: {
    color: 'mountainMiddle',
    path: LandscapePaths.middle,
    y: SceneLayout.middleLandscapeY,
  },
  front: {
    color: 'mountainFront',
    path: LandscapePaths.front,
    y: SceneLayout.frontLandscapeY,
  },
} as const;

export function Landscape({
  palette,
  variant,
  offsetY = 0,
  scale = 1,
  opacity = 1,
}: LandscapeProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <G
      opacity={opacity}
      transform={`
        translate(0 ${config.y + offsetY})
        scale(${scale})
      `}
    >
      <Path d={config.path} fill={palette[config.color]} />
    </G>
  );
}
