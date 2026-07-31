import { ScenePalette, SceneVariant } from './types';

import { ForestScene } from './composition/ForestScene';
import { GoldenFieldScene } from './composition/GoldenFieldScene';
import { HillsScene } from './composition/HillsScene';
import { LakeScene } from './composition/LakeScene';
import { MistScene } from './composition/MistScene';
import { MoonScene } from './composition/MoonScene';
import { RainScene } from './composition/RainScene';
import React from 'react';
import { SceneLayout } from './SceneLayout';
import { StormScene } from './composition/StormScene';
import { SunriseScene } from './composition/SunriseScene';
import Svg from 'react-native-svg';

interface SceneProps {
  variant: SceneVariant;

  palette: ScenePalette;

  children?: React.ReactNode;
}

const renderScene = (variant: SceneVariant, palette: ScenePalette) => {
  switch (variant) {
    case 'sunrise':
      return <SunriseScene palette={palette} />;

    case 'lake':
      return <LakeScene palette={palette} />;

    case 'forest':
      return <ForestScene palette={palette} />;

    case 'goldenField':
      return <GoldenFieldScene palette={palette} />;

    case 'rain':
      return <RainScene palette={palette} />;

    case 'moon':
      return <MoonScene palette={palette} />;

    case 'mist':
      return <MistScene palette={palette} />;

    case 'storm':
      return <StormScene palette={palette} />;

    case 'hills':
      return <HillsScene palette={palette} />;

    default:
      return <SunriseScene palette={palette} />;
  }
};

export function Scene({ children, variant, palette }: SceneProps) {
  switch (variant) {
    case 'sunrise':
      return <SunriseScene palette={palette} />;

    case 'lake':
      return <LakeScene palette={palette} />;

    case 'forest':
      return <ForestScene palette={palette} />;

    case 'goldenField':
      return <GoldenFieldScene palette={palette} />;

    case 'rain':
      return (
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${SceneLayout.width} ${SceneLayout.height}`}
        >
          {renderScene(variant, palette)}

          {children}
        </Svg>
      );

    case 'moon':
      return <MoonScene palette={palette} />;

    case 'mist':
      return <MistScene palette={palette} />;

    case 'storm':
      return <StormScene palette={palette} />;

    case 'hills':
      return <HillsScene palette={palette} />;

    default:
      return <SunriseScene palette={palette} />;
  }
}
