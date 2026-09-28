import {
  DeviceInfoInput,
  LoginInput,
  useLoginMutation,
} from '@/__generated__/graphql';
import { useCallback, useState } from 'react';

import { AppDispatch } from '@/state';
import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { RootNavigationProp } from '@/navigation/RootStack/types';
import { RootRoutes } from '@/navigation/RootStack/RootRoutes';
import { loginSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { setAuthTokens } from '@/state/slices/local/authtoken';
import { useDeviceInfoSessionPayload } from '@/hooks/useDeviceInfoSessionPayload';
import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  const rootNavigation = useNavigation<RootNavigationProp>();

  const dispatch = useDispatch<AppDispatch>();

  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();

  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submitLogin = useCallback(async () => {
    const email = getValues('login.email');
    const password = getValues('login.password');

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'login',
      });

      return;
    }

    try {
      const deviceInfoSessionPayload: DeviceInfoInput =
        await getDeviceInfoSessionPayload();

      const loginInput: LoginInput = {
        email,
        password,
        ...deviceInfoSessionPayload,
      };

      const loginResponse = await login({
        input: loginInput,
      }).unwrap();

      console.log('loginSuccess', loginResponse);

      const accessToken = loginResponse.login.accessToken;

      const refreshToken = loginResponse.login.refreshToken;

      dispatch(
        setAuthTokens({
          accessToken,
          refreshToken,
          authStatus: 'authenticated',
        }),
      );

      rootNavigation.reset({
        index: 0,
        routes: [
          {
            name: RootRoutes.Main,
          },
        ],
      });
    } catch (e) {
      console.log('Login error:', e);
    }
  }, [
    getValues,
    setError,
    clearErrors,
    getDeviceInfoSessionPayload,
    login,
    dispatch,
    rootNavigation,
  ]);

  return {
    navigation,

    // RTK Query loading
    loading: isLoading,
    isLoading,

    // RTK Query error state
    isError,
    error,

    showPassword,
    setShowPassword,

    control,
    errors,

    submitLogin,

    clearErrors,
  };
};
