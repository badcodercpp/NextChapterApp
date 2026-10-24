import { AppAuthenticatedLayout, AppButton, AppInput } from '@/components';
import { MoodSelector, RememberCard } from '@/features/CommonFeature';
import React, { useState } from 'react';
import {
  ReflectionIntroCard,
  ReflectionPrompts,
  SessionProgress,
} from '../components';

import { ChevronRight } from 'lucide-react-native';
import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';
import { View } from 'react-native';

export function DailySessionReflectStepScreen() {
  const [value, setValue] = useState<
    Array<RecoveryReasonCurrentFeeling | undefined>
  >([]);

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
        <MoodSelector value={value} setValue={setValue} />
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
