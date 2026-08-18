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
import { getLoginSliceSelector } from '@/state/selectors';
import { getPublicIpAddress } from '@/utils/ipAddress';
import { getUserAgent } from '@/utils/userAgent';
import { initiateLogin } from '@/state/thunkCreators';
import { setAuthTokens } from '@/state/slices/authtoken';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<MasterFormData>();
  const { pending, success } = useSelector(getLoginSliceSelector);
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
      await dispatch(initiateLogin(loginInput)).unwrap();
      dispatch(
        setAuthTokens({
          accessToken: success?.accessToken ?? '',
          refreshToken: success?.refreshToken ?? '',
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [success, dispatch, getValues, setLoading]);

  return {
    navigation,
    loading,
    setLoading,
    showPassword,
    setShowPassword,
    control,
    errors,
    pending,
    submitLogin,
  };
};
