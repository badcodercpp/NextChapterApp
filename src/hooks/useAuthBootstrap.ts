import { selectAccessToken, selectRefreshToken } from '@/state/selectors';
import { setAuthStatus, setAuthTokens } from '@/state/slices/local/authtoken';
import { useCallback, useEffect, useState, useTransition } from 'react';
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
  const [bootstrapFinished, setBootstrapFinished] = useState<boolean>(false);
  const [isBootstrapPending, startTransition] = useTransition();

  const [triggerMeQuery] = useLazyMeQuery();
  const [triggerActiveJourneyQuery] = useLazyActiveJourneyQuery();
  const [triggerMotivationalMessageQuery] = useLazyMotivationalMessageQuery();
  const [triggerApplicationConfigQuery] = useLazyApplicationConfigQuery();

  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  const dispatch = useDispatch<AppDispatch>();

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const bootstrapAuth = useCallback(async () => {
    // No access token
    if (!accessToken) {
      dispatch(setAuthStatus('unauthenticated'));
      return;
    }

    // Access token is still valid
    if (!isTokenExpired(accessToken)) {
      dispatch(setAuthStatus('authenticated'));
      return;
    }

    // Access token expired and no refresh token
    if (!refreshToken) {
      await logoutMutation().unwrap();
      dispatch(setAuthStatus('unauthenticated'));
      return;
    }

    try {
      const response = await refreshTokenMutation({
        input: {
          refreshToken,
        },
      }).unwrap();

      if (!response?.refreshToken) {
        throw new Error('Unauthorized');
      }

      dispatch(
        setAuthTokens({
          accessToken: response.refreshToken.accessToken,
          refreshToken: response.refreshToken.refreshToken ?? refreshToken,
          authStatus: 'authenticated',
        }),
      );
    } catch (error) {
      console.log('Refresh token error:', error);

      try {
        await logoutMutation().unwrap();
      } finally {
        dispatch(setAuthStatus('unauthenticated'));
      }
    }
  }, [
    accessToken,
    dispatch,
    logoutMutation,
    refreshToken,
    refreshTokenMutation,
  ]);

  const handleStartSetup = useCallback(() => {
    startTransition(async () => {
      // 2. Instantly update the UI to true

      try {
        // 3. Perform the actual background work
        await bootstrapAuth();

        // call rest of bootstrap setup api here

        if (accessToken && !isTokenExpired(accessToken)) {
          triggerMotivationalMessageQuery();

          await triggerApplicationConfigQuery();
          await triggerMeQuery().unwrap();
          await triggerActiveJourneyQuery().unwrap();
        }

        // 4. Update the final source of truth when successful
        setBootstrapFinished(true);
      } catch (error) {
        console.error('Bootstrap failed', error);
        // If an error happens, React automatically rolls
        // optimisticBootstrapFinished back to false
      }
    });
  }, [
    triggerApplicationConfigQuery,
    triggerMotivationalMessageQuery,
    bootstrapAuth,
    accessToken,
    triggerMeQuery,
    triggerActiveJourneyQuery,
  ]);

  useEffect(() => {
    handleStartSetup();
  }, [handleStartSetup]);

  return {
    isBootstrapPending,
    bootstrapFinished,
  };
};
