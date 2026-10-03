import { AppAuthenticatedLayout, AppButton, AppInput } from '@/components';
import { MoodSelector, RememberCard } from '@/features/CommonFeature';
import {
  ReflectionIntroCard,
  ReflectionPrompts,
  SessionProgress,
} from '../components';

import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export function DailySessionReflectStepScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <SessionProgress currentStep={'REFLECTION'} />
      </View>
      <View className="mt-4">
        <ReflectionIntroCard />
      </View>
      <View className="mt-4">
        <ReflectionPrompts />
      </View>
      <View className="mt-4">
        <MoodSelector />
      </View>
      <View className="mt-4">
        <AppInput
          value={''}
          onChangeText={() => {}}
          placeholder="Anything else you want to say?"
          multiline
          showCharacterCount
          className="w-full"
          inputClassName=" px-2 pt-4 text-md text-text border-border"
          containerClassName="border-border"
        />
      </View>
      <View className="mt-4">
        <AppButton
          title="Continue"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={() => {}}
          rightIcon={ChevronRight}
        />
      </View>
      <View className="mt-4">
        <RememberCard
          title="Remember"
          message="Reflection turns experiences into growth."
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
