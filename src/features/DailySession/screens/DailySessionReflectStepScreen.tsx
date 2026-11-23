import {
  AppAuthenticatedLayout,
  AppButton,
  AppCard,
  AppIcon,
  AppLoadingModal,
  AppText,
} from '@/components';
import { ChevronRight, PencilLine } from 'lucide-react-native';
import {
  MoodSelector,
  ReflectionAddiotionalUserMessageInputCard,
  RememberCard,
} from '@/features/CommonFeature';
import {
  ReflectionIntroCard,
  ReflectionPrompts,
  SessionProgress,
} from '../components';

import React from 'react';
import { View } from 'react-native';
import { useDailySessionReflectStep } from '../hooks/useDailySessionReflectStep';
import { useOptimisticSessionEndMoodUpdate } from '../hooks/useOptimisticSessionEndMoodUpdate';

export function DailySessionReflectStepScreen() {
  const { optimisticDailySessionEndMoods, updateDailySessionEndMoods } =
    useOptimisticSessionEndMoodUpdate();

  const {
    isPendingCurrentSessionReflectionQuery,
    isPendingUpdateSessionReflectionQuery,
    goToNextStep,
  } = useDailySessionReflectStep();

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
          value={optimisticDailySessionEndMoods}
          setValue={updateDailySessionEndMoods}
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
          <ReflectionAddiotionalUserMessageInputCard />
        </AppCard>
      </View>
      <View className="mt-4">
        <AppButton
          title="Continue"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={goToNextStep}
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
      <AppLoadingModal
        visible={isPendingCurrentSessionReflectionQuery}
        message="Please wait fetching your reflection ..."
      />
      <AppLoadingModal
        visible={isPendingUpdateSessionReflectionQuery}
        message="Please wait updating your reflection ..."
      />
    </AppAuthenticatedLayout>
  );
}
