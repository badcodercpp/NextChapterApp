import {
  RecoveryReasonCurrentFeeling,
  useLazyActiveDailySessionQuery,
  useSetDailySessionEndMoodsMutation,
} from '@/__generated__/graphql';
import { useCallback, useOptimistic, useTransition } from 'react';

import { selectDailySessionEndMoods } from '@/state/selectors';
import { useSelector } from 'react-redux';

export const useOptimisticSessionEndMoodUpdate = () => {
  const [isPending, startTransition] = useTransition();

  const dailySessionEndMoods = useSelector(selectDailySessionEndMoods);

  const [triggerSetDailySessionEndMoodsMutation] =
    useSetDailySessionEndMoodsMutation();
  const [triggerLazyActiveDailySessionQuery] = useLazyActiveDailySessionQuery();

  const [optimisticDailySessionEndMoods, addOptimisticDailySessionEndMoods] =
    useOptimistic<
      Array<RecoveryReasonCurrentFeeling | undefined>,
      Array<RecoveryReasonCurrentFeeling | undefined>
    >(
      dailySessionEndMoods,
      (
        _currentMoods,
        newMoods: Array<RecoveryReasonCurrentFeeling | undefined>,
      ) => newMoods,
    );

  const updateDailySessionEndMoods = useCallback(
    (newMoods: Array<RecoveryReasonCurrentFeeling | undefined>) => {
      startTransition(async () => {
        addOptimisticDailySessionEndMoods(newMoods);
        try {
          await triggerSetDailySessionEndMoodsMutation({
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
      addOptimisticDailySessionEndMoods,
      triggerLazyActiveDailySessionQuery,
      triggerSetDailySessionEndMoodsMutation,
    ],
  );

  return {
    isPending,
    optimisticDailySessionEndMoods,
    updateDailySessionEndMoods,
  };
};
