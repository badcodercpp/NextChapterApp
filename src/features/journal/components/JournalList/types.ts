import { StyleProp, ViewStyle } from 'react-native';

import { Journal } from '../../types';

export interface JournalListProps {
  journals: Journal[];

  style?: StyleProp<ViewStyle>;

  onJournalPress?: (journal: Journal) => void;

  onCreatePress?: () => void;
}

export interface JournalSection {
  title: string;
  data: Journal[];
}
