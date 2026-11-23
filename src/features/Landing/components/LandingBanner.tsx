import { View } from 'react-native';

import AppLogo from '@/assets/icons/svg/app_logo.svg';
import { AppText } from '@/components';

export function LandingBanner() {
  return (
    <View className="items-center px-6 pb-12 pt-2">
      <View
        className="h-24 w-24 overflow-hidden rounded-full"
        accessible
        accessibilityLabel="Outdated.me logo"
      >
        <AppLogo width="100%" height="100%" />
      </View>

      <View className="mt-6 items-center">
        <AppText variant="5xl" className="text-center text-text-v2 font-bold">
          Outdated.me
        </AppText>

        <AppText
          variant="xs"
          className="mt-2 text-center font-semibold uppercase tracking-brand text-text-muted-v2"
        >
          AI RECOVERY COMPANION
        </AppText>
      </View>

      <View className="mt-14 w-full max-w-md items-center">
        <AppText
          variant="xl"
          accessibilityLabel="Every ending is the beginning of your next chapter."
          className="text-center leading-title text-text-v2"
        >
          {'Every ending is the beginning of\nyour next chapter.'}
        </AppText>

        <AppText variant="sm" className="mt-5 text-center text-text-muted-v2">
          Heal • Grow • Move Forward
        </AppText>
      </View>
    </View>
  );
}
