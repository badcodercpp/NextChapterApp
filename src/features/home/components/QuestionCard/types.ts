import { StyleProp, ViewStyle } from 'react-native';

import { LucideIcon } from 'lucide-react-native';

export interface QuestionCardProps {
  title: string;

  question: string;

  helperText?: string;

  buttonTitle: string;

  icon?: LucideIcon;

  loading?: boolean;

  onPress: () => void;

  style?: StyleProp<ViewStyle>;
}
