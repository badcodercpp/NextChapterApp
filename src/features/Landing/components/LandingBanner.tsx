import { View } from 'react-native';

import AppLogo from '@/assets/icons/svg/app_logo.svg';
import { AppText } from '@/components';

export function LandingBanner() {
  return (
    <View className="items-center px-6 pb-12 pt-2">
      <View
        className="h-24 w-24 overflow-hidden rounded-full"
        accessible
        accessibilityLabel="NextChapter logo"
      >
        <AppLogo width="100%" height="100%" />
      </View>

      <View className="mt-6 items-center">
        <AppText variant="5xl" className="text-center text-white font-bold">
          NextChapter
        </AppText>

        <AppText
          variant="xs"
          className="mt-2 text-center font-semibold uppercase tracking-brand text-landing-muted"
        >
          AI RECOVERY COMPANION
        </AppText>
      </View>

      <View className="mt-14 w-full max-w-md items-center">
        <AppText
          variant="xl"
          accessibilityLabel="Every ending is the beginning of your next chapter."
          className="text-center leading-title text-white"
        >
          {'Every ending is the beginning of\nyour next chapter.'}
        </AppText>

        <AppText variant="sm" className="mt-5 text-center text-landing-muted">
          Heal • Grow • Move Forward
        </AppText>
      </View>
    </View>
  );
}
