import { AppText } from '@/components/foundation/AppText';
import { ProgressBar } from './ProgressBar';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

interface Props {
  completed: number;
  remaining: number;
  progress: number;
}

export function JourneyFooter({ completed, remaining, progress }: Props) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLabels}>
        <AppText variant="caption" color="textSecondary">
          {completed} days completed
        </AppText>

        <AppText variant="caption" color="textSecondary">
          {remaining} days left
        </AppText>
      </View>

      <ProgressBar progress={progress} />
    </View>
  );
}
