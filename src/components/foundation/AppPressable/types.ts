import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface AppPressableProps extends PressableProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  disabledOpacity?: number;
  pressedOpacity?: number;
}
