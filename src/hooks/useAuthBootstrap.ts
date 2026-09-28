import { selectAccessToken, selectRefreshToken } from '@/state/selectors';
import { setAuthStatus, setAuthTokens } from '@/state/slices/local/authtoken';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLogoutMutation,
  useRefreshTokenMutation,
} from '@/__generated__/graphql';

import { AppDispatch } from '@/state';
import { isTokenExpired } from '@/utils';
import { useEffect } from 'react';

export const useAuthBootstrap = () => {
  const dispatch = useDispatch<AppDispatch>();

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    const bootstrap = async () => {
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
    };

    const timer = setTimeout(() => {
      bootstrap();
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    accessToken,
    refreshToken,
    dispatch,
    refreshTokenMutation,
    logoutMutation,
  ]);
};
