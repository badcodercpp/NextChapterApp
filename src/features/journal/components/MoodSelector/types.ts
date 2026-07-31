import { StyleProp, ViewStyle } from 'react-native';

import { UserMood } from '@/constants';

export interface MoodSelectorProps {
  value?: UserMood;

  onChange: (mood?: UserMood) => void;

  style?: StyleProp<ViewStyle>;
}

export interface MoodSelectorItemProps {
  mood?: UserMood;

  selected: boolean;

  onPress: (mood?: UserMood) => void;
}
