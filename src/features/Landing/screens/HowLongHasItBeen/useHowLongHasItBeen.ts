import { LandingNavigationProp } from '@/features/Landing/navigation/types';
import { MasterFormData } from '@/form/types';
import { howLongHasItBeenSchema } from '@/form';
import { mapZodErrorsToForm } from '@/utils';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export const useHowLongHasItBeen = () => {
  const navigation = useNavigation<LandingNavigationProp>();
  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext<MasterFormData>();

  const submitHowLongHasItBeen = useCallback(() => {
    const howLongHasItBeen = getValues('howLongHasItBeen');
    const result = howLongHasItBeenSchema.safeParse(howLongHasItBeen);
    if (!result.success) {
      mapZodErrorsToForm({
        error: result.error,
        setError,
        clearErrors,
        parentKey: 'howLongHasItBeen', // Pass your master context namespace here
      });
      return;
    }

    navigation.navigate('HowAreYouFeeling');
  }, [navigation, getValues, setError, clearErrors]);

  return {
    control,
    errors,
    submitHowLongHasItBeen,
  };
};
