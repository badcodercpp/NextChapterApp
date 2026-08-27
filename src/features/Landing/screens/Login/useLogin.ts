import {
  DevicePlatform,
  DeviceType,
  LoginInput,
} from '@/__generated__/graphql';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import DeviceInfo from 'react-native-device-info';
import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { Platform } from 'react-native';
import { RootNavigationProp } from '@/navigation/RootStack/types';
import { RootRoutes } from '@/navigation/RootStack/RootRoutes';
import { getPublicIpAddress } from '@/utils/ipAddress';
import { getUserAgent } from '@/utils/userAgent';
import { initiateLogin } from '@/state/thunkCreators';
import { selectLoginPending } from '@/state/selectors';
import { setAuthTokens } from '@/state/slices/local/authtoken';
import { setReduxGraphqlAuthTokens } from 'redux-graphql-native';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  const rootNavigation = useNavigation<RootNavigationProp>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<MasterFormData>();
  const loginPending = useSelector(selectLoginPending);
  const dispatch = useDispatch<AppDispatch>();

  const submitLogin = useCallback(async () => {
    setLoading(true);
    try {
      const email = getValues('login.email');
      const password = getValues('login.password');
      const platform: DevicePlatform =
        Platform.OS.toUpperCase() as DevicePlatform;
      const deviceType: DeviceType = (
        await DeviceInfo.getDeviceType()
      ).toUpperCase() as DeviceType;
      const deviceName = await DeviceInfo.getDeviceName();
      const deviceId = await DeviceInfo.getUniqueId();
      const appVersion = DeviceInfo.getVersion();
      const userAgent = await getUserAgent();
      const ipAddress = await getPublicIpAddress();

      const loginInput: LoginInput = {
        email,
        password,
        platform,
        deviceType,
        deviceName,
        deviceId,
        appVersion,
        userAgent,
        ipAddress,
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
  }, [dispatch, getValues, setLoading, rootNavigation]);

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
  };
};
