import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { createAccountSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useCreateAccount = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const submitCreateAccount = useCallback(async () => {
    const email = getValues('createAccount.email');
    const fullName = getValues('createAccount.fullName');
    const result = createAccountSchema.safeParse({ email, fullName });
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'createAccount', // Pass your master context namespace here
      });
      return;
    }
    navigation.navigate('CreatePassword');
  }, [navigation, getValues, setError, clearErrors]);

  return {
    control,
    errors,
    submitCreateAccount,
    navigation,
    clearErrors,
  };
};
