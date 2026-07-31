import { AppText } from '@/components/foundation/AppText';
import { Mood } from '../types';
import { Pressable } from 'react-native';
import React from 'react';
import { styles } from '../styles';

interface Props {
  mood: Mood;
  selected: boolean;
  onPress: () => void;
}

export function MoodOption({ mood, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, selected && styles.selectedOption]}
    >
      <AppText style={styles.emoji}>{mood.emoji}</AppText>

      <AppText
        variant="body"
        style={[styles.optionTitle, selected && styles.selectedTitle]}
      >
        {mood.title}
      </AppText>
    </Pressable>
  );
}
