import { StyleProp, ViewStyle } from 'react-native';

export interface RecoveryProgressProps {
  currentDay: number;

  totalDays: number;

  recoveryScore: number;

  style?: StyleProp<ViewStyle>;
}
