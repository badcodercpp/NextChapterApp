import { NavigationProp, useNavigation } from '@react-navigation/native';

import { DailySessionStackParamList } from '@/features/DailySession/navigation';
import { DailySessionStep } from '@/__generated__/graphql';
import { selectDailySessionCurrentStep } from '@/state/selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useActiveSessionStepNavigation = () => {
  const navigation =
    useNavigation<NavigationProp<DailySessionStackParamList>>();
  const dailySessionCurrentStep = useSelector(selectDailySessionCurrentStep);

  const getNextStepScreenName =
    useCallback((): keyof DailySessionStackParamList => {
      switch (dailySessionCurrentStep) {
        case DailySessionStep.Question:
          return 'DailySessionQuestionStep';
        case DailySessionStep.FollowUp:
          return 'DailySessionFollowUpStep';
        case DailySessionStep.Mission:
          return 'DailySessionMissionStep';
        case DailySessionStep.Reflection:
          return 'DailySessionReflectStep';
        case DailySessionStep.Completed:
          return 'DailySessionCompleteStep';
        default:
          return 'DailySessionLanding';
      }
    }, [dailySessionCurrentStep]);

  const navigateToNextStep = useCallback(() => {
    navigation.navigate(getNextStepScreenName());
  }, [getNextStepScreenName, navigation]);

  return {
    navigateToNextStep,
    getNextStepScreenName,
  };
};
