import { Image, View } from 'react-native';

import { AppText } from '@/components';

export function LandingBanner() {
  return (
    <View className="items-center px-4 pt-4">
      <View className="h-28 w-28 items-center justify-center rounded-full bg-surface">
        <Image
          source={require('@/assets/images/logo.png')}
          resizeMode="contain"
          className="h-20 w-20"
        />
      </View>

      <View className="mt-8 items-center">
        <AppText variant="5xl" className="text-text font-bold">
          NextChapter
        </AppText>

        <AppText
          variant="lg"
          className="mt-2 uppercase tracking-brand text-text-secondary"
        >
          AI RECOVERY COMPANION
        </AppText>
      </View>

      <View className="mt-20 items-center">
        <AppText
          variant="2xl"
          className="text-center font-medium leading-title text-text"
        >
          Every ending is the beginning of your next chapter.
        </AppText>

        <AppText variant="lg" className="mt-8 text-text-secondary">
          Heal • Grow • Move Forward
        </AppText>
      </View>
    </View>
  );
}
