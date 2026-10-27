import { useCallback, useEffect, useState } from 'react';

import { useHomeBootstrapQueries } from './useHomeBootstrapQueries';

export const useHomeBootstrap = () => {
  const [bootstrapFinished, setBootstrapFinished] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

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
        await triggerAdvanceJourneyDayMutation().unwrap();
        await triggerStartDailySessionMutation().unwrap();
        await triggerLazyActiveDailySessionQuery().unwrap();
      } catch (error) {
        console.log(error);
      }

      // recovery score
      triggerMyRecoveryQuery();
      triggerLazyGetRecoveryScoreTrendForLastNDayQuery({ days: 7 });

      // daily session details

      triggerLazyTodayQuestionQuery();
      triggerTodayMissionQuery();
      triggerCompletedMissionHistoryQuery();
      setBootstrapFinished(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBootstrapping(false);
    }
  }, [
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
