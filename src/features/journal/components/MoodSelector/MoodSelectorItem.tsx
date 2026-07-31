import { AppPressable } from '@/components/foundation/AppPressable';
import { MoodChip } from '../MoodChip/MoodChip';
import { MoodSelectorItemProps } from './types';
import React from 'react';
import { styles } from './styles';

export const MoodSelectorItem = ({
  mood,
  selected,
  onPress,
}: MoodSelectorItemProps) => {
  return (
    <AppPressable style={styles.item} onPress={() => onPress(mood)}>
      <MoodChip mood={mood} selected={selected} />
    </AppPressable>
  );
};
