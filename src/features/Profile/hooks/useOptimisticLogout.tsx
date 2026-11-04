import {
  resetAuthStatus,
  resetAuthTokens,
} from '@/state/slices/local/authtoken';
import { useCallback, useOptimistic, useTransition } from 'react';
import {
  useLogoutAllMutation,
  useLogoutMutation,
} from '@/__generated__/graphql';

import { AppDispatch } from '@/state';
import { purgeAllStateCache } from '@/state/purgeState';
import { useDispatch } from 'react-redux';

export const useOptimisticLogout = () => {
  const [isPendingCurrentDeviceLogout, startTransitionCurrentDeviceLogout] =
    useTransition();
  const [isPendingAllDeviceLogout, startTransitionAllDeviceLogout] =
    useTransition();

  const [optimisticLogoutCurrentDevice, addOptimisticLogoutCurrentDevice] =
    useOptimistic<boolean, boolean>(
      false,
      (_currentLoggedOutState, newLoggedOutState) => newLoggedOutState,
    );

  const [optimisticLogoutAllDevices, addOptimisticLogoutAllDevices] =
    useOptimistic<boolean, boolean>(
      false,
      (_currentLoggedOutState, newLoggedOutState) => newLoggedOutState,
    );

  const dispatch = useDispatch<AppDispatch>();

  const [triggerLogoutAllMutation] = useLogoutAllMutation();
  const [triggerLogoutMutation] = useLogoutMutation();

  const logoutCurrentDevice = useCallback(() => {
    startTransitionCurrentDeviceLogout(async () => {
      addOptimisticLogoutCurrentDevice(true);

      try {
        triggerLogoutMutation();
        dispatch(resetAuthTokens());
        dispatch(resetAuthStatus());
        await purgeAllStateCache();
      } catch (error) {
        console.error('Logout failed', error);
      }
    });
  }, [addOptimisticLogoutCurrentDevice, dispatch, triggerLogoutMutation]);

  const logoutAllDevices = useCallback(() => {
    startTransitionAllDeviceLogout(async () => {
      addOptimisticLogoutAllDevices(true);

      try {
        triggerLogoutAllMutation();
        dispatch(resetAuthTokens());
        dispatch(resetAuthStatus());
        await purgeAllStateCache();
      } catch (error) {
        console.error('Logout All failed', error);
      }
    });
  }, [addOptimisticLogoutAllDevices, dispatch, triggerLogoutAllMutation]);

  return {
    logoutCurrentDevice,
    logoutAllDevices,
    isPendingCurrentDeviceLogout,
    isPendingAllDeviceLogout,
    optimisticLogoutCurrentDevice,
    optimisticLogoutAllDevices,
  };
};
