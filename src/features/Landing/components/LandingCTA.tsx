import { AppIcon, AppPressable, AppText } from '@/components';
import { View } from 'react-native';

import { ArrowRightIcon } from 'lucide-react-native';
import { LandingNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

export function LandingCTA() {
  const navigation = useNavigation<LandingNavigationProp>();
  return (
    <View className="mt-32 items-center px-6 pb-12">
      <AppPressable
        accessibilityRole="button"
        accessibilityLabel="Begin Your Journey"
        className="min-h-14 w-full max-w-md flex-row items-center justify-center rounded-2xl bg-landing-primary px-4 py-4"
        onPress={() => navigation.navigate('WhatBringsYouHere')}
      >
        <AppText
          variant="lg"
          className="shrink text-center font-bold text-white"
        >
          Begin Your Journey
        </AppText>
        <View className="ml-3">
          <AppIcon icon={ArrowRightIcon} size={22} className="text-white" />
        </View>
      </AppPressable>

      <View className="mt-5 flex-row flex-wrap items-center justify-center">
        <AppText variant="sm" className="text-landing-muted">
          Already have an account?
        </AppText>

        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Log In"
          className="min-h-11 justify-center px-1 py-2"
          onPress={() => navigation.navigate('Login')}
        >
          <AppText variant="sm" className="font-bold text-white">
            Log In
          </AppText>
        </AppPressable>
      </View>
    </View>
  );
}
