import { ActivityIndicator, ColorValue, View } from 'react-native';

import { AppLoaderProps } from './types';
import { AppText } from '../AppText';
import { useCSSVariable } from 'uniwind';

export function AppLoader({ title }: AppLoaderProps) {
  const loaderColor = useCSSVariable('--color-secondary') as ColorValue;
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color={loaderColor} />

      {title && <AppText className="mt-4 text-text-secondary">{title}</AppText>}
    </View>
  );
}
