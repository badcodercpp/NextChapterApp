import {
  DailySessionStep,
  useLazyActiveDailySessionQuery,
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
      triggerUpdateDailySessionStepMutation,
    ],
  );

  return {
    isPending,
    optimisticDailySessionStep,
    updateDailySessionStep,
  };
};
