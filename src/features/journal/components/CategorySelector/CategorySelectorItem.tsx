import { AppPressable } from '@/components/foundation/AppPressable';
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { CategorySelectorItemProps } from './types';
import React from 'react';

export const CategorySelectorItem = ({
  category,
  selected,
  onPress,
}: CategorySelectorItemProps) => {
  return (
    <AppPressable onPress={() => onPress(category)}>
      <CategoryChip category={category} selected={selected} />
    </AppPressable>
  );
};
