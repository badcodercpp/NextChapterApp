import {
  useAdvanceJourneyDayMutation,
  useLazyActiveDailySessionQuery,
  useLazyCompletedMissionHistoryQuery,
  useLazyGetRecoveryScoreTrendForLastNDayQuery,
  useLazyMyRecoveryQuery,
  useLazyTodayMissionQuery,
  useLazyTodayQuestionQuery,
  useStartDailySessionMutation,
} from '@/__generated__/graphql';

export const useHomeBootstrapQueries = () => {
  const [triggerMyRecoveryQuery] = useLazyMyRecoveryQuery();
  const [triggerLazyGetRecoveryScoreTrendForLastNDayQuery] =
    useLazyGetRecoveryScoreTrendForLastNDayQuery();

  const [triggerTodayMissionQuery] = useLazyTodayMissionQuery();
  const [triggerCompletedMissionHistoryQuery] =
    useLazyCompletedMissionHistoryQuery();
  const [triggerLazyTodayQuestionQuery] = useLazyTodayQuestionQuery();

  const [triggerLazyActiveDailySessionQuery] = useLazyActiveDailySessionQuery();
  const [triggerAdvanceJourneyDayMutation] = useAdvanceJourneyDayMutation();
  const [triggerStartDailySessionMutation] = useStartDailySessionMutation();

  return {
    triggerMyRecoveryQuery,
    triggerLazyGetRecoveryScoreTrendForLastNDayQuery,
    triggerTodayMissionQuery,
    triggerCompletedMissionHistoryQuery,
    triggerLazyTodayQuestionQuery,
    triggerLazyActiveDailySessionQuery,
    triggerAdvanceJourneyDayMutation,
    triggerStartDailySessionMutation,
  };
};
