import {
  DailySessionStep,
  useLazyActiveDailySessionQuery,
  useLazyTodayQuestionQuery,
  useUpdateDailySessionStepMutation,
} from '@/__generated__/graphql';
import { useCallback, useOptimistic, useTransition } from 'react';

import { selectDailySessionCurrentStep } from '@/state/selectors';
import { useSelector } from 'react-redux';

export const useOptimisticSessionStepUpdate = () => {
  const [isPending, startTransition] = useTransition();

  const dailySessionStartMoods = useSelector(selectDailySessionCurrentStep);

  const [triggerUpdateDailySessionStepMutation] =
    useUpdateDailySessionStepMutation();
  const [triggerLazyActiveDailySessionQuery] = useLazyActiveDailySessionQuery();
  const [triggerLazyTodayQuestionQuery] = useLazyTodayQuestionQuery();

  const [optimisticDailySessionStep, addOptimisticDailySessionStep] =
    useOptimistic<DailySessionStep | undefined, DailySessionStep | undefined>(
      dailySessionStartMoods,
      (
        _currentStep: DailySessionStep | undefined,
        nextStep: DailySessionStep | undefined,
      ) => nextStep,
    );

  const updateDailySessionStep = useCallback(
    (nextStep: DailySessionStep | undefined) => {
      startTransition(async () => {
        addOptimisticDailySessionStep(nextStep);
        try {
          if (nextStep) {
            await triggerUpdateDailySessionStepMutation({
              input: {
                step: nextStep,
              },
            }).unwrap();
            triggerLazyTodayQuestionQuery().unwrap();
            await triggerLazyActiveDailySessionQuery().unwrap();
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    [
      addOptimisticDailySessionStep,
      triggerLazyActiveDailySessionQuery,
      triggerLazyTodayQuestionQuery,
      triggerUpdateDailySessionStepMutation,
    ],
  );

  return {
    isPending,
    optimisticDailySessionStep,
    updateDailySessionStep,
  };
};
