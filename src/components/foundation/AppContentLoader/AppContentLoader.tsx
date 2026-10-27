import { AppContentLoaderProps } from './types';
import React from 'react';
import Skeleton from 'react-native-reanimated-skeleton';
import { View } from 'react-native';
import { useResolveClassNames } from 'uniwind';

export const AppContentSingleLineLoader = ({}: AppContentLoaderProps) => {
  const { color: boneColor } = useResolveClassNames('text-primary');
  const { color: highlightColor } = useResolveClassNames('text-text-muted');

  return (
    <View className="flex-1 rounded-2xl bg-surface p-4">
      <Skeleton
        isLoading
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{
          flex: 1,
        }}
        animationDirection="horizontalRight"
        boneColor={boneColor?.toString()}
        highlightColor={highlightColor?.toString()}
        layout={[
          {
            key: 'header',
            width: '100%',
            height: 24,
            borderRadius: 8,
          },
        ]}
      />
    </View>
  );
};

export const AppCardContentLoader = ({}: AppContentLoaderProps) => {
  const { color: boneColor } = useResolveClassNames('text-primary');
  const { color: highlightColor } = useResolveClassNames('text-text-muted');

  return (
    <View className="flex-1 rounded-2xl bg-surface p-4">
      <Skeleton
        isLoading
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{
          flex: 1,
        }}
        animationDirection="horizontalRight"
        boneColor={boneColor?.toString()}
        highlightColor={highlightColor?.toString()}
        layout={[
          {
            key: 'header',
            width: '70%',
            height: 24,
            borderRadius: 8,
            marginBottom: 16,
          },
          {
            key: 'score',
            width: '100%',
            height: 180,
            borderRadius: 20,
            marginBottom: 16,
          },
          {
            key: 'title',
            width: '50%',
            height: 20,
            borderRadius: 8,
            marginBottom: 16,
          },
          {
            key: 'description',
            width: '90%',
            height: 16,
            borderRadius: 8,
          },
        ]}
      />
    </View>
  );
};

export const AppContentLoader = ({}: AppContentLoaderProps) => {
  return <AppCardContentLoader />;
};
