import { FlatList, View } from 'react-native';

import { MoodHeader } from './components/MoodHeader';
import { MoodOption } from './components/MoodOption';
import { MoodSectionProps } from './types';
import React from 'react';
import { styles } from './styles';

export function MoodSection({
  moods,
  selectedMood,
  onSelectMood,
  onEdit,
}: MoodSectionProps) {
  return (
    <View style={styles.container}>
      <MoodHeader onEdit={onEdit} />

      <FlatList
        horizontal
        data={moods}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MoodOption
            mood={item}
            selected={selectedMood === item.id}
            onPress={() => onSelectMood(item.id)}
          />
        )}
      />
    </View>
  );
}
