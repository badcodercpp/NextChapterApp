import {
  useLazyMyRecoveryQuery,
  useLazyRecoveryScoreTrendForLastNDaysQuery,
  useLazyTodayMissionQuery,
  useLazyTodayQuestionQuery,
} from '@/__generated__/graphql';

import { selectActiveJourney } from '@/state/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useHomeBootstrap = () => {
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const [triggerMyRecoveryQuery] = useLazyMyRecoveryQuery();
  const [triggerLazyRecoveryScoreTrendForLastNDaysQuery] =
    useLazyRecoveryScoreTrendForLastNDaysQuery();

  const [triggerTodayMissionQuery] = useLazyTodayMissionQuery();
  const [triggerLazyTodayQuestionQuery] = useLazyTodayQuestionQuery();

  useEffect(() => {
    triggerMyRecoveryQuery();
    triggerLazyTodayQuestionQuery();
    triggerLazyRecoveryScoreTrendForLastNDaysQuery({ days: 7 });
  }, [
    triggerMyRecoveryQuery,
    triggerLazyRecoveryScoreTrendForLastNDaysQuery,
    triggerLazyTodayQuestionQuery,
  ]);

  useEffect(() => {
    if (!activeJourney || !activeJourney?.id) {
      return;
    }
    triggerTodayMissionQuery({
      journeyId: activeJourney?.id,
      day: activeJourney?.currentDay ?? 1,
    });
  }, [activeJourney, triggerTodayMissionQuery]);
};
