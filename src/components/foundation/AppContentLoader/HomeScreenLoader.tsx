import {
  AppContentLoader,
  AppContentSingleLineLoader,
} from '../AppContentLoader';

import { View } from 'react-native';

interface HomeScreenLoaderProps {}

export function HomeScreenLoader({}: HomeScreenLoaderProps) {
  return (
    <>
      <View className="mt-2">
        <AppContentLoader />
      </View>
      <View className="mt-4">
        <AppContentLoader />
      </View>
      <View className="mt-4">
        <AppContentLoader />
      </View>
      <View className="mt-4">
        <AppContentSingleLineLoader />
      </View>
      <View className="mt-4">
        <AppContentLoader />
      </View>
      <View className="mt-4">
        <AppContentLoader />
      </View>
    </>
  );
}
