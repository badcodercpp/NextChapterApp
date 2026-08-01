import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

export interface AppEmptyStateProps extends ViewProps {
  title: string;

  description?: string;

  illustration?: ReactNode;

  footer?: ReactNode;

  className?: string;

  titleClassName?: string;

  descriptionClassName?: string;
}
