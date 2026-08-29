import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { mapZodErrorsToForm } from '@/utils';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { whatBringsYouHereSchema } from '@/form';

export const useWhatBringsYouHere = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const submitWhatBringsYouHere = useCallback(() => {
    const whatBringsYouHere = getValues('whatBringsYouHere');
    const result = whatBringsYouHereSchema.safeParse(whatBringsYouHere);
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'whatBringsYouHere', // Pass your master context namespace here
      });
      return;
    }

    navigation.navigate('HowLongHasItBeen');
  }, [setError, clearErrors, getValues, navigation]);

  return {
    control,
    errors,
    submitWhatBringsYouHere,
  };
};
