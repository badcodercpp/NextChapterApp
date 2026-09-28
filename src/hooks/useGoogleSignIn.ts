import {
  DeviceInfoInput,
  useGoogleLoginMutation,
  useGoogleRegisterMutation,
} from '@/__generated__/graphql';
import {
  GoogleSignin,
  SignInResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { showToast } from '@/components';
import { useCallback } from 'react';
import { useDeviceInfoSessionPayload } from './useDeviceInfoSessionPayload';

const useGoogleSignIn = () => {
  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();

  const [
    googleLogin,
    {
      isLoading: isGoogleLoginLoading,
      isError: isGoogleLoginError,
      error: googleLoginError,
    },
  ] = useGoogleLoginMutation();

  const [
    googleRegister,
    {
      isLoading: isGoogleRegisterLoading,
      isError: isGoogleRegisterError,
      error: googleRegisterError,
    },
  ] = useGoogleRegisterMutation();

  const doGoogleSignIn = useCallback(async () => {
    showToast('Starting google sign-in...', 'info');

    try {
      await GoogleSignin.hasPlayServices();

      const googleSignInResponse: SignInResponse = await GoogleSignin.signIn();

      const idToken = googleSignInResponse.data?.idToken;

      if (!idToken) {
        throw new Error('Wrong id token');
      }

      const deviceInfoSessionPayload: DeviceInfoInput =
        await getDeviceInfoSessionPayload();

      const googleUserDetails = await googleLogin({
        input: {
          idToken,
          ...deviceInfoSessionPayload,
        },
      }).unwrap();

      console.log('userInfo', googleSignInResponse, googleUserDetails);

      // Store auth tokens here if needed.
      //
      // dispatch(
      //   setAuthTokens({
      //     accessToken:
      //       googleUserDetails.googleLogin.accessToken,
      //     refreshToken:
      //       googleUserDetails.googleLogin.refreshToken,
      //     authStatus: 'authenticated',
      //   }),
      // );
    } catch (error) {
      console.log(error, 'google login error');

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            break;

          case statusCodes.IN_PROGRESS:
            break;

          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;

          default:
            console.log('Google login error:', error);
            break;
        }
      } else {
        console.log('Google login error:', error);
      }
    }
  }, [getDeviceInfoSessionPayload, googleLogin]);

  const doGoogleOnboard = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const googleSignInResponse: SignInResponse = await GoogleSignin.signIn();

      const idToken = googleSignInResponse.data?.idToken;

      if (!idToken) {
        throw new Error('Wrong id token');
      }

      const deviceInfoSessionPayload: DeviceInfoInput =
        await getDeviceInfoSessionPayload();

      const googleUserDetails = await googleRegister({
        input: {
          idToken,
          ...deviceInfoSessionPayload,
        },
      }).unwrap();

      console.log('userInfo', googleSignInResponse, googleUserDetails);

      // Store auth tokens here if needed.
      //
      // dispatch(
      //   setAuthTokens({
      //     accessToken:
      //       googleUserDetails.googleRegister.accessToken,
      //     refreshToken:
      //       googleUserDetails.googleRegister.refreshToken,
      //     authStatus: 'authenticated',
      //   }),
      // );
    } catch (error) {
      console.log(error, 'google register error');

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            break;

          case statusCodes.IN_PROGRESS:
            break;

          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;

          default:
            console.log('Google register error:', error);
            break;
        }
      } else {
        console.log('Google register error:', error);
      }
    }
  }, [getDeviceInfoSessionPayload, googleRegister]);

  const isLoading = isGoogleLoginLoading || isGoogleRegisterLoading;

  return {
    doGoogleSignIn,
    doGoogleOnboard,

    isLoading,

    isGoogleLoginLoading,
    isGoogleRegisterLoading,

    isGoogleLoginError,
    isGoogleRegisterError,

    googleLoginError,
    googleRegisterError,
  };
};

export default useGoogleSignIn;
