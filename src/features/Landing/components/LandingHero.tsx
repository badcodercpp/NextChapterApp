import { AppLogo, AppText } from '@/components';

import React from 'react';
import { View } from 'react-native';

export function LandingHero() {
  return (
    <View className="items-center px-8 pt-10">
      {/* Logo */}
      <AppLogo size={84} />

      {/* Brand */}
      <View className="mt-8 items-center">
        <AppText variant="h1" className="text-center">
          NextChapter
        </AppText>

        <AppText
          variant="caption"
          color="textSecondary"
          className="mt-2 uppercase tracking-[3px]"
        >
          AI Recovery Companion
        </AppText>
      </View>

      {/* Headline */}
      <View className="mt-20 items-center">
        <AppText variant="h2" className="text-center leading-[42px]">
          Every ending is the
        </AppText>

        <AppText variant="h2" className="text-center leading-[42px]">
          beginning of your
        </AppText>

        <AppText variant="h2" className="text-center leading-[42px]">
          next chapter.
        </AppText>
      </View>

      {/* Tagline */}
      <AppText
        variant="bodySmall"
        color="textSecondary"
        className="mt-8 tracking-[1px]"
      >
        Heal • Grow • Move Forward
      </AppText>
    </View>
  );
}
