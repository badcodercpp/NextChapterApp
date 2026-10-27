import { selectAccessToken, selectRefreshToken } from '@/state/selectors';
import { setAuthStatus, setAuthTokens } from '@/state/slices/local/authtoken';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLazyActiveJourneyQuery,
  useLazyApplicationConfigQuery,
  useLazyMeQuery,
  useLazyMotivationalMessageQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} from '@/__generated__/graphql';

import { AppDispatch } from '@/state';
import { isTokenExpired } from '@/utils';

export const useAuthBootstrap = () => {
  const dispatch = useDispatch<AppDispatch>();

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const [bootstrapFinished, setBootstrapFinished] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const [triggerMeQuery] = useLazyMeQuery();
  const [triggerActiveJourneyQuery] = useLazyActiveJourneyQuery();
  const [triggerMotivationalMessageQuery] = useLazyMotivationalMessageQuery();
  const [triggerApplicationConfigQuery] = useLazyApplicationConfigQuery();

  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  const bootstrapAuth = useCallback(async (): Promise<boolean> => {
    // No access token
    if (!accessToken) {
      dispatch(setAuthStatus('unauthenticated'));
      return false;
    }

    // Access token is still valid
    if (!isTokenExpired(accessToken)) {
      dispatch(setAuthStatus('authenticated'));
      return true;
    }

    // Access token expired and no refresh token
    if (!refreshToken) {
      try {
        await logoutMutation().unwrap();
      } finally {
        dispatch(setAuthStatus('unauthenticated'));
      }

      return false;
    }

    // Access token expired -> refresh it
    try {
      const response = await refreshTokenMutation({
        input: {
          refreshToken,
        },
      }).unwrap();

      const newTokens = response?.refreshToken;

      if (!newTokens?.accessToken) {
        throw new Error('Unable to refresh authentication token');
      }

      dispatch(
        setAuthTokens({
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken ?? refreshToken,
          authStatus: 'authenticated',
        }),
      );

      return true;
    } catch (error) {
      console.error('Refresh token error:', error);

      try {
        await logoutMutation().unwrap();
      } finally {
        dispatch(setAuthStatus('unauthenticated'));
      }

      return false;
    }
  }, [
    accessToken,
    refreshToken,
    dispatch,
    refreshTokenMutation,
    logoutMutation,
  ]);

  const bootstrapApp = useCallback(async () => {
    const authenticated = await bootstrapAuth();

    if (!authenticated) {
      return;
    }

    // Independent APIs -> run in parallel
    await Promise.all([
      triggerApplicationConfigQuery().unwrap(),
      triggerMeQuery().unwrap(),
      triggerActiveJourneyQuery().unwrap(),
    ]);

    // Not required for Home to become usable
    // Let it load in the background.
    triggerMotivationalMessageQuery();
  }, [
    bootstrapAuth,
    triggerApplicationConfigQuery,
    triggerMeQuery,
    triggerActiveJourneyQuery,
    triggerMotivationalMessageQuery,
  ]);

  const handleBootstrap = useCallback(async () => {
    try {
      setIsBootstrapping(true);
      setBootstrapFinished(false);

      await bootstrapApp();

      setBootstrapFinished(true);
    } catch (error) {
      console.error('Application bootstrap failed:', error);
    } finally {
      setIsBootstrapping(false);
    }
  }, [bootstrapApp]);

  useEffect(() => {
    handleBootstrap();
  }, [handleBootstrap]);

  return {
    isBootstrapping,
    bootstrapFinished,
  };
};
