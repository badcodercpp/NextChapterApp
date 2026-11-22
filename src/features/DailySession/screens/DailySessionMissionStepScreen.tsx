import {
  AppAuthenticatedLayout,
  AppButton,
  AppConfirmModal,
  AppLoadingModal,
} from '@/components';
import {
  MissionOverviewCard,
  MissionProgressCard,
  MissionStepsCard,
  SessionProgress,
} from '../components';

import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { TodaysMissionCard } from '@/features/CommonFeature';
import { View } from 'react-native';
import { useDailySessionMissionStep } from '../hooks/useDailySessionMissionStep';
import { useMissionMetadata } from '@/features/CommonFeature/hooks/useMissionMetadata';

export function DailySessionMissionStepScreen() {
  const {
    isStartTodaysMissionPending,
    isCompleteTodaysMissionPending,
    showProceedModal,
    openProceedModal,
    closeProceedModal,
    startTodaysMission,
    completeTodaysMission,
    goToNextStep,
  } = useDailySessionMissionStep();

  const { isMissionStarted, isMissionCompleted } = useMissionMetadata();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-5">
        <SessionProgress currentStep={'MISSION'} />
      </View>
      <View className="mt-5">
        <TodaysMissionCard showProgress={false} />
      </View>
      <View className="mt-4">
        <MissionProgressCard />
      </View>
      <View className="mt-4">
        <MissionOverviewCard />
      </View>
      <View className="mt-4">
        <MissionStepsCard />
      </View>
      <View className="mt-4">
        {!isMissionStarted && !isMissionCompleted && (
          <AppButton
            title="Start Mission"
            size="lg"
            fullWidth
            className="mb-0"
            onPress={startTodaysMission}
            rightIcon={ChevronRight}
            disabled={isStartTodaysMissionPending}
            loading={isStartTodaysMissionPending}
          />
        )}
        {isMissionStarted && (
          <AppButton
            title="Complete Mission"
            size="lg"
            fullWidth
            className="mb-0"
            onPress={openProceedModal}
            rightIcon={ChevronRight}
            disabled={isCompleteTodaysMissionPending}
            loading={isCompleteTodaysMissionPending}
          />
        )}
        {isMissionCompleted && (
          <AppButton
            title="Continue"
            size="lg"
            fullWidth
            className="mb-0"
            onPress={goToNextStep}
            rightIcon={ChevronRight}
          />
        )}
      </View>

      <AppConfirmModal
        visible={showProceedModal}
        title="Stay True to Yourself"
        message="Hard times can make you question who you are. Keep holding on to your values, your identity, and the person you want to become. Even when life feels heavy, don't lose yourself trying to survive it."
        confirmText="Continue"
        cancelText="Stay here"
        onCancel={closeProceedModal}
        onConfirm={() => {
          closeProceedModal();
          completeTodaysMission();
        }}
      />
      <AppLoadingModal
        visible={isStartTodaysMissionPending}
        message="Please wait starting your mission ..."
      />
      <AppLoadingModal
        visible={isCompleteTodaysMissionPending}
        message="Please wait completing your mission ..."
      />
    </AppAuthenticatedLayout>
  );
}
