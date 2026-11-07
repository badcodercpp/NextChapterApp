import {
  AppAuthenticatedLayout,
  AppButton,
  AppCard,
  AppIcon,
  AppInput,
  AppText,
} from '@/components';
import { MoodSelector, RememberCard } from '@/features/CommonFeature';
import React, { useState } from 'react';
import {
  ReflectionIntroCard,
  ReflectionPrompts,
  SessionProgress,
} from '../components';

import { ChevronRight, PencilLine } from 'lucide-react-native';
import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';
import { View } from 'react-native';

export function DailySessionReflectStepScreen() {
  const [additionalThoughts, setAdditionalThoughts] = useState('');
  const [value, setValue] = useState<
    Array<RecoveryReasonCurrentFeeling | undefined>
  >([]);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-5">
        <SessionProgress currentStep={'REFLECTION'} />
      </View>
      <View className="mt-5">
        <ReflectionIntroCard />
      </View>
      <View className="mt-4">
        <ReflectionPrompts />
      </View>
      <View className="mt-4">
        <MoodSelector
          variant="journal"
          collapsedCount={6}
          description="Check in with your emotions right now."
          value={value}
          setValue={setValue}
        />
      </View>
      <View className="mt-4">
        <AppCard className="rounded-[24px] border border-primary-v2/30 bg-background-v2 p-3">
          <View className="mb-2 flex-row items-center">
            <AppIcon
              icon={PencilLine}
              size={20}
              className="mr-2 text-link-v2"
            />
            <AppText variant="sm" className="flex-1 text-text-v2">
              Anything else you want to say?
            </AppText>
          </View>
          <AppInput
            variant="v2"
            value={additionalThoughts}
            onChangeText={setAdditionalThoughts}
            placeholder="Write your thoughts here..."
            multiline
            showCharacterCount
            className="w-full"
            inputClassName="min-h-[88px] px-3 pt-3 text-md text-text-v2"
            containerClassName="rounded-[18px] border-primary-v2/25 bg-background-v2"
          />
        </AppCard>
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
          themed
          title="Remember"
          message="Reflection turns experiences into growth."
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
