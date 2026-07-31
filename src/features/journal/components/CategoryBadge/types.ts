import { StyleProp, ViewStyle } from 'react-native';

import { JournalCategory } from '../../types';

export interface CategoryBadgeProps {
  category: JournalCategory;

  style?: StyleProp<ViewStyle>;
}
