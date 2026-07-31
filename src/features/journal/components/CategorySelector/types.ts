import { StyleProp, ViewStyle } from 'react-native';

import { JournalCategory } from '../../types';

export interface CategorySelectorProps {
  value?: JournalCategory;
  onChange: (category?: JournalCategory) => void;
  style?: StyleProp<ViewStyle>;
  hideAll?: boolean;
}

export interface CategorySelectorItemProps {
  category?: JournalCategory;
  selected: boolean;
  onPress: (category?: JournalCategory) => void;
}
