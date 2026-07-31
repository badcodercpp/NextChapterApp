import CircularProgress from 'react-native-circular-progress-indicator';
import React from 'react';
import { Theme } from '@/theme';

interface Props {
  progress: number;
}

export function RecoveryRing({ progress }: Props) {
  return (
    <CircularProgress
      value={progress}
      radius={24}
      activeStrokeWidth={8}
      inActiveStrokeWidth={8}
      progressValueColor="transparent"
      activeStrokeColor={Theme.colors.primary}
      inActiveStrokeColor="#F1F1F1"
      maxValue={100}
    />
  );
}
