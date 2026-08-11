import { AppButton, AppText } from '@/components';
import { Pressable, View } from 'react-native';

import { ArrowRightIcon } from 'lucide-react-native';
import { LandingNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';

export function LandingCTA() {
  const navigation = useNavigation<LandingNavigationProp>();
  return (
    <View className="px-4 pb-16">
      <AppButton
        title="Begin Your Journey"
        size="md"
        rightIcon={ArrowRightIcon}
        fullWidth
        onPress={() => navigation.navigate('WhatBringsYouHere')}
      />

      <View className="mt-2 flex-row items-center justify-center">
        <AppText variant="md" className="text-text-secondary">
          Already have an account?
        </AppText>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <AppText variant="md" className="ml-2 font-bold text-text">
            Log In
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
