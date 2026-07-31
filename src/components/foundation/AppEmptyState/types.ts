import { StyleProp, ViewStyle } from 'react-native';

import React from 'react';

export interface AppEmptyStateProps {
  image?: React.ReactNode;

  title: string;

  description?: string;

  action?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}
