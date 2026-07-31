import { StyleProp, ViewStyle } from 'react-native';

import { Journal } from '../../types';

export interface JournalCardProps {
  journal: Journal;

  style?: StyleProp<ViewStyle>;

  onPress?: (journal: Journal) => void;
}
