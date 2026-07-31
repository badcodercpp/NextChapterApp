import { ScrollView, View } from 'react-native';

import { AppText } from '@/components/foundation/AppText';
import { CategorySelectorItem } from './CategorySelectorItem';
import { CategorySelectorProps } from './types';
import { JournalCategory } from '../../types';
import React from 'react';
import { styles } from './styles';

export const CategorySelector = ({
  value,
  onChange,
  style,
  hideAll,
}: CategorySelectorProps) => {
  const applicableCategory = hideAll
    ? Object.values(JournalCategory).filter(e => e !== JournalCategory.All)
    : Object.values(JournalCategory);
  return (
    <View>
      <View style={styles.titleContainer}>
        <AppText variant="bodyBold">What's this about?</AppText>
      </View>
      <ScrollView
        horizontal
        style={style}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {applicableCategory.map(category => (
          <CategorySelectorItem
            key={category}
            category={category}
            selected={value === category}
            onPress={onChange}
          />
        ))}
      </ScrollView>
    </View>
  );
};
