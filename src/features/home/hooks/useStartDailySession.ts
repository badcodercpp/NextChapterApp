import { useCallback, useState } from 'react';

import { ActiveDailySessionQuery } from '@/__generated__/graphql';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { selectActiveDailySession } from '@/state/selectors';
import { useActiveSessionStepNavigation } from '@/features/DailySession/hooks/useActiveSessionStepNavigation';
import { useHomeBootstrapQueries } from './useHomeBootstrapQueries';
import { useSelector } from 'react-redux';
import { useTabNavigation } from '@/navigation/Tab/hooks/useTabNavigation';
import { useUserAccess } from '@/hooks';

export const useStartDailySession = () => {
  const [dailySessionMetadataProcessing, setDailySessionMetadataProcessing] =
    useState<boolean>();

  const { triggerLazyActiveDailySessionQuery } = useHomeBootstrapQueries();

  const {
    data: activeDailySession,
    loading: activeDailySessionLoading,
    isError: activeDailySessionLoadingError,
  } = useSelector(selectActiveDailySession);

  const { canProceed } = useUserAccess();

  const { getNextStepScreenName } = useActiveSessionStepNavigation();

  const navigation = useTabNavigation();

  const startNewOrResumeCurrentDailySession = useCallback(async () => {
    try {
      if (!canProceed()) {
        return;
      }
      if (activeDailySessionLoading) {
        return;
      }
      const nextStepScreenName = getNextStepScreenName();

      setDailySessionMetadataProcessing(true);

      let localDailySessionData: ActiveDailySessionQuery['activeDailySession'] =
        activeDailySession ?? null;

      if (activeDailySessionLoadingError) {
        let localDailySessionApiResp =
          await triggerLazyActiveDailySessionQuery().unwrap();
        localDailySessionData = localDailySessionApiResp.activeDailySession;
      }

      console.log('localDailySessionData', localDailySessionData);

      if (!localDailySessionData) {
        //   await triggerAdvanceJourneyDayMutation().unwrap();
        //   await triggerStartDailySessionMutation().unwrap();
        //   await triggerLazyActiveDailySessionQuery().unwrap();
      }

      // session created or resumed successfully now can safely navigate

      navigation.navigate(TabRoutes.DailySessionTab, {
        screen: nextStepScreenName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDailySessionMetadataProcessing(false);
    }
  }, [
    activeDailySession,
    activeDailySessionLoading,
    activeDailySessionLoadingError,
    canProceed,
    getNextStepScreenName,
    navigation,
    triggerLazyActiveDailySessionQuery,
  ]);

  return {
    startNewOrResumeCurrentDailySession,
    dailySessionMetadataProcessing,
  };
};
