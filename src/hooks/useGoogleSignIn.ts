import {
  GoogleSignin,
  SignInResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  initiateGoogleLogin,
  initiateGoogleRegister,
} from '@/state/thunkCreators';

import { AppDispatch } from '../state/state';
import { DeviceInfoInput } from '@/__generated__/graphql';
import { showToast } from '@/components';
import { useCallback } from 'react';
import { useDeviceInfoSessionPayload } from './useDeviceInfoSessionPayload';
import { useDispatch } from 'react-redux';

const useGoogleSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();

  const doGoogleSignIn = useCallback(async () => {
    showToast('Starting google sign-in...', 'info');
    try {
      await GoogleSignin.hasPlayServices();
      const googleSignInResponse: SignInResponse = await GoogleSignin.signIn();

      if (googleSignInResponse.data?.idToken) {
        const deviceInfoSessionPayload: DeviceInfoInput =
          await getDeviceInfoSessionPayload();
        const googleUserDetails = await dispatch(
          initiateGoogleLogin({
            input: {
              idToken: googleSignInResponse.data.idToken,
              ...deviceInfoSessionPayload,
            },
          }),
        ).unwrap();
        console.log('userInfo', googleSignInResponse, googleUserDetails);
      } else {
        throw new Error('wrong id token');
      }

      //setState({ userInfo, error: undefined });
    } catch (error) {
      console.log(error, 'google error');
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  }, [dispatch, getDeviceInfoSessionPayload]);

  const doGoogleOnboard = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleSignInResponse: SignInResponse = await GoogleSignin.signIn();
      if (googleSignInResponse.data?.idToken) {
        const deviceInfoSessionPayload: DeviceInfoInput =
          await getDeviceInfoSessionPayload();
        const googleUserDetails = await dispatch(
          initiateGoogleRegister({
            input: {
              idToken: googleSignInResponse.data?.idToken,
              ...deviceInfoSessionPayload,
            },
          }),
        ).unwrap();
        console.log('userInfo', googleSignInResponse, googleUserDetails);
      } else {
        throw new Error('wrong id token');
      }

      //setState({ userInfo, error: undefined });
    } catch (error) {
      console.log(error, 'google error');
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  }, [dispatch, getDeviceInfoSessionPayload]);

  return {
    doGoogleSignIn,
    doGoogleOnboard,
  };
};

export default useGoogleSignIn;
