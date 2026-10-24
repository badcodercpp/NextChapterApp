import { AppContentLoaderProps } from './types';
import React from 'react';
import { View } from 'react-native';

export const AppContentSingleLineLoader = ({}: AppContentLoaderProps) => {
  return (
    <View className="gap-3 rounded-2xl bg-surface p-4">
      <View className="h-5 w-3/4 rounded-md bg-primary animate-pulse" />
    </View>
  );
};

export const AppContentLoader = ({ noOfItem = 1 }: AppContentLoaderProps) => {
  const targetNoOfItem = Array.from({ length: noOfItem });
  return (
    <View>
      {targetNoOfItem.map((_, index) => (
        <View
          className="gap-3 rounded-2xl bg-surface p-4"
          key={`loader_${index}`}
        >
          <View className="h-5 w-3/4 rounded-md bg-primary animate-pulse" />
          <View className="h-4 w-full rounded-md bg-primary animate-pulse" />
          <View className="h-7 w-full rounded-xl bg-primary animate-pulse" />
        </View>
      ))}
    </View>
  );
};
