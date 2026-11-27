import { ViewProps } from 'react-native';

export type CardVariant = 'surface' | 'primary' | 'transparent';

export interface AppCardProps extends ViewProps {
  children: React.ReactNode;

  variant?: CardVariant;

  border?: boolean;

  decorated?: boolean;

  lockExempt?: boolean;

  className?: string;
}
