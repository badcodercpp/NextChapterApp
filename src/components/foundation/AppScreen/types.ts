import { ScrollViewProps, ViewProps } from 'react-native';

export interface AppScreenProps extends ViewProps {
  children: React.ReactNode;

  scroll?: boolean;

  keyboard?: boolean;

  safeArea?: boolean;

  safeTop?: boolean;

  safeBottom?: boolean;

  className?: string;

  contentClassName?: string;

  scrollProps?: ScrollViewProps;
}
