import { NativeStackHeaderProps } from '@react-navigation/native-stack';

export interface AppHeaderProps extends NativeStackHeaderProps {
  title?: string;
  backDisabled?: boolean;
}
