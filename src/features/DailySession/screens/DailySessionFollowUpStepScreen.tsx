import {
  AppAuthenticatedLayout,
  AppButton,
  AppConfirmModal,
  AppIcon,
  AppLoadingModal,
  AppText,
} from '@/components';
import { ChevronRight, LockKeyhole, Summary } from 'lucide-react-native';
import {
  FollowUpChats,
  FollowUpProgressCard,
  QuickFollowupReplyCard,
  SessionProgress,
} from '../components';

import React from 'react';
import { CardAccessBoundary } from '@/components/foundation/AppCard/CardAccess';
import { TodaysFollowUpInputCard } from '@/features/CommonFeature';
import { View } from 'react-native';
import { useDailySessionFollowUpStep } from '../hooks/useDailySessionFollowUpStep';

export function DailySessionFollowUpStepScreen() {
  const {
    isPending,
    showProceedModal,
    goToNextStep,
    openProceedModal,
    closeProceedModal,
    createFollowupRecord,
    createQuickReplyFollowupRecord,
    showSummaryModal,
    closeSummaryModal,
    lastAssistantConversation,
  } = useDailySessionFollowUpStep();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-5">
        <SessionProgress currentStep={'FOLLOW_UPS'} />
      </View>
      <View className="mt-5">
        <FollowUpChats />
      </View>
      <View className="mt-4">
        <QuickFollowupReplyCard
          createQuickReplyFollowupRecord={createQuickReplyFollowupRecord}
        />
      </View>
      <View className="mt-4">
        <CardAccessBoundary>
          <TodaysFollowUpInputCard
            endIconDisabled={isPending}
            onEndIconPress={createFollowupRecord}
          />
        </CardAccessBoundary>
        <View className="mt-3 flex-row items-center justify-center px-3">
          <AppIcon
            icon={LockKeyhole}
            size={16}
            className="mr-2 text-text-muted-v2"
          />
          <AppText
            variant="xs"
            className="shrink text-center text-text-muted-v2"
          >
            Only you and your AI coach can see this.
          </AppText>
        </View>
      </View>
      <View className="mt-4">
        <FollowUpProgressCard total={5} />
      </View>
      <View className="mt-4">
        <AppButton
          title="Next"
          size="lg"
          fullWidth
          className="mb-0"
          onPress={openProceedModal}
          rightIcon={ChevronRight}
          disabled={isPending}
        />
      </View>
      <AppConfirmModal
        visible={showProceedModal}
        title="Please complete 5 followup!!"
        message="We need you to answer 5 followup questions, it will help you to let go of pain."
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
        message="Please wait createing followup record ..."
      />
      <AppConfirmModal
        visible={showSummaryModal}
        title="Take a moment to red summry of followups!!"
        message={lastAssistantConversation?.summary ?? ''}
        confirmText="Proceed"
        cancelText="Cancel"
        onCancel={closeSummaryModal}
        icon={Summary}
        onConfirm={() => {
          closeSummaryModal();
          goToNextStep();
        }}
      />
    </AppAuthenticatedLayout>
  );
}
