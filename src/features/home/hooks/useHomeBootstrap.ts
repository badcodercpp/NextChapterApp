import {
  useLazyCompletedMissionHistoryQuery,
  useLazyGetRecoveryScoreTrendForLastNDayQuery,
  useLazyMyRecoveryQuery,
  useLazyTodayMissionQuery,
  useLazyTodayQuestionQuery,
} from '@/__generated__/graphql';

import { useEffect } from 'react';

export const useHomeBootstrap = () => {
  const [triggerMyRecoveryQuery] = useLazyMyRecoveryQuery();
  const [triggerLazyGetRecoveryScoreTrendForLastNDayQuery] =
    useLazyGetRecoveryScoreTrendForLastNDayQuery();

  const [triggerTodayMissionQuery] = useLazyTodayMissionQuery();
  const [triggerCompletedMissionHistoryQuery] =
    useLazyCompletedMissionHistoryQuery();
  const [triggerLazyTodayQuestionQuery] = useLazyTodayQuestionQuery();

  useEffect(() => {
    triggerMyRecoveryQuery();
    triggerLazyTodayQuestionQuery();
    triggerLazyGetRecoveryScoreTrendForLastNDayQuery({ days: 7 });
  }, [
    triggerMyRecoveryQuery,
    triggerLazyGetRecoveryScoreTrendForLastNDayQuery,
    triggerLazyTodayQuestionQuery,
  ]);

  useEffect(() => {
    triggerTodayMissionQuery();
    triggerCompletedMissionHistoryQuery();
  }, [triggerTodayMissionQuery, triggerCompletedMissionHistoryQuery]);
};
