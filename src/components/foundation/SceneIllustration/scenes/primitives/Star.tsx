import { Circle } from 'react-native-svg';
import React from 'react';
import { ScenePalette } from '../types';

interface StarProps {
  palette: ScenePalette;

  x: number;
  y: number;

  radius?: number;

  opacity?: number;
}

export function Star({ palette, x, y, radius = 1.5, opacity = 1 }: StarProps) {
  return (
    <Circle cx={x} cy={y} r={radius} fill={palette.light} opacity={opacity} />
  );
}
