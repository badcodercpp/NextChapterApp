import AppLogo from '@/assets/icons/svg/app_logo.svg';
import { AppText } from '@/components';
import { View } from 'react-native';

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
          variant="lg"
          className="mt-2 text-center font-semibold text-text-muted-v2"
        >
          An AI Companion
        </AppText>
      </View>

      <View className="mt-14 w-full max-w-md items-center">
        <AppText
          variant="2xl"
          accessibilityLabel="Every ending is the beginning of your next chapter."
          className="text-center leading-title text-text-v2"
        >
          The journey back to you.
        </AppText>

        <AppText variant="md" className="mt-2 text-center text-text-muted-v2">
          Heal • Grow • Move Forward
        </AppText>
      </View>
    </View>
  );
}
