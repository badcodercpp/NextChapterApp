import { Path } from 'react-native-svg';
import React from 'react';
import { ScenePalette } from '../types';

interface MountainsProps {
  palette: ScenePalette;
}

export function Mountains({ palette }: MountainsProps) {
  return (
    <>
      <Path
        fill={palette.mountainBack}
        d="
          M0 175
          C45 150 70 120 110 145
          C155 170 170 90 220 145
          C260 185 305 110 390 170
          L390 300
          L0 300
          Z
        "
      />

      <Path
        fill={palette.mountainMiddle}
        d="
          M0 205
          C45 185 80 155 125 185
          C165 210 195 135 240 185
          C280 220 320 155 390 205
          L390 300
          L0 300
          Z
        "
      />

      <Path
        fill={palette.mountainFront}
        d="
          M0 235
          C70 205 135 215 190 235
          C240 252 310 212 390 232
          L390 300
          L0 300
          Z
        "
      />
    </>
  );
}
