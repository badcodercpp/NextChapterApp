import { mapZodErrorsToForm, maskEmailFixed } from '@/utils';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { verifyEmailSchema } from '@/form';

export const useVerifyEmail = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  //@ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const otp = getValues('verifyEmail.otp') || [];
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
    navigation.navigate('Reminder');
  }, [navigation, setError, clearErrors, otp]);

  return {
    control,
    errors,
    otp,
    email,
    maskedEmail,
    submitVerifyEmail,
  };
};
