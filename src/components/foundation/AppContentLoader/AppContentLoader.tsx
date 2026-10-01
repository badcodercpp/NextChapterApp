import { AppContentLoaderProps } from './types';
import React from 'react';
import { View } from 'react-native';

export const AppContentLoader = ({ className = '' }: AppContentLoaderProps) => {
  return (
    <View
      className={`h-5 w-full rounded-md bg-gray-200 animate-pulse ${className}`}
    />
  );
};
