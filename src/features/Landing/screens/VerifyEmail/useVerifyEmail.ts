import {
  DeviceInfoInput,
  useVerifyEmailOtpMutation,
} from '@/__generated__/graphql';
import {
  getApiErrorMessage,
  mapZodErrorsToForm,
  maskEmailFixed,
} from '@/utils';
import { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { showToast } from '@/components';
import { useDeviceInfoSessionPayload } from '@/hooks/useDeviceInfoSessionPayload';
import { useNavigation } from '@react-navigation/native';
import { verifyEmailSchema } from '@/form';

export const useVerifyEmail = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const [triggerVerifyEmailOtpMutation] = useVerifyEmailOtpMutation();
  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();

  const otp = useWatch({ control, name: 'verifyEmail.otp' });
  const email = getValues('createAccount.email') || '';
  const maskedEmail = maskEmailFixed(email);

  const submitVerifyEmail = useCallback(async () => {
    const result = verifyEmailSchema.safeParse({ otp });
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'verifyEmail', // Pass your master context namespace here
      });
      return;
    }
    const deviceInfoSessionPayload: DeviceInfoInput =
      await getDeviceInfoSessionPayload();

    try {
      setIsPending(true);
      const { data: verifyEmailOtpMutationResponse } =
        await triggerVerifyEmailOtpMutation({
          input: {
            email,
            otp: otp.join(''),
            ...deviceInfoSessionPayload,
          },
        });
      setIsPending(false);
      // for mlp we are not building notification so skiping reminder screen
      // navigation.navigate('Reminder');
      navigation.navigate('RecoveryStartsToday', {
        accessToken: verifyEmailOtpMutationResponse?.verifyEmailOtp.accessToken,
        refreshToken:
          verifyEmailOtpMutationResponse?.verifyEmailOtp.refreshToken,
      });
    } catch (error) {
      console.log('error', error);
      showToast(getApiErrorMessage(error), 'error');
    } finally {
      setIsPending(false);
    }
  }, [
    otp,
    getDeviceInfoSessionPayload,
    setError,
    clearErrors,
    triggerVerifyEmailOtpMutation,
    email,
    navigation,
  ]);

  return {
    control,
    errors,
    otp,
    email,
    maskedEmail,
    submitVerifyEmail,
    navigation,
    clearErrors,
    isPending,
  };
};
