import { initiateLogout, initiateRefreshToken } from '@/state/thunkCreators';
import { selectAccessToken, selectRefreshToken } from '@/state/selectors';
import { setAuthStatus, setAuthTokens } from '@/state/slices/local';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import { isTokenExpired } from '@/utils/jwt';
import { useEffect } from 'react';

export const useAuthBootstrap = () => {
  const dispatch = useDispatch<AppDispatch>();

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

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
        await dispatch(initiateLogout()).unwrap();
        return;
      }

      try {
        // Refresh access token
        const response = await dispatch(
          initiateRefreshToken({
            input: {
              refreshToken,
            },
          }),
        ).unwrap();
        if (response) {
          dispatch(
            setAuthTokens({
              accessToken: response.accessToken,
              refreshToken: response.refreshToken ?? refreshToken,
              authStatus: 'authenticated',
            }),
          );

          dispatch(setAuthStatus('authenticated'));
        } else {
          throw new Error('Unauthorized');
        }
      } catch (error) {
        console.log('error', error);
        await dispatch(initiateLogout()).unwrap();
      }
    };

    // immediate bootestrap
    // bootstrap();

    // lazy bootstrap for testing
    setTimeout(() => {
      bootstrap();
    }, 5000);
  }, [accessToken, refreshToken, dispatch]);
};
