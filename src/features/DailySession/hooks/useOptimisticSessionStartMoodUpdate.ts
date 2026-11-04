import {
  RecoveryReasonCurrentFeeling,
  useLazyActiveDailySessionQuery,
  useSetDailySessionStartMoodsMutation,
} from '@/__generated__/graphql';
import { useCallback, useOptimistic, useTransition } from 'react';

import { selectDailySessionStartMoods } from '@/state/selectors';
import { useSelector } from 'react-redux';

export const useOptimisticSessionStartMoodUpdate = () => {
  const [isPending, startTransition] = useTransition();

  const dailySessionStartMoods = useSelector(selectDailySessionStartMoods);

  const [triggerSetDailySessionStartMoodsMutation] =
    useSetDailySessionStartMoodsMutation();
  const [triggerLazyActiveDailySessionQuery] = useLazyActiveDailySessionQuery();

  const [
    optimisticDailySessionStartMoods,
    addOptimisticDailySessionStartMoods,
  ] = useOptimistic<
    Array<RecoveryReasonCurrentFeeling | undefined>,
    Array<RecoveryReasonCurrentFeeling | undefined>
  >(
    dailySessionStartMoods,
    (
      _currentMoods,
      newMoods: Array<RecoveryReasonCurrentFeeling | undefined>,
    ) => newMoods,
  );

  const updateDailySessionStartMoods = useCallback(
    (newMoods: Array<RecoveryReasonCurrentFeeling | undefined>) => {
      startTransition(async () => {
        addOptimisticDailySessionStartMoods(newMoods);
        try {
          await triggerSetDailySessionStartMoodsMutation({
            input: {
              moods: newMoods.filter(
                e => e,
              ) as Array<RecoveryReasonCurrentFeeling>,
            },
          }).unwrap();
          await triggerLazyActiveDailySessionQuery().unwrap();
        } catch (error) {
          console.log(error);
        }
      });
    },
    [
      addOptimisticDailySessionStartMoods,
      triggerLazyActiveDailySessionQuery,
      triggerSetDailySessionStartMoodsMutation,
    ],
  );

  return {
    isPending,
    optimisticDailySessionStartMoods,
    updateDailySessionStartMoods,
  };
};
