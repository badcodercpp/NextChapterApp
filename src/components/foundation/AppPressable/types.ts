import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface AppPressableProps extends PressableProps {
  children: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  disabledOpacity?: number;
}
