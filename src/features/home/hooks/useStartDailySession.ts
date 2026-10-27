import { useCallback, useState } from 'react';

import { ActiveDailySessionQuery } from '@/__generated__/graphql';
import { DailySessionRoutes } from '@/features/DailySession/navigation';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { selectActiveDailySession } from '@/state/selectors';
import { useHomeBootstrapQueries } from './useHomeBootstrapQueries';
import { useSelector } from 'react-redux';
import { useTabNavigation } from '@/navigation/Tab/hooks/useTabNavigation';

export const useStartDailySession = () => {
  const [dailySessionMetadataProcessing, setDailySessionMetadataProcessing] =
    useState<boolean>();

  const { triggerLazyActiveDailySessionQuery } = useHomeBootstrapQueries();

  const {
    data: activeDailySession,
    loading: activeDailySessionLoading,
    isError: activeDailySessionLoadingError,
  } = useSelector(selectActiveDailySession);

  const navigation = useTabNavigation();

  const startNewOrResumeCurrentDailySession = useCallback(async () => {
    try {
      if (activeDailySessionLoading) {
        return;
      }

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
        screen: DailySessionRoutes.DailySessionLanding,
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
    navigation,
    triggerLazyActiveDailySessionQuery,
  ]);

  return {
    startNewOrResumeCurrentDailySession,
    dailySessionMetadataProcessing,
  };
};
