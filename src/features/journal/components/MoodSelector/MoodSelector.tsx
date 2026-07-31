import { ScrollView, View } from 'react-native';

import { AppText } from '@/components/foundation/AppText';
import { MoodSelectorItem } from './MoodSelectorItem';
import { MoodSelectorProps } from './types';
import React from 'react';
import { UserMood } from '@/constants';
import { styles } from './styles';

export const MoodSelector = ({ value, onChange, style }: MoodSelectorProps) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <AppText variant="bodyBold">How are you feeling?</AppText>
      </View>
      <ScrollView
        horizontal
        style={style}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {Object.values(UserMood).map(mood => (
          <MoodSelectorItem
            key={mood}
            mood={mood}
            selected={value === mood}
            onPress={onChange}
          />
        ))}
      </ScrollView>
    </View>
  );
};
