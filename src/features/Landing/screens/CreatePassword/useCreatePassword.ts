import { DeviceInfoInput, useRegisterMutation } from '@/__generated__/graphql';
import { PasswordStrength, PasswordStrengthResult } from './types';
import { getApiErrorMessage, mapZodErrorsToForm } from '@/utils';
import { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { createPasswordSchema } from '@/form';
import { showToast } from '@/components';
import { useDeviceInfoSessionPayload } from '@/hooks/useDeviceInfoSessionPayload';
import { useNavigation } from '@react-navigation/native';

export function getPasswordStrength(password: string): PasswordStrengthResult {
  const rules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  let strength: PasswordStrength = 'weak';

  if (score <= 1) {
    strength = 'weak';
  } else if (score <= 3) {
    strength = 'fair';
  } else if (score === 4) {
    strength = 'good';
  } else {
    strength = 'strong';
  }

  return {
    strength,
    score,
    rules,
  };
}

export const useCreatePassword = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigation = useNavigation<LandingNavigationProp>();

  const [triggerRegisterMutation] = useRegisterMutation();
  const { getDeviceInfoSessionPayload } = useDeviceInfoSessionPayload();

  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const password = useWatch({ control, name: 'createPassword.password' }) || '';
  const confirmPassword =
    useWatch({ control, name: 'createPassword.confirmPassword' }) || '';

  const calculatePasswordStrength = () => {
    return getPasswordStrength(password);
  };

  const submitCreatePassword = useCallback(async () => {
    const result = createPasswordSchema.safeParse({
      password,
      confirmPassword,
    });
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'createPassword', // Pass your master context namespace here
      });
      return;
    }
    const deviceInfoSessionPayload: DeviceInfoInput =
      await getDeviceInfoSessionPayload();

    const displayName = getValues('createAccount.fullName');
    const email = getValues('createAccount.email');
    const whatBringsYouHere = getValues('whatBringsYouHere');
    const howLongHasItBeen = getValues('howLongHasItBeen');
    const howAreYouFeeling = getValues('howAreYouFeeling');
    const whatWouldYouLikeHelpWith = getValues('whatWouldYouLikeHelpWith');

    try {
      setIsPending(true);
      await triggerRegisterMutation({
        input: {
          displayName,
          email,
          password,
          whatBringsYouHere,
          howLongHasItBeen,
          howAreYouFeeling,
          whatWouldYouLikeHelpWith,
          ...deviceInfoSessionPayload,
        },
      });
      setIsPending(false);
      navigation.navigate('VerifyEmail');
    } catch (error) {
      console.log('error', error);
      showToast(getApiErrorMessage(error), 'error');
    } finally {
      setIsPending(false);
    }
  }, [
    password,
    confirmPassword,
    getDeviceInfoSessionPayload,
    getValues,
    navigation,
    setError,
    clearErrors,
    triggerRegisterMutation,
  ]);

  return {
    password,
    confirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    calculatePasswordStrength,
    control,
    errors,
    submitCreatePassword,
    clearErrors,
    isPending,
  };
};
