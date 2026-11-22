import {
  DailySessionStep,
  useCompleteMissionMutation,
  useLazyActiveDailySessionQuery,
  useLazyTodayMissionQuery,
  useStartMissionMutation,
} from '@/__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { getApiErrorMessage } from '@/utils';
import { showToast } from '@/components';
import { useOptimisticSessionStepUpdate } from './useOptimisticSessionStepUpdate';

export const useDailySessionMissionStep = () => {
  const [isStartTodaysMissionPending, setIsStartTodaysMissionPending] =
    useState<boolean>(false);
  const [isCompleteTodaysMissionPending, setIsCompleteTodaysMissionPending] =
    useState<boolean>(false);
  const [showProceedModal, setShowProceedModal] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();

  const { updateDailySessionStep } = useOptimisticSessionStepUpdate();
  const [triggerStartMissionMutation] = useStartMissionMutation();
  const [triggerCompleteMissionMutation] = useCompleteMissionMutation();
  const [triggerLazyTodayMissionQuery] = useLazyTodayMissionQuery();
  const [triggerLazyActiveDailySessionQuery] = useLazyActiveDailySessionQuery();

  const openProceedModal = useCallback(() => {
    setShowProceedModal(true);
  }, [setShowProceedModal]);

  const closeProceedModal = useCallback(() => {
    setShowProceedModal(false);
  }, [setShowProceedModal]);

  const startTodaysMission = useCallback(async () => {
    try {
      setIsStartTodaysMissionPending(true);
      await triggerStartMissionMutation().unwrap();
      await triggerLazyTodayMissionQuery().unwrap();
      triggerLazyActiveDailySessionQuery();
    } catch (error) {
      console.log('error', error);
      showToast('Something went wrong, Please try again later', 'error');
    } finally {
      setIsStartTodaysMissionPending(false);
    }
  }, [
    triggerStartMissionMutation,
    triggerLazyTodayMissionQuery,
    triggerLazyActiveDailySessionQuery,
  ]);

  const completeTodaysMission = useCallback(async () => {
    setIsCompleteTodaysMissionPending(true);

    try {
      await triggerCompleteMissionMutation().unwrap();

      await triggerLazyTodayMissionQuery().unwrap();
      triggerLazyActiveDailySessionQuery();
    } catch (error) {
      console.log('Mission completion failed:', error);
      showToast(getApiErrorMessage(error), 'error');
    } finally {
      setIsCompleteTodaysMissionPending(false);
    }
  }, [
    triggerCompleteMissionMutation,
    triggerLazyTodayMissionQuery,
    triggerLazyActiveDailySessionQuery,
  ]);

  const goToNextStep = useCallback(async () => {
    try {
      updateDailySessionStep(DailySessionStep.Reflection);
      navigation.navigate('DailySessionFollowUpStep');
    } catch (error) {
      console.log('error', error);
      showToast('Something went wrong, Please try again later', 'error');
    }
  }, [navigation, updateDailySessionStep]);

  return {
    isStartTodaysMissionPending,
    isCompleteTodaysMissionPending,
    showProceedModal,
    openProceedModal,
    closeProceedModal,
    startTodaysMission,
    completeTodaysMission,
    goToNextStep,
  };
};
