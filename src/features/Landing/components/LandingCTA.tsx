import { AppButton, AppText } from '@/components';
import { Pressable, View } from 'react-native';

import { ArrowRight } from 'lucide-react-native';
import React from 'react';

interface LandingCTAProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingCTA({ onGetStarted, onLogin }: LandingCTAProps) {
  return (
    <View className="px-6 pb-10">
      <AppButton
        title="Begin Your Journey"
        onPress={onGetStarted}
        rightIcon={ArrowRight}
      />

      <View className="mt-7 flex-row items-center justify-center">
        <AppText variant="bodySmall" color="textSecondary">
          Already have an account?
        </AppText>

        <Pressable onPress={onLogin} className="ml-2" hitSlop={10}>
          <AppText variant="bodySmall" color="primary">
            Log In
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
