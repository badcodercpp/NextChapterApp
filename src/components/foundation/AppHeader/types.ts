import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { ReactNode } from 'react';

export interface AppHeaderProps extends NativeStackHeaderProps {
  title?: string;
  subtitle?: string;
  titleAccessory?: ReactNode;
  subtitleAccessory?: ReactNode;
  right?: ReactNode;
  backDisabled?: boolean;
}

export type AppHeaderOptions = NativeStackHeaderProps['options'] & {
  subtitle?: string;
  headerTitleAccessory?: () => ReactNode;
  headerSubtitleAccessory?: () => ReactNode;
  backDisabled?: boolean;
};
