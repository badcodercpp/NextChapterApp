import { AppCard } from '@/components/foundation/AppCard';
import { AppText } from '@/components/foundation/AppText';
import { Colors } from '@/theme/colors';
import React from 'react';
import { RecoveryProgressProps } from './types';
import { View } from 'react-native';
import { styles } from './styles';

export function RecoveryProgress({
  currentDay,
  totalDays,
  recoveryScore,
  style,
}: RecoveryProgressProps) {
  const progress = Math.min(100, Math.max(0, (currentDay / totalDays) * 100));

  return (
    <AppCard style={style} padding="xl">
      <AppText variant="titleLarge" style={styles.title}>
        Recovery Progress
      </AppText>

      <View
        style={[
          styles.progressContainer,
          {
            backgroundColor: Colors.surfaceSecondary,
          },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: Colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <AppText variant="bodySmall" color="textSecondary">
          Day {currentDay} of {totalDays}
        </AppText>

        <AppText variant="bodySmall" color="primary">
          {recoveryScore}%
        </AppText>
      </View>
    </AppCard>
  );
}
