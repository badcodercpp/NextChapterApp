import {
  AnswerStarterCard,
  HealingMessageCard,
  PrivateAnswerCard,
  SessionProgress,
  TodaysQuestionCardInSession,
} from '../components';
import {
  AppAuthenticatedLayout,
  AppButton,
  AppConfirmModal,
  AppLoadingModal,
} from '@/components';

import { ChevronRight } from 'lucide-react-native';
import { CardAccessBoundary } from '@/components/foundation/AppCard/CardAccess';
import React from 'react';
import { TodaysQuestionAnswerInputCard } from '@/features/CommonFeature';
import { View } from 'react-native';
import { useDailySessionQuestionStep } from '../hooks/useDailySessionQuestionStep';

export function DailySessionQuestionStepScreen() {
  const {
    showProceedModal,
    goToNextStep,
    openProceedModal,
    closeProceedModal,
    isPending,
  } = useDailySessionQuestionStep();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-5">
        <SessionProgress currentStep={'QUESTION'} />
      </View>
      <View className="mt-5">
        <TodaysQuestionCardInSession />
      </View>
      <View className="mt-4">
        <PrivateAnswerCard />
      </View>
      <View className="mt-4">
        <CardAccessBoundary>
          <TodaysQuestionAnswerInputCard
            variant="v2"
            inputClassName="min-h-[112px] px-3 pt-3 text-text-v2 leading-6"
            containerClassName="rounded-[24px] border-primary-v2/50 bg-selected-v2/40"
            endIconDisabled={isPending}
            onEndIconPress={goToNextStep}
          />
        </CardAccessBoundary>
      </View>
      <View className="mt-4">
        <AnswerStarterCard />
      </View>
      <View className="mt-4">
        <AppButton
          title="Next"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={openProceedModal}
          rightIcon={ChevronRight}
          loading={isPending}
          disabled={isPending}
        />
      </View>
      <View className="mt-4">
        <HealingMessageCard />
      </View>
      <AppConfirmModal
        visible={showProceedModal}
        title="Please answer today's question to proceed."
        message="Our recovery engine need your answer to all question to work better."
        confirmText="Ok"
        cancelText="Cancel"
        onCancel={closeProceedModal}
        onConfirm={() => {
          closeProceedModal();
          goToNextStep();
        }}
      />

      <AppLoadingModal
        visible={isPending}
        message="Please wait createing answer record ..."
      />
    </AppAuthenticatedLayout>
  );
}
