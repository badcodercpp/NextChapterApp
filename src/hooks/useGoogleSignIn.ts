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
import { useCallback, useState } from 'react';

import { AppDispatch } from '@/state';
import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { setAuthTokens } from '@/state/slices/local/authtoken';
import { showToast } from '@/components';
import { useDeviceInfoSessionPayload } from './useDeviceInfoSessionPayload';
import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const useGoogleSignIn = () => {
  const [isAuthCallStarted, setIsAuthCallStarted] = useState<boolean>(false);
  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();

  const navigation = useNavigation<LandingNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { getValues } = useFormContext<MasterFormData>();

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
    setIsAuthCallStarted(true);
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
      dispatch(
        setAuthTokens({
          accessToken: googleUserDetails.googleLogin.accessToken,
          refreshToken: googleUserDetails.googleLogin.refreshToken,
          authStatus: 'authenticated',
        }),
      );
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
    } finally {
      setIsAuthCallStarted(false);
    }
  }, [dispatch, getDeviceInfoSessionPayload, googleLogin]);

  const doGoogleOnboard = useCallback(async () => {
    try {
      setIsAuthCallStarted(true);
      await GoogleSignin.hasPlayServices();

      const googleSignInResponse: SignInResponse = await GoogleSignin.signIn();

      const idToken = googleSignInResponse.data?.idToken;

      if (!idToken) {
        throw new Error('Wrong id token');
      }

      const deviceInfoSessionPayload: DeviceInfoInput =
        await getDeviceInfoSessionPayload();

      const whatBringsYouHere = getValues('whatBringsYouHere');
      const howLongHasItBeen = getValues('howLongHasItBeen');
      const howAreYouFeeling = getValues('howAreYouFeeling');
      const whatWouldYouLikeHelpWith = getValues('whatWouldYouLikeHelpWith');

      const googleUserDetails = await googleRegister({
        input: {
          idToken,
          whatBringsYouHere,
          howLongHasItBeen,
          howAreYouFeeling,
          whatWouldYouLikeHelpWith,
          ...deviceInfoSessionPayload,
        },
      }).unwrap();

      console.log('userInfo', googleSignInResponse, googleUserDetails);

      navigation.navigate('RecoveryStartsToday', {
        accessToken: googleUserDetails?.googleRegister?.accessToken ?? '',
        refreshToken: googleUserDetails?.googleRegister?.refreshToken ?? '',
      });

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
    } finally {
      setIsAuthCallStarted(false);
    }
  }, [getDeviceInfoSessionPayload, getValues, googleRegister, navigation]);

  const isLoading =
    isAuthCallStarted || isGoogleLoginLoading || isGoogleRegisterLoading;

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
