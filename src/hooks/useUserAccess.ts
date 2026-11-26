import {
  selectCanAccessDailySession,
  selectIsFreeTrialExpiredUser,
  selectIsFreeTrialUser,
  selectIsPremiumUser,
} from '@/state/selectors';

import { showToast } from '@/components';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useUserAccess = () => {
  const canAccessDailySession = useSelector(selectCanAccessDailySession);
  const isFreeTrialUser = useSelector(selectIsFreeTrialUser);
  const isPremiumUser = useSelector(selectIsPremiumUser);
  const isFreeTrialExpiredUser = useSelector(selectIsFreeTrialExpiredUser);

  const canProceed = useCallback(() => {
    if (!canAccessDailySession) {
      if (isPremiumUser) {
        showToast(
          'Your premium plan expired please subscribe to premium plan to continue',
          'error',
        );
      } else if (isFreeTrialExpiredUser) {
        showToast(
          'Your free trial expired please subscribe to premium plan to continue',
          'error',
        );
      }
      return false;
    }
    return true;
  }, [canAccessDailySession, isFreeTrialExpiredUser, isPremiumUser]);

  return {
    canAccessDailySession,
    isFreeTrialUser,
    isPremiumUser,
    canProceed,
  };
};
