import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { howAreYouFeelingSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useHowAreYouFeeling = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const submitHowAreYouFeeling = useCallback(() => {
    const howAreYouFeeling = getValues('howAreYouFeeling');
    const result = howAreYouFeelingSchema.safeParse(howAreYouFeeling);
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'howAreYouFeeling', // Pass your master context namespace here
      });
      return;
    }

    navigation.navigate('WhatWouldYouLikeHelpWith');
  }, [navigation, getValues, setError, clearErrors]);

  return {
    control,
    errors,
    submitHowAreYouFeeling,
  };
};
