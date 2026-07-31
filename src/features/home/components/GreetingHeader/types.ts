import { StyleProp, ViewStyle } from 'react-native';

export interface GreetingHeaderProps {
  greeting: string;

  name: string;

  emoji?: string;

  style?: StyleProp<ViewStyle>;
}
