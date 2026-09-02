import { DeviceInfoInput, LoginInput } from '@/__generated__/graphql';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { RootNavigationProp } from '@/navigation/RootStack/types';
import { RootRoutes } from '@/navigation/RootStack/RootRoutes';
import { initiateLogin } from '@/state/thunkCreators';
import { loginSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { selectLoginPending } from '@/state/selectors';
import { setAuthTokens } from '@/state/slices/local/authtoken';
import { setReduxGraphqlAuthTokens } from 'redux-graphql-native';
import { useDeviceInfoSessionPayload } from '@/hooks/useDeviceInfoSessionPayload';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  const rootNavigation = useNavigation<RootNavigationProp>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();
  const loginPending = useSelector(selectLoginPending);
  const dispatch = useDispatch<AppDispatch>();

  console.log('form errors', errors);

  const submitLogin = useCallback(async () => {
    const email = getValues('login.email');
    const password = getValues('login.password');
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'login', // Pass your master context namespace here
      });
      return;
    }
    setLoading(true);
    try {
      // const platform: DevicePlatform =
      //   Platform.OS.toUpperCase() as DevicePlatform;
      // const deviceType: DeviceType = (
      //   await DeviceInfo.getDeviceType()
      // ).toUpperCase() as DeviceType;
      // const deviceName = await DeviceInfo.getDeviceName();
      // const deviceId = await DeviceInfo.getUniqueId();
      // const appVersion = DeviceInfo.getVersion();
      // const userAgent = await getUserAgent();
      // const ipAddress = await getPublicIpAddress();
      const deviceInfoSessionPayload: DeviceInfoInput =
        await getDeviceInfoSessionPayload();

      const loginInput: LoginInput = {
        email,
        password,
        ...deviceInfoSessionPayload,
      };
      const loginSuccess = await dispatch(
        initiateLogin({
          input: loginInput,
        }),
      ).unwrap();
      console.log('loginSuccess', loginSuccess);
      dispatch(
        setReduxGraphqlAuthTokens({
          accessToken: loginSuccess?.accessToken ?? '',
          refreshToken: loginSuccess?.refreshToken ?? '',
        }),
      );
      dispatch(
        setAuthTokens({
          accessToken: loginSuccess?.accessToken ?? '',
          refreshToken: loginSuccess?.refreshToken ?? '',
          authStatus: 'authenticated',
        }),
      );
      console.log('navigating to', loginSuccess);
      rootNavigation?.reset({
        index: 0,
        routes: [
          {
            name: RootRoutes.Main,
          },
        ],
      });
    } catch (error) {
      console.log(error, 'hi error');
    } finally {
      setLoading(false);
    }
  }, [
    dispatch,
    getValues,
    setLoading,
    rootNavigation,
    clearErrors,
    setError,
    getDeviceInfoSessionPayload,
  ]);

  return {
    navigation,
    loading,
    setLoading,
    showPassword,
    setShowPassword,
    control,
    errors,
    loginPending,
    submitLogin,
    clearErrors,
  };
};
