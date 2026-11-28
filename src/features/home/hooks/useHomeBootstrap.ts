import { useCallback, useEffect, useState } from 'react';

import { useHomeBootstrapQueries } from './useHomeBootstrapQueries';
import { useUserAccess } from '@/hooks';

export const useHomeBootstrap = () => {
  const [bootstrapFinished, setBootstrapFinished] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const { canProceed } = useUserAccess();

  const {
    triggerMyRecoveryQuery,
    triggerLazyGetRecoveryScoreTrendForLastNDayQuery,
    triggerTodayMissionQuery,
    triggerCompletedMissionHistoryQuery,
    triggerLazyTodayQuestionQuery,
    triggerLazyActiveDailySessionQuery,
    triggerAdvanceJourneyDayMutation,
    triggerStartDailySessionMutation,
  } = useHomeBootstrapQueries();

  const bootstrapHome = useCallback(async () => {
    try {
      setIsBootstrapping(true);
      setBootstrapFinished(false);
      try {
        if (canProceed()) {
          await triggerAdvanceJourneyDayMutation().unwrap();
          await triggerStartDailySessionMutation().unwrap();
        }

        await triggerLazyActiveDailySessionQuery().unwrap();
      } catch (error) {
        console.log(error);
      }

      // recovery score
      triggerLazyGetRecoveryScoreTrendForLastNDayQuery({ days: 7 }).unwrap();
      triggerMyRecoveryQuery().unwrap();

      // daily session details

      if (canProceed()) {
        triggerLazyTodayQuestionQuery().unwrap();
        triggerTodayMissionQuery().unwrap();
      }

      triggerCompletedMissionHistoryQuery().unwrap();
      setBootstrapFinished(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBootstrapping(false);
    }
  }, [
    canProceed,
    triggerAdvanceJourneyDayMutation,
    triggerCompletedMissionHistoryQuery,
    triggerLazyActiveDailySessionQuery,
    triggerLazyGetRecoveryScoreTrendForLastNDayQuery,
    triggerLazyTodayQuestionQuery,
    triggerMyRecoveryQuery,
    triggerStartDailySessionMutation,
    triggerTodayMissionQuery,
  ]);

  // recovery score
  useEffect(() => {
    bootstrapHome();
  }, [bootstrapHome]);

  return {
    bootstrapFinished,
    isBootstrapping,
  };
};
