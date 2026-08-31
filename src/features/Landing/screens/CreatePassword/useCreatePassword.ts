import { PasswordStrength, PasswordStrengthResult } from './types';
import { useCallback, useState } from 'react';

import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { createPasswordSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { useFormContext } from 'react-hook-form';
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
  const navigation = useNavigation<LandingNavigationProp>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const password = getValues('createPassword.password') || '';
  const confirmPassword = getValues('createPassword.confirmPassword') || '';

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
    navigation.navigate('VerifyEmail');
  }, [navigation, setError, clearErrors, password, confirmPassword]);

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
  };
};
