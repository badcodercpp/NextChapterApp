import { AppText } from '@/components/foundation/AppText';
import { MoodChipProps } from './types';
import React from 'react';
import { Theme } from '@/theme';
import { UserMoodConfig } from '@/constants';
import { View } from 'react-native';
import { getMoodBackgroundColor } from '../../utils';
import { moodSizeConfig } from './config';
import { styles } from './styles';

export function MoodChip({
  mood,
  selected = false,
  showLabel = true,
  size = 'medium',
  variant = 'vertical',
}: MoodChipProps) {
  const moodConfig = mood ? UserMoodConfig[mood] : undefined;
  const config = moodSizeConfig[size ?? 'medium'];

  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        variant === 'horizontal' && {
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
    >
      <View
        style={[
          styles.circle,
          {
            backgroundColor: getMoodBackgroundColor(mood),
            width: config.circle,
            height: config.circle,
            borderRadius: config.circle / 2,
          },
          selected && {
            borderColor: Theme.colors.primary,
          },
        ]}
      >
        <AppText
          style={[
            styles.emoji,
            {
              fontSize: config.emoji,
              lineHeight: config.lineHeight,
            },
          ]}
        >
          {moodConfig?.emoji}
        </AppText>
      </View>

      {showLabel && (
        <AppText
          variant="label"
          style={[
            styles.label,
            variant === 'vertical'
              ? {
                  marginTop: config.labelSpacing,
                }
              : { marginLeft: Theme.spacing.sm },
            selected && {
              color: Theme.colors.primary,
            },
          ]}
        >
          {moodConfig?.label}
        </AppText>
      )}
    </View>
  );
}
