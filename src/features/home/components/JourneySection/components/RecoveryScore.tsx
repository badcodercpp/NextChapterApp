import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { Theme } from '@/theme';
import { TrendingUp } from 'lucide-react-native';
import { View } from 'react-native';
import { styles } from '../styles';

interface RecoveryScoreProps {
  score: number;
  change: number;
}

export function RecoveryScore({ score, change }: RecoveryScoreProps) {
  return (
    <View style={styles.scoreContainer}>
      <AppText variant="caption" color="textSecondary">
        Recovery Score
      </AppText>

      <AppText
        variant="titleMediumBold"
        style={[styles.score, styles.marginTop]}
      >
        {score}%
      </AppText>

      <View style={styles.changeRow}>
        <TrendingUp size={14} color={Theme.colors.success} />

        <AppText variant="caption" style={styles.changeText}>
          +{change}% today
        </AppText>
      </View>
    </View>
  );
}
