import { AppText } from '@/components/foundation/AppText';
import { Leaf } from 'lucide-react-native';
import React from 'react';
import { Theme } from '@/theme';
import { View } from 'react-native';
import { styles } from '../styles';

interface JourneyProgressProps {
  day: number;
  totalDays: number;
  phase: string;
}

export function JourneyProgress({
  day,
  totalDays,
  phase,
}: JourneyProgressProps) {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.header}>
        <Leaf size={12} color={Theme.colors.primary} />
        <AppText
          variant="caption"
          color="textSecondary"
          style={styles.headerTitle}
        >
          Your Journey
        </AppText>
        <Leaf size={12} color={Theme.colors.primary} />
      </View>

      <View style={[styles.dayRow, styles.marginTop]}>
        <AppText variant="titleMediumBold">Day {day}</AppText>

        <AppText variant="titleSmallBold" style={styles.horizontalSpacing}>
          /
        </AppText>

        <AppText variant="titleSmallBold">{totalDays}</AppText>
      </View>

      <AppText
        variant="caption"
        color="textSecondary"
        style={styles.phaseLabel}
      >
        Phase 1 • {phase}
      </AppText>
    </View>
  );
}
