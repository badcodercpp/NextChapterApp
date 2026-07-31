import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

interface ProgressBarProps {
  progress: number; // 0 - 1
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.min(progress, 1) * 100}%`,
          },
        ]}
      />
    </View>
  );
}
